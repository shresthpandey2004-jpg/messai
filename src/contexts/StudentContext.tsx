import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  course: string;
  year: string;
  status: "active" | "inactive";
  joinDate: string;
  totalMeals: number;
  pendingPayment: number;
}

interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, "id">) => Student;
  updateStudent: (id: string, student: Omit<Student, "id">) => void;
  deleteStudent: (id: string) => void;
  getStudentByEmail: (email: string) => Student | undefined;
  toggleStudentStatus: (id: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initial mock data
    return [
      {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        roomNumber: "A-101",
        course: "B.Tech CSE",
        year: "3rd Year",
        status: "active",
        joinDate: "2024-01-15",
        totalMeals: 248,
        pendingPayment: 0,
      },
      {
        id: "2",
        name: "Priya Singh",
        email: "priya.singh@example.com",
        phone: "+91 98765 43211",
        roomNumber: "B-205",
        course: "B.Tech ECE",
        year: "2nd Year",
        status: "active",
        joinDate: "2024-01-20",
        totalMeals: 235,
        pendingPayment: 3500,
      },
      {
        id: "3",
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phone: "+91 98765 43212",
        roomNumber: "A-304",
        course: "MBA",
        year: "1st Year",
        status: "inactive",
        joinDate: "2023-12-10",
        totalMeals: 180,
        pendingPayment: 7000,
      },
      {
        id: "4",
        name: "Sneha Patel",
        email: "sneha.patel@example.com",
        phone: "+91 98765 43213",
        roomNumber: "C-102",
        course: "B.Tech ME",
        year: "4th Year",
        status: "active",
        joinDate: "2024-01-05",
        totalMeals: 260,
        pendingPayment: 0,
      },
      {
        id: "5",
        name: "Vikram Reddy",
        email: "vikram.reddy@example.com",
        phone: "+91 98765 43214",
        roomNumber: "B-401",
        course: "B.Tech IT",
        year: "3rd Year",
        status: "active",
        joinDate: "2024-01-18",
        totalMeals: 242,
        pendingPayment: 0,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (studentData: Omit<Student, "id">): Student => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, studentData: Omit<Student, "id">) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...studentData, id } : s))
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const getStudentByEmail = (email: string): Student | undefined => {
    return students.find((s) => s.email.toLowerCase() === email.toLowerCase());
  };

  const toggleStudentStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "inactive" : "active" }
          : s
      )
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentByEmail,
        toggleStudentStatus,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within StudentProvider");
  }
  return context;
};
