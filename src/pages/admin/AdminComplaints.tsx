import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { complaintTemplates, weeklyMenu } from "@/data/mockData";
import { Check, Clock, Download, X } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  text: string;
  dish: string;
  time: string;
  status: 'pending' | 'resolved' | 'rejected';
  studentName: string;
}

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    // Generate mock complaints
    return Array.from({ length: 12 }, (_, i) => ({
      id: `complaint-${i}`,
      text: complaintTemplates[i % complaintTemplates.length],
      dish: weeklyMenu[i % weeklyMenu.length].name,
      time: i === 0 ? '30 minutes ago' : i < 3 ? `${i + 1} hours ago` : `${i} days ago`,
      status: i < 5 ? 'pending' : i < 10 ? 'resolved' : 'rejected' as const,
      studentName: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Neha Singh', 'Vijay Raj'][i % 5],
    }));
  });

  const handleStatusChange = (id: string, newStatus: 'resolved' | 'rejected') => {
    setComplaints(prev => 
      prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
    );
    toast({
      title: newStatus === 'resolved' ? "Complaint Resolved ✅" : "Complaint Rejected",
      description: `The complaint has been marked as ${newStatus}`
    });
  };

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
  const rejectedCount = complaints.filter(c => c.status === 'rejected').length;

  return (
    <AdminSidebar>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Complaint <span className="gradient-text">Management</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and resolve student complaints
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export List
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-destructive">{pendingCount}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-primary">{resolvedCount}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-muted-foreground">{rejectedCount}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint, idx) => (
            <div 
              key={complaint.id} 
              className="glass-card p-5 animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Status Indicator */}
                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                  complaint.status === 'pending' ? 'bg-destructive animate-pulse' :
                  complaint.status === 'resolved' ? 'bg-primary' : 'bg-muted-foreground'
                }`} />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-foreground">{complaint.studentName}</span>
                    <span className="text-xs text-muted-foreground">• {complaint.time}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                      complaint.status === 'pending' ? 'bg-destructive/10 text-destructive' :
                      complaint.status === 'resolved' ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                  
                  <p className="text-foreground mb-2">
                    <span className="font-medium text-primary">Regarding {complaint.dish}:</span> {complaint.text}
                  </p>

                  {/* Actions */}
                  {complaint.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(complaint.id, 'resolved')}
                        className="gap-1"
                      >
                        <Check className="w-4 h-4" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(complaint.id, 'rejected')}
                        className="gap-1"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminComplaints;
