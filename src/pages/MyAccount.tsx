import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/data/mockData";
import { User, Mail, Home, Calendar, CreditCard, Check, X, Download, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyAccount = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const attendanceRate = mockUser.attendance.filter(a => a.present).length / mockUser.attendance.length * 100;

  const handleEditProfile = () => {
    setIsEditing(true);
    // Navigate to edit profile page or show modal
    const editName = prompt("Enter new name:", mockUser.name);
    const editEmail = prompt("Enter new email:", mockUser.email);
    const editRoom = prompt("Enter new room number:", mockUser.roomNumber);
    
    if (editName || editEmail || editRoom) {
      alert("Profile updated successfully! (This is a demo - in production, this would save to backend)");
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear any stored user data/tokens here
      localStorage.clear();
      sessionStorage.clear();
      alert("Logged out successfully!");
      // Redirect to home page
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              My <span className="gradient-text">Account</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your profile, view bills and attendance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="glass-card p-6 text-center">
                <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-primary-foreground font-bold">
                    {mockUser.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-foreground">{mockUser.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">Student</p>
                
                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Room {mockUser.roomNumber}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
                <Button variant="destructive" className="w-full mt-3 gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="md:col-span-2 space-y-6">
              {/* Monthly Bill */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Monthly Bill</h3>
                      <p className="text-sm text-muted-foreground">December 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-muted-foreground">Meals Consumed</span>
                    <span className="font-medium text-foreground">62 meals</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-muted-foreground">Rate per meal</span>
                    <span className="font-medium text-foreground">₹56.45</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold gradient-text">₹{mockUser.monthlyBill}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="hero">
                  Pay Now
                </Button>
              </div>

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
                    <Button className="flex-1 gap-2">
                      <Check className="w-4 h-4" />
                      Present
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
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
