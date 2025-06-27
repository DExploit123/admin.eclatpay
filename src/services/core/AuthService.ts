import {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
  ApiResponse,
} from '@/types/auth';

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

  // Admin Login using phone and password
  async login(credentials: { phone: string; password: string }): Promise<AuthResponse> {
    try {
      console.log('AuthService: Starting login process with phone:', credentials.phone);

      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        signal: AbortSignal.timeout(30000),
      });

      console.log('AuthService: Login response status:', response.status);

      const data = await response.json();
      console.log('AuthService: Login response data:', data);

      if (!response.ok) {
        return {
          success: false,
          error: this.getDetailedErrorMessage(data, response),
        };
      }

      if (!data.token || !data.user) {
        return {
          success: false,
          error: 'Invalid server response: Missing authentication data.',
        };
      }

      this.storeAuthData(data.token, data.user);

      return {
        success: true,
        data: {
          token: data.token,
          user: data.user,
          message: data.message || 'Login successful',
        },
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timeout. Please try again.',
        };
      }

      return {
        success: false,
        error: 'Network error: Unable to connect to the server. Please try again.',
      };
    }
  }

  // Admin Registration
  async register(adminData: RegisterData, profileImage?: File): Promise<AuthResponse> {
    try {
      const formData = new FormData();

      Object.entries(adminData).forEach(([key, value]) => {
        formData.append(key, value);
      });

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

      if (data.token && data.user) {
        this.storeAuthData(data.token, data.user);
      }

      return {
        success: true,
        data: {
          token: data.token,
          user: data.user,
          message: data.message || 'Registration successful',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }
  }

  // Get Profile
  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const token = this.getToken();
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) this.clearAuthData();
        throw new Error(data.message || 'Failed to fetch profile');
      }

      const userData = data.user || data;
      this.storeAuthData(token, userData);

      return {
        success: true,
        data: userData,
        message: 'Profile fetched successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch profile',
      };
    }
  }

  // Logout
  logout(): void {
    this.clearAuthData();
  }

  // Token Validation
  async validateToken(): Promise<boolean> {
    if (!this.isAuthenticated()) return false;
    const result = await this.getProfile();
    return result.success;
  }

  // Error Helper
  private getDetailedErrorMessage(error: any, response?: Response): string {
    if (!response) {
      return 'Network error. Please check your internet connection.';
    }

    switch (response.status) {
      case 400: return 'Invalid phone or password.';
      case 401: return 'Unauthorized. Check your credentials.';
      case 403: return 'Access denied.';
      case 404: return 'Login route not found.';
      case 500: return 'Server error. Try again later.';
      case 502:
      case 503:
      case 504: return 'Server temporarily unavailable.';
      default: return `Error (${response.status}): ${error.message || 'Unknown error.'}`;
    }
  }
}
