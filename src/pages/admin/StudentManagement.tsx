import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddEditStudentModal } from "@/components/AddEditStudentModal";
import { useStudents, Student } from "@/contexts/StudentContext";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Home
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StudentManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent, toggleStudentStatus } = useStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter =
      filterStatus === "all" || student.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleAddStudent = (studentData: Omit<Student, "id">) => {
    addStudent(studentData);
    toast.success("Student added successfully! ✅");
  };

  const handleEditStudent = (studentData: Omit<Student, "id">) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, studentData);
      toast.success("Student updated successfully! ✅");
      setEditingStudent(null);
    }
  };

  const handleDeleteStudent = (id: string) => {
    deleteStudent(id);
    toast.success("Student deleted successfully! 🗑️");
  };

  const handleToggleStatus = (id: string) => {
    toggleStudentStatus(id);
    toast.success("Student status updated! ✅");
  };

  const handleBulkExport = () => {
    toast.success("Exporting student data... 📊");
  };

  const handleBulkImport = () => {
    toast.info("Bulk import feature coming soon! 📥");
  };

  const stats = [
    { label: "Total Students", value: students.length, color: "text-primary" },
    { label: "Active", value: students.filter((s) => s.status === "active").length, color: "text-green-600" },
    { label: "Inactive", value: students.filter((s) => s.status === "inactive").length, color: "text-destructive" },
    { label: "Pending Payments", value: `₹${students.reduce((acc, s) => acc + s.pendingPayment, 0)}`, color: "text-orange-600" },
  ];

  return (
    <AdminSidebar>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Student <span className="gradient-text">Management</span>
          </h1>
          <p className="text-muted-foreground">
            Manage all student accounts and their details
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-5 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or room number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                onClick={() => setFilterStatus("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "inactive" ? "default" : "outline"}
                onClick={() => setFilterStatus("inactive")}
                size="sm"
              >
                Inactive
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkImport}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Student
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Contact
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Room
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Course
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Payment
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                          <span className="text-primary-foreground font-semibold">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {student.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student.totalMeals} meals
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm text-foreground flex items-center gap-2">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {student.email}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {student.phone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {student.roomNumber}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {student.course}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.year}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          student.status === "active" ? "default" : "secondary"
                        }
                        className={
                          student.status === "active"
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                            : "bg-gray-500/10 text-gray-600"
                        }
                      >
                        {student.status === "active" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {student.pendingPayment > 0 ? (
                        <span className="text-sm font-medium text-orange-600">
                          ₹{student.pendingPayment}
                        </span>
                      ) : (
                        <span className="text-sm text-green-600">Paid</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingStudent(student);
                                setIsAddModalOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(student.id)}
                            >
                              {student.status === "active" ? (
                                <>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No students found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddEditStudentModal
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) setEditingStudent(null);
        }}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        student={editingStudent}
      />
    </AdminSidebar>
  );
};

export default StudentManagement;
