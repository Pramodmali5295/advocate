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
  const [view, setView] = useState<'login' | 'forgot' | 'change'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, sendResetEmail, changePassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [changeData, setChangeData] = useState({ email: '', oldPass: '', newPass: '' });

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

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await changePassword(changeData.email, changeData.oldPass, changeData.newPass);
    setIsLoading(false);

    if (result.success) {
      toast({ title: "Password Changed", description: result.message });
      setView('login');
    } else {
      toast({ title: "Change Failed", description: result.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements - Subtle for light theme */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4 shadow-xl shadow-accent/10">
            <Scale className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Advocate Hub Pro</h1>
          <p className="text-muted-foreground mt-2">Secure Admin Management Portal</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
          {view === 'login' ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">Admin Login</h2>
                <p className="text-muted-foreground text-sm mt-1">Access your firm's control tower</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-muted/30 border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-muted/30 border border-border rounded-xl py-3 pl-11 pr-12 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/50 hover:text-accent transition-colors"
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl shadow-lg mt-2 transition-all active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Secure Login <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                <div className="flex justify-center gap-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-xs font-semibold text-muted-foreground hover:text-accent transition-colors"
                  >
                    Forgot Password?
                  </button>
                  <span className="text-border">|</span>
                  <button 
                    type="button"
                    onClick={() => setView('change')}
                    className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    Change Password?
                  </button>
                </div>
              </form>
            </>
          ) : view === 'forgot' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <button 
                onClick={() => setView('login')}
                className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors mb-6 text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Back to login
              </button>

              <h2 className="text-xl font-semibold text-foreground mb-2">Reset Password</h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Enter your admin email and we'll send you a secure link to reset your password instantly.
              </p>

              <form onSubmit={handleForgot} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                    <input
                      name="forgot-email"
                      type="email"
                      required
                      placeholder="admin@example.com"
                      className="w-full bg-muted/30 border border-border rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-medium"
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
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <button 
                onClick={() => setView('login')}
                className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors mb-6 text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Back to login
              </button>

              <h2 className="text-xl font-semibold text-foreground mb-2">Change Password</h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Update your credentials by verifying your current password.
              </p>

              <form onSubmit={handleChange} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={changeData.email}
                    onChange={(e) => setChangeData({ ...changeData, email: e.target.value })}
                    className="w-full bg-muted/30 border border-border rounded-xl py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    required
                    value={changeData.oldPass}
                    onChange={(e) => setChangeData({ ...changeData, oldPass: e.target.value })}
                    className="w-full bg-muted/30 border border-border rounded-xl py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">New Password</label>
                  <input
                    type="password"
                    required
                    value={changeData.newPass}
                    onChange={(e) => setChangeData({ ...changeData, newPass: e.target.value })}
                    className="w-full bg-muted/30 border border-border rounded-xl py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-medium"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                   className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl shadow-lg mt-2 transition-all active:scale-[0.98]"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-muted-foreground/40 text-xs">
          <p>© 2024 Advocate Hub Pro. Powered by Firebase Security.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/" className="hover:text-foreground transition-colors">Return to Website</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
