import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { EditProfileModal } from "@/components/EditProfileModal";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/contexts/BillingContext";
import { mockUser } from "@/data/mockData";
import { Mail, Home, Calendar, CreditCard, Check, X, Download, LogOut, Edit, TrendingUp, Bell, QrCode, Utensils, Award, Clock, DollarSign, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { generateReceipt } from "@/utils/generateReceipt";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyAccount = () => {
  const { user, logout } = useAuth();
  const { getTotalMeals, getMealCost, getMonthlyBill } = useBilling();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const attendanceRate = mockUser.attendance.filter(a => a.present).length / mockUser.attendance.length * 100;

  // Get actual billing data
  const totalMeals = getTotalMeals();
  const mealRate = getMealCost();
  const monthlyBill = getMonthlyBill();

  // Mock data for new features
  const paymentHistory = [
    { month: "December 2024", amount: 3500, status: "paid", date: "2024-12-05" },
    { month: "November 2024", amount: 3200, status: "paid", date: "2024-11-05" },
    { month: "October 2024", amount: 3400, status: "paid", date: "2024-10-05" },
  ];

  const mealStats = {
    totalMeals: totalMeals,
    favoriteMeal: "Paneer Butter Masala",
    mostSkipped: "Upma",
    avgMealsPerDay: (totalMeals / new Date().getDate()).toFixed(1),
  };

  const notifications = [
    { id: 1, text: "Payment due in 3 days", type: "warning", icon: Bell },
    { id: 2, text: "New menu for next week available", type: "info", icon: Utensils },
  ];

  const handleDownloadBill = () => {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    generateReceipt({
      userName: user?.name || "User",
      userEmail: user?.email || "email@example.com",
      roomNumber: user?.roomNumber || "N/A",
      totalMeals: totalMeals,
      mealRate: mealRate,
      totalAmount: monthlyBill,
      billMonth: currentMonth,
    });
    
    toast.success("Receipt generated! 📄", {
      description: "Opening print dialog..."
    });
  };

  const handlePayNow = () => {
    navigate("/payment", { 
      state: { 
        amount: monthlyBill, 
        billMonth: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalMeals: totalMeals,
        mealRate: mealRate,
      } 
    });
  };

  const handleShowQR = () => {
    setShowQR(!showQR);
    if (!showQR) {
      toast.info("Show this QR code at mess entry 📱");
    }
  };

  const handleMarkAttendance = (present: boolean) => {
    toast.success(present ? "Marked as Present ✅" : "Marked as Absent ❌");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <EditProfileModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              My <span className="gradient-text">Account</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your profile, view bills and track your mess activity
            </p>
          </div>
          
          {/* Notifications Bar */}
          {notifications.length > 0 && (
            <div className="mb-6 space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`glass-card p-4 flex items-center gap-3 ${
                    notif.type === "warning" ? "border-l-4 border-yellow-500" : "border-l-4 border-blue-500"
                  }`}
                >
                  <notif.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{notif.text}</span>
                </div>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="glass-card p-6 text-center">
                <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-4xl text-primary-foreground font-bold">
                    {user?.name.charAt(0) || "U"}
                  </span>
                  <Badge className="absolute -bottom-1 -right-1 bg-green-500">Active</Badge>
                </div>
                <h2 className="text-xl font-semibold text-foreground">{user?.name || "User"}</h2>
                <p className="text-sm text-muted-foreground mt-1">Student</p>
                
                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user?.email || "email@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Room {user?.roomNumber || "N/A"}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2" 
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2" 
                    onClick={handleShowQR}
                  >
                    <QrCode className="w-4 h-4" />
                    {showQR ? "Hide QR Code" : "Show QR Code"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full gap-2" 
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>

                {/* QR Code Display */}
                {showQR && (
                  <div className="mt-4 p-4 bg-white rounded-xl animate-fade-in">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent flex items-center justify-center rounded-lg">
                      <QrCode className="w-20 h-20 text-white" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Scan at mess entry</p>
                  </div>
                )}
              </div>

              {/* Meal Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Meal Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Meals</span>
                    <span className="font-semibold text-foreground">{mealStats.totalMeals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Favorite Dish</span>
                    <span className="font-semibold text-foreground text-sm">{mealStats.favoriteMeal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg/Day</span>
                    <span className="font-semibold text-foreground">{mealStats.avgMealsPerDay}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/menu">
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        View Menu
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/booking">
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Book Meals
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/feedback">
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Give Feedback
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Bills & Attendance */}
            <div className="lg:col-span-2 space-y-6">
              {/* Monthly Bill */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Current Month Bill</h3>
                      <p className="text-sm text-muted-foreground">December 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadBill}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-muted-foreground text-sm">Meals Consumed</span>
                      <p className="font-medium text-foreground text-lg">{totalMeals} meals</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Rate per meal</span>
                      <p className="font-medium text-foreground text-lg">₹{mealRate.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold gradient-text">₹{monthlyBill}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="hero" onClick={handlePayNow}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              </div>

              {/* Payment History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Payment History
                  </CardTitle>
                  <CardDescription>Your past payment records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.map((payment, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground">{payment.month}</p>
                          <p className="text-xs text-muted-foreground">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">₹{payment.amount}</p>
                          <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Attendance Overview</h3>
                    <p className="text-sm text-muted-foreground">Last 5 days</p>
                  </div>
                </div>
                
                {/* Attendance Rate */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Attendance Rate</span>
                    <span className="font-medium text-foreground">{Math.round(attendanceRate)}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-bg rounded-full transition-all duration-500"
                      style={{ width: `${attendanceRate}%` }}
                    />
                  </div>
                </div>
                
                {/* Attendance Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {mockUser.attendance.map((record, idx) => {
                    const date = new Date(record.date);
                    return (
                      <div
                        key={record.date}
                        className={`p-3 rounded-xl text-center transition-all ${
                          record.present
                            ? 'bg-primary/10 border border-primary/30'
                            : 'bg-destructive/10 border border-destructive/30'
                        }`}
                      >
                        <div className="text-xs text-muted-foreground">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {date.getDate()}
                        </div>
                        <div className="mt-1">
                          {record.present ? (
                            <Check className="w-4 h-4 text-primary mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-destructive mx-auto" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mark Today's Attendance */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Mark Today's Attendance</p>
                  <div className="flex gap-3">
                    <Button className="flex-1 gap-2" onClick={() => handleMarkAttendance(true)}>
                      <Check className="w-4 h-4" />
                      Present
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => handleMarkAttendance(false)}>
                      <X className="w-4 h-4" />
                      Absent
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
