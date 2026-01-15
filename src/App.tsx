import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MenuReactionProvider } from "@/contexts/MenuReactionContext";
import Index from "./pages/Index";
import WeeklyMenu from "./pages/WeeklyMenu";
import Feedback from "./pages/Feedback";
import AIComplaint from "./pages/AIComplaint";
import MealBooking from "./pages/MealBooking";
import MyAccount from "./pages/MyAccount";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddMenu from "./pages/admin/AddMenu";
import Analytics from "./pages/admin/Analytics";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminAttendance from "./pages/admin/AdminAttendance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <MenuReactionProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<WeeklyMenu />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/complaint" element={<AIComplaint />} />
              <Route path="/booking" element={<MealBooking />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/add-menu" element={<AddMenu />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/complaints" element={<AdminComplaints />} />
              <Route path="/admin/attendance" element={<AdminAttendance />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MenuReactionProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
