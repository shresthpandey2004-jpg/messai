import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MenuReactionProvider } from "@/contexts/MenuReactionContext";
import { LikeDislikeProvider } from "@/contexts/LikeDislikeContext";
import { BillingProvider } from "@/contexts/BillingContext";
import { StudentProvider } from "@/contexts/StudentContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Index from "./pages/Index";
import WeeklyMenu from "./pages/WeeklyMenu";
import Feedback from "./pages/Feedback";
import AIComplaint from "./pages/AIComplaint";
import MealBooking from "./pages/MealBooking";
import MyAccount from "./pages/MyAccount";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentManagement from "./pages/admin/StudentManagement";
import AddMenu from "./pages/admin/AddMenu";
import Analytics from "./pages/admin/Analytics";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminAttendance from "./pages/admin/AdminAttendance";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <StudentProvider>
            <BillingProvider>
              <MenuReactionProvider>
                <LikeDislikeProvider>
                  <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                  <Route path="/menu" element={<ProtectedRoute><WeeklyMenu /></ProtectedRoute>} />
                  <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                  <Route path="/complaint" element={<ProtectedRoute><AIComplaint /></ProtectedRoute>} />
                  <Route path="/booking" element={<ProtectedRoute><MealBooking /></ProtectedRoute>} />
                  <Route path="/account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                  <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<StudentManagement />} />
                  <Route path="/admin/add-menu" element={<AddMenu />} />
                  <Route path="/admin/analytics" element={<Analytics />} />
                  <Route path="/admin/complaints" element={<AdminComplaints />} />
                  <Route path="/admin/attendance" element={<AdminAttendance />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </LikeDislikeProvider>
              </MenuReactionProvider>
            </BillingProvider>
          </StudentProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
