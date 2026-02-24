import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Scale, Mail, Lock, AlertCircle, ArrowRight, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, sendResetEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    if (result.success) {
      toast({
        title: "Welcome Back",
        description: "Login successful. Redirecting to dashboard...",
      });
      navigate('/admin');
    } else {
      setError(result.message);
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const forgotEmail = formData.get('forgot-email') as string;
    
    if (!forgotEmail) return;

    setIsLoading(true);
    const result = await sendResetEmail(forgotEmail);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Reset Link Sent",
        description: result.message,
      });
      setView('login');
    } else {
      toast({
        title: "Request Failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4 shadow-2xl shadow-accent/20">
            <Scale className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-cream">Advocate Hub Pro</h1>
          <p className="text-cream/60 mt-2">Secure Admin Management Portal</p>
        </div>

        {/* Card */}
        <div className="bg-navy-light/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
          {view === 'login' ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-cream">Admin Login</h2>
                <p className="text-cream/50 text-sm mt-1">Access your firm's control tower</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-cream/60 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-navy/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-cream placeholder:text-cream/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs font-semibold text-cream/60 uppercase tracking-wider">Password</label>
                    <button 
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-navy/50 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-cream placeholder:text-cream/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-cream/30 hover:text-accent transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-accent/90 text-navy font-bold py-6 rounded-xl shadow-xl shadow-accent/10 mt-2 transition-all active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Secure Login <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <button 
                onClick={() => setView('login')}
                className="flex items-center gap-1 text-cream/60 hover:text-accent transition-colors mb-6 text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Back to login
              </button>

              <h2 className="text-xl font-semibold text-cream mb-2">Reset Password</h2>
              <p className="text-cream/60 text-sm mb-6 leading-relaxed">
                Enter your admin email and we'll send you a secure link to reset your password instantly.
              </p>

              <form onSubmit={handleForgot} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-cream/60 uppercase tracking-wider">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" />
                    <input
                      name="forgot-email"
                      type="email"
                      required
                      placeholder="admin@example.com"
                      className="w-full bg-navy/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-cream placeholder:text-cream/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn-gold py-6"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-cream/30 text-xs">
          <p>© 2024 Advocate Hub Pro. Powered by Firebase Security.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/" className="hover:text-cream transition-colors">Return to Website</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
