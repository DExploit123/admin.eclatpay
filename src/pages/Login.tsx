
// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Login: Form submitted with phone:', phone);
    
    if (!phone.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }

    setError(''); // Clear previous errors
    
    try {
      console.log('Login: Attempting login...');
      const result = await login({ username: phone.trim(), password });
      
      console.log('Login: Login result:', result);
      
      if (result.success) {
        console.log('Login: Success - navigating to dashboard');
        // Success - navigate to dashboard
        navigate('/dashboard');
      } else {
        console.error('Login: Failed with error:', result.error);
        // Show error from API
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login: Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/3b0bd8fb-948b-41b7-aab2-f5d699ddf613.png" 
              alt="EclatPay" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EclatPay</h1>
          <p className="text-blue-200">Business Dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
            <p className="text-blue-200 text-sm">Access your dashboard</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert className="bg-red-500/20 border-red-500/50 text-red-100">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-blue-200 focus:bg-white/30 focus:border-blue-400 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-blue-200 focus:bg-white/30 focus:border-blue-400 transition-all pr-10"
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-blue-200" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-200" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-blue-200 text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-300 hover:text-white font-medium underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-blue-200 text-sm">
            © 2024 EclatPay. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
