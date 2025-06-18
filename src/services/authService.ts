// src/services/authService.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
    message?: string;
  };
  error?: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class AuthService {
  private baseURL = 'https://eclatpay-backend-kicz.onrender.com/api/auth';
  private tokenKey = 'eclatpay_admin_token';
  private userKey = 'eclatpay_admin_user';

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get stored user data
  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Store authentication data
  private storeAuthData(token: string, user: User): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Clear stored authentication data
  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Admin Login - Modified to work with username field
  async login(credentials: { username: string; password: string }): Promise<AuthResponse> {
    try {
      // Convert username to email format for API
      const apiCredentials = {
        email: credentials.username, // Your API expects email, but frontend uses username
        password: credentials.password
      };

      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store authentication data
      if (data.token && data.user) {
        this.storeAuthData(data.token, data.user);
      }

      return {
        success: true,
        data: {
          token: data.token,
          user: data.user,
          message: data.message || 'Login successful'
        }
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  // Admin Registration
  async register(adminData: RegisterData, profileImage?: File): Promise<AuthResponse> {
    try {
      const formData = new FormData();
      
      // Add all admin data to FormData
      Object.keys(adminData).forEach(key => {
        formData.append(key, adminData[key as keyof RegisterData] as string);
      });

      // Add profile image if provided
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store auth data if registration includes auto-login
      if (data.token && data.user) {
        this.storeAuthData(data.token, data.user);
      }

      return {
        success: true,
        data: {
          token: data.token,
          user: data.user,
          message: data.message || 'Registration successful'
        }
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  // Get Admin Profile
  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const token = this.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // If token is invalid, clear stored data
        if (response.status === 401) {
          this.clearAuthData();
        }
        throw new Error(data.message || 'Failed to fetch profile');
      }

      // Update stored user data
      const userData = data.user || data;
      this.storeAuthData(token, userData);

      return {
        success: true,
        data: userData,
        message: 'Profile fetched successfully'
      };

    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile'
      };
    }
  }

  // Logout
  logout(): void {
    this.clearAuthData();
  }

  // Validate token by fetching profile
  async validateToken(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    const result = await this.getProfile();
    return result.success;
  }
}

// Create singleton instance
export const authService = new AuthService();

// Hook for React components
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update state when storage changes
    const handleStorageChange = () => {
      setUser(authService.getUser());
      setIsAuthenticated(authService.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    try {
      const result = await authService.login(credentials);
      if (result.success && result.data) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const result = await authService.getProfile();
      if (result.success && result.data) {
        setUser(result.data);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    getProfile,
    validateToken: authService.validateToken.bind(authService)
  };
};