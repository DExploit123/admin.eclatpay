
import { LoginCredentials, RegisterData, User, AuthResponse, ApiResponse } from '@/types/auth';

export class AuthService {
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
      console.log('AuthService: Starting login process with username:', credentials.username);
      
      // Convert username to email format for API
      const apiCredentials = {
        email: credentials.username,
        password: credentials.password
      };

      console.log('AuthService: Sending login request to:', `${this.baseURL}/login`);
      console.log('AuthService: Login payload:', { email: apiCredentials.email, password: '[HIDDEN]' });

      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiCredentials),
      });

      console.log('AuthService: Login response status:', response.status);
      console.log('AuthService: Login response ok:', response.ok);

      const data = await response.json();
      console.log('AuthService: Login response data:', data);

      if (!response.ok) {
        console.error('AuthService: Login failed with status:', response.status);
        console.error('AuthService: Error response:', data);
        throw new Error(data.message || data.error || 'Login failed');
      }

      // Store authentication data
      if (data.token && data.user) {
        console.log('AuthService: Storing auth data for user:', data.user.email);
        this.storeAuthData(data.token, data.user);
      } else {
        console.warn('AuthService: Login response missing token or user data');
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
      console.error('AuthService: Login error caught:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  // Admin Registration
  async register(adminData: RegisterData, profileImage?: File): Promise<AuthResponse> {
    try {
      console.log('AuthService: Starting registration process for:', adminData.email);
      
      const formData = new FormData();
      
      // Add all admin data to FormData
      Object.keys(adminData).forEach(key => {
        formData.append(key, adminData[key as keyof RegisterData] as string);
      });

      // Add profile image if provided
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      console.log('AuthService: Sending registration request to:', `${this.baseURL}/register`);

      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        body: formData,
      });

      console.log('AuthService: Registration response status:', response.status);

      const data = await response.json();
      console.log('AuthService: Registration response data:', data);

      if (!response.ok) {
        console.error('AuthService: Registration failed with status:', response.status);
        throw new Error(data.message || 'Registration failed');
      }

      // Store auth data if registration includes auto-login
      if (data.token && data.user) {
        console.log('AuthService: Storing auth data after registration');
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
      console.error('AuthService: Registration error:', error);
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
      console.error('AuthService: Profile fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile'
      };
    }
  }

  // Logout
  logout(): void {
    console.log('AuthService: Logging out user');
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
