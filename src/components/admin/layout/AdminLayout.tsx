import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare,
  CreditCard, 
  Settings,
  Scale,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
  LayoutPanelLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Consultations', path: '/admin/inquiries', icon: FileText },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  { name: 'Pages', path: '/admin/pages', icon: LayoutPanelLeft },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    }
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          'hidden lg:flex flex-col bg-navy text-cream transition-all duration-300 sticky top-0 h-screen overflow-y-auto z-40',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-navy-light shrink-0">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-accent-foreground" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold">Admin</span>
                <span className="text-xs text-cream/60">Law Chambers</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive(link.path)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-cream/70 hover:bg-navy-light hover:text-cream'
              )}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-navy-light shrink-0">
          <div className={cn(
            'flex items-center gap-3 px-4 py-3',
            isSidebarOpen ? '' : 'justify-center'
          )}>
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-semibold">AK</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cream truncate">Adv. Arun Kumar</p>
                <p className="text-xs text-cream/60">Super Admin</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-cream/60 hover:bg-destructive/10 hover:text-destructive transition-all mb-2",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full mt-2 px-4 py-2 text-cream/60 hover:text-cream text-sm flex items-center justify-center gap-2"
          >
            {isSidebarOpen ? 'Collapse' : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-navy text-cream flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-navy-light flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="font-display text-lg font-bold">Admin</span>
              </Link>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-6 h-6 text-cream/60" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive(link.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-cream/70 hover:bg-navy-light hover:text-cream'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-cream/60 hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-card/80 backdrop-blur-md border-b border-border px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">
                  {sidebarLinks.find(l => isActive(l.path))?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your law practice
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Site */}
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                View Site
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>

              {/* User Menu */}
              <button className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-sm font-semibold">AK</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
