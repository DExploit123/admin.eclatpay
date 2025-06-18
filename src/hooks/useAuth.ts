
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { AuthService } from '@/services/core/AuthService';

// Create singleton instance
const authService = new AuthService();

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
      console.log('useAuth: Starting login for username:', credentials.username);
      const result = await authService.login(credentials);
      
      if (result.success && result.data) {
        console.log('useAuth: Login successful, updating state');
        setUser(result.data.user);
        setIsAuthenticated(true);
      } else {
        console.error('useAuth: Login failed:', result.error);
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('useAuth: Logging out');
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

// Export the service instance for direct usage if needed
export { authService };
