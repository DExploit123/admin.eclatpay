import { LoginCredentials, RegisterData, User, AuthResponse, ApiResponse } from '@/types/auth';

export class AuthService {
  private baseURL = 'https://eclatpay-backend-kicz.onrender.com/api/auth';
  private tokenKey = 'eclatpay_admin_token';
  private userKey = 'eclatpay_admin_user';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  private storeAuthData(token: string, user: User): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  private getDetailedErrorMessage(error: any, response?: Response): string {
    if (!response) {
      return 'Network error: Unable to connect to the server.';
    }

    switch (response.status) {
      case 400:
        return 'Invalid login credentials.';
      case 401:
        return 'Authentication failed.';
      case 403:
        return 'Access denied.';
      case 404:
        return 'Login endpoint not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Error (${response.status}): ${error?.message || 'Unknown error'}`;
    }
  }

  async login(credentials: { phone: string; password: string }): Promise<AuthResponse> {
    try {
      console.log('AuthService: Starting login process with phone:', credentials.phone);

      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        signal: AbortSignal.timeout(30000),
      });

      const data = await response.json();
      console.log('AuthService: Login response:', data);

      if (!response.ok) {
        const errorMsg = this.getDetailedErrorMessage(data, response);
        return { success: false, error: errorMsg };
      }

      if (!data.token || !data.user) {
        return {
          success: false,
          error: 'Invalid server response: Missing token or user data.',
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
    } catch (err) {
      console.error('AuthService: Login error:', err);
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred during login.',
      };
    }
  }

  logout(): void {
    this.clearAuthData();
  }

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const token = this.getToken();
      if (!token) throw new Error('No token found');

      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) this.clearAuthData();
        throw new Error(data.message || 'Failed to fetch profile');
      }

      this.storeAuthData(token, data.user || data);

      return {
        success: true,
        data: data.user || data,
        message: 'Profile fetched successfully',
      };
    } catch (err) {
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : 'Failed to fetch profile',
      };
    }
  }

  async validateToken(): Promise<boolean> {
    if (!this.isAuthenticated()) return false;
    const result = await this.getProfile();
    return result.success;
  }
}
