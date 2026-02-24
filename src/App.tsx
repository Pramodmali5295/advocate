import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/customer/Index";
import About from "./pages/customer/About";
import PracticeAreas from "./pages/customer/PracticeAreas";
import Contact from "./pages/customer/Contact";
import Inquiry from "./pages/customer/Inquiry";
import Knowledge from "./pages/customer/Knowledge";
import Testimonials from "./pages/customer/Testimonials";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminClients from "./pages/admin/AdminClients";
import AdminServices from "./pages/admin/AdminServices";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPages from "./pages/admin/AdminPages";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/customer/layout/ScrollToTop";
import { ContentProvider } from "./context/ContentContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import Login from "./pages/admin/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContentProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/practice-areas" element={<PracticeAreas />} />
              <Route path="/practice-areas/:id" element={<PracticeAreas />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/testimonials" element={<Testimonials />} />
              
              {/* Admin Login */}
              <Route path="/admin/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="inquiries" element={<AdminInquiries />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="pages" element={<AdminPages />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ContentProvider>
  </QueryClientProvider>
);

export default App;
