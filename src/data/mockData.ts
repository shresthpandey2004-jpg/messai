// Mock data for MessAI application

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  day: string;
  image?: string;
  likes: number;
  dislikes: number;
  isSpecial?: boolean;
}

export interface FeedbackItem {
  id: string;
  menuItemId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roomNumber: string;
  isAdmin: boolean;
  attendance: { date: string; present: boolean }[];
  monthlyBill: number;
}

export interface Booking {
  id: string;
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  status: 'booked' | 'cancelled' | 'completed';
}

export const weeklyMenu: MenuItem[] = [
  // Monday
  { id: '1', name: 'Poha', description: 'Light flattened rice with peanuts', type: 'breakfast', day: 'Monday', likes: 45, dislikes: 5 },
  { id: '2', name: 'Dal Rice', description: 'Yellow dal with steamed rice', type: 'lunch', day: 'Monday', likes: 38, dislikes: 12 },
  { id: '3', name: 'Paneer Butter Masala', description: 'Creamy paneer curry with naan', type: 'dinner', day: 'Monday', likes: 78, dislikes: 8, isSpecial: true },
  
  // Tuesday
  { id: '4', name: 'Upma', description: 'Semolina breakfast with vegetables', type: 'breakfast', day: 'Tuesday', likes: 32, dislikes: 18 },
  { id: '5', name: 'Rajma Chawal', description: 'Kidney beans curry with rice', type: 'lunch', day: 'Tuesday', likes: 65, dislikes: 10 },
  { id: '6', name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', type: 'dinner', day: 'Tuesday', likes: 82, dislikes: 6 },
  
  // Wednesday
  { id: '7', name: 'Aloo Paratha', description: 'Stuffed potato flatbread with curd', type: 'breakfast', day: 'Wednesday', likes: 88, dislikes: 4, isSpecial: true },
  { id: '8', name: 'Veg Biryani', description: 'Fragrant rice with mixed vegetables', type: 'lunch', day: 'Wednesday', likes: 72, dislikes: 15 },
  { id: '9', name: 'Palak Paneer', description: 'Spinach curry with cottage cheese', type: 'dinner', day: 'Wednesday', likes: 55, dislikes: 20 },
  
  // Thursday
  { id: '10', name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup', type: 'breakfast', day: 'Thursday', likes: 58, dislikes: 12 },
  { id: '11', name: 'Kadhi Pakoda', description: 'Yogurt curry with gram flour fritters', type: 'lunch', day: 'Thursday', likes: 42, dislikes: 22 },
  { id: '12', name: 'Mixed Veg', description: 'Seasonal vegetables with roti', type: 'dinner', day: 'Thursday', likes: 35, dislikes: 25 },
  
  // Friday
  { id: '13', name: 'Dosa', description: 'Crispy rice crepe with chutney', type: 'breakfast', day: 'Friday', likes: 75, dislikes: 8 },
  { id: '14', name: 'Pav Bhaji', description: 'Spiced vegetable mash with bread rolls', type: 'lunch', day: 'Friday', likes: 90, dislikes: 5, isSpecial: true },
  { id: '15', name: 'Dal Makhani', description: 'Creamy black lentils with butter', type: 'dinner', day: 'Friday', likes: 68, dislikes: 12 },
  
  // Saturday
  { id: '16', name: 'Puri Bhaji', description: 'Deep fried bread with potato curry', type: 'breakfast', day: 'Saturday', likes: 70, dislikes: 10 },
  { id: '17', name: 'Samosa', description: 'Crispy potato pastries', type: 'lunch', day: 'Saturday', likes: 85, dislikes: 5, isSpecial: true },
  { id: '18', name: 'Jeera Rice & Gravy', description: 'Cumin rice with vegetable gravy', type: 'dinner', day: 'Saturday', likes: 45, dislikes: 15 },
  
  // Sunday
  { id: '19', name: 'Chole Kulche', description: 'Chickpeas with soft bread', type: 'breakfast', day: 'Sunday', likes: 78, dislikes: 8 },
  { id: '20', name: 'Special Thali', description: 'Complete meal with variety', type: 'lunch', day: 'Sunday', likes: 95, dislikes: 3, isSpecial: true },
  { id: '21', name: 'Gulab Jamun', description: 'Sweet dessert balls in syrup', type: 'dinner', day: 'Sunday', likes: 98, dislikes: 2, isSpecial: true },
];

export const complaintTemplates = [
  "Food was too oily today.",
  "Rice was very dry and undercooked.",
  "Chapati was hard and stale.",
  "Vegetables were overcooked.",
  "Dal was too watery.",
  "Food was too salty.",
  "Curd was sour and not fresh.",
  "Portion size was too small.",
  "Food was served cold.",
  "Spices were too strong.",
  "Food quality has declined recently.",
  "Hygiene standards need improvement.",
  "Waiting time was too long.",
  "Menu variety is lacking.",
  "Food was bland and tasteless.",
];

export const mockUser: User = {
  id: 'user1',
  name: 'Rahul Sharma',
  email: 'rahul@college.edu',
  roomNumber: 'A-204',
  isAdmin: false,
  attendance: [
    { date: '2024-01-01', present: true },
    { date: '2024-01-02', present: true },
    { date: '2024-01-03', present: false },
    { date: '2024-01-04', present: true },
    { date: '2024-01-05', present: true },
  ],
  monthlyBill: 3500,
};

export const mockBookings: Booking[] = [
  { id: 'b1', userId: 'user1', date: '2024-01-06', mealType: 'lunch', status: 'booked' },
  { id: 'b2', userId: 'user1', date: '2024-01-07', mealType: 'dinner', status: 'booked' },
];

// AI Logic Functions
export const generateComplaint = (rating: number, dishName: string): string => {
  if (rating <= 2) {
    const randomIndex = Math.floor(Math.random() * complaintTemplates.length);
    return `Regarding ${dishName}: ${complaintTemplates[randomIndex]}`;
  }
  return '';
};

export const getRecommendedDishes = (menu: MenuItem[]): MenuItem[] => {
  return [...menu]
    .sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
    .slice(0, 5);
};

export const getTodaysMenu = (): MenuItem[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return weeklyMenu.filter(item => item.day === today);
};

export const getSpecialDishes = (): MenuItem[] => {
  return weeklyMenu.filter(item => item.isSpecial);
};
