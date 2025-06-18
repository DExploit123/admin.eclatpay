
// Re-export everything from the refactored modules
export * from '@/types/auth';
export * from '@/services/core/AuthService';
export * from '@/hooks/useAuth';

// For backward compatibility, export the service instance
export { authService } from '@/hooks/useAuth';
