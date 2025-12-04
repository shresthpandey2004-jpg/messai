import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Download, Check, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  room: string;
  attendance: boolean[];
}

const AdminAttendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Generate mock students
  const [students] = useState<Student[]>(() => {
    const names = [
      "Rahul Sharma", "Priya Patel", "Amit Kumar", "Neha Singh", "Vijay Raj",
      "Ananya Gupta", "Rohan Mehta", "Kavya Iyer", "Arjun Reddy", "Shreya Das",
      "Karan Malhotra", "Divya Nair", "Sanjay Joshi", "Pooja Verma", "Aditya Rao"
    ];
    
    return names.map((name, i) => ({
      id: `student-${i}`,
      name,
      room: `${String.fromCharCode(65 + (i % 4))}-${101 + Math.floor(i / 4)}`,
      attendance: Array.from({ length: 7 }, () => Math.random() > 0.15),
    }));
  });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const overallRate = students.reduce((acc, s) => {
    const present = s.attendance.filter(a => a).length;
    return acc + (present / 7);
  }, 0) / students.length * 100;

  return (
    <AdminSidebar>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Attendance <span className="gradient-text">Records</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Track student attendance for the week
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-3xl font-bold text-foreground">{students.length}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-sm text-muted-foreground">Overall Attendance Rate</p>
            <p className="text-3xl font-bold text-primary">{overallRate.toFixed(1)}%</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-sm text-muted-foreground">Today's Present</p>
            <p className="text-3xl font-bold text-foreground">
              {students.filter(s => s.attendance[6]).length}
              <span className="text-lg text-muted-foreground"> / {students.length}</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or room..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-foreground">Student</th>
                  <th className="text-left p-4 font-medium text-foreground">Room</th>
                  {days.map(day => (
                    <th key={day} className="text-center p-4 font-medium text-foreground w-16">
                      {day}
                    </th>
                  ))}
                  <th className="text-center p-4 font-medium text-foreground">Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, idx) => {
                  const presentDays = student.attendance.filter(a => a).length;
                  const rate = (presentDays / 7 * 100).toFixed(0);
                  
                  return (
                    <tr 
                      key={student.id} 
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors animate-fade-in"
                      style={{ animationDelay: `${idx * 30}ms` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{student.room}</td>
                      {student.attendance.map((present, dayIdx) => (
                        <td key={dayIdx} className="p-4 text-center">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto ${
                            present ? 'bg-primary/10' : 'bg-destructive/10'
                          }`}>
                            {present ? (
                              <Check className="w-4 h-4 text-primary" />
                            ) : (
                              <X className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                        </td>
                      ))}
                      <td className="p-4 text-center">
                        <span className={`font-semibold ${
                          Number(rate) >= 80 ? 'text-primary' :
                          Number(rate) >= 60 ? 'text-foreground' : 'text-destructive'
                        }`}>
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No students found matching "{searchQuery}"
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default AdminAttendance;
