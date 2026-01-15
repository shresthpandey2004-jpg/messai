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
  // ==================== MONDAY ====================
  { id: 'm1-breakfast', name: 'Poha', description: 'Light flattened rice with peanuts and curry leaves', type: 'breakfast', day: 'Monday', likes: 45, dislikes: 5 },
  { id: 'm1-lunch', name: 'Dal Rice', description: 'Yellow dal with steamed rice and pickle', type: 'lunch', day: 'Monday', likes: 38, dislikes: 12 },
  { id: 'm1-snacks', name: 'Samosa & Tea', description: 'Crispy potato samosa with hot chai', type: 'snacks', day: 'Monday', likes: 82, dislikes: 3 },
  { id: 'm1-dinner', name: 'Paneer Butter Masala', description: 'Creamy paneer curry with naan and rice', type: 'dinner', day: 'Monday', likes: 78, dislikes: 8, isSpecial: true },
  
  // ==================== TUESDAY ====================
  { id: 't1-breakfast', name: 'Upma', description: 'Semolina breakfast with vegetables and coconut chutney', type: 'breakfast', day: 'Tuesday', likes: 32, dislikes: 18 },
  { id: 't1-lunch', name: 'Rajma Chawal', description: 'Kidney beans curry with steamed rice', type: 'lunch', day: 'Tuesday', likes: 65, dislikes: 10 },
  { id: 't1-snacks', name: 'Bread Pakora & Tea', description: 'Fried bread fritters with green chutney', type: 'snacks', day: 'Tuesday', likes: 58, dislikes: 8 },
  { id: 't1-dinner', name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', type: 'dinner', day: 'Tuesday', likes: 82, dislikes: 6, isSpecial: true },
  
  // ==================== WEDNESDAY ====================
  { id: 'w1-breakfast', name: 'Aloo Paratha', description: 'Stuffed potato flatbread with curd and butter', type: 'breakfast', day: 'Wednesday', likes: 88, dislikes: 4, isSpecial: true },
  { id: 'w1-lunch', name: 'Veg Biryani', description: 'Fragrant rice with mixed vegetables and raita', type: 'lunch', day: 'Wednesday', likes: 72, dislikes: 15 },
  { id: 'w1-snacks', name: 'Vada Pav & Tea', description: 'Spicy potato fritter in bun with chutney', type: 'snacks', day: 'Wednesday', likes: 75, dislikes: 5 },
  { id: 'w1-dinner', name: 'Palak Paneer', description: 'Spinach curry with cottage cheese and roti', type: 'dinner', day: 'Wednesday', likes: 55, dislikes: 20 },
  
  // ==================== THURSDAY ====================
  { id: 'th1-breakfast', name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup and coconut chutney', type: 'breakfast', day: 'Thursday', likes: 58, dislikes: 12 },
  { id: 'th1-lunch', name: 'Kadhi Pakoda', description: 'Yogurt curry with gram flour fritters and rice', type: 'lunch', day: 'Thursday', likes: 42, dislikes: 22 },
  { id: 'th1-snacks', name: 'Aloo Tikki & Tea', description: 'Crispy potato patties with tamarind chutney', type: 'snacks', day: 'Thursday', likes: 68, dislikes: 7 },
  { id: 'th1-dinner', name: 'Mixed Veg Curry', description: 'Seasonal vegetables curry with roti and dal', type: 'dinner', day: 'Thursday', likes: 35, dislikes: 25 },
  
  // ==================== FRIDAY ====================
  { id: 'f1-breakfast', name: 'Masala Dosa', description: 'Crispy rice crepe with potato filling and sambar', type: 'breakfast', day: 'Friday', likes: 75, dislikes: 8 },
  { id: 'f1-lunch', name: 'Pav Bhaji', description: 'Spiced vegetable mash with buttered bread rolls', type: 'lunch', day: 'Friday', likes: 90, dislikes: 5, isSpecial: true },
  { id: 'f1-snacks', name: 'Paneer Pakora & Tea', description: 'Fried cottage cheese fritters with mint chutney', type: 'snacks', day: 'Friday', likes: 85, dislikes: 4 },
  { id: 'f1-dinner', name: 'Dal Makhani', description: 'Creamy black lentils with butter, naan and rice', type: 'dinner', day: 'Friday', likes: 68, dislikes: 12 },
  
  // ==================== SATURDAY ====================
  { id: 's1-breakfast', name: 'Puri Bhaji', description: 'Deep fried bread with spicy potato curry', type: 'breakfast', day: 'Saturday', likes: 70, dislikes: 10 },
  { id: 's1-lunch', name: 'Chole Kulche', description: 'Chickpea curry with soft leavened bread', type: 'lunch', day: 'Saturday', likes: 78, dislikes: 8 },
  { id: 's1-snacks', name: 'Samosa Chaat & Tea', description: 'Crushed samosa with yogurt and chutneys', type: 'snacks', day: 'Saturday', likes: 88, dislikes: 3, isSpecial: true },
  { id: 's1-dinner', name: 'Jeera Rice & Gravy', description: 'Cumin rice with mixed vegetable gravy and dal', type: 'dinner', day: 'Saturday', likes: 45, dislikes: 15 },
  
  // ==================== SUNDAY ====================
  { id: 'su1-breakfast', name: 'Chole Bhature', description: 'Chickpeas curry with fried bread (Sunday special)', type: 'breakfast', day: 'Sunday', likes: 92, dislikes: 5, isSpecial: true },
  { id: 'su1-lunch', name: 'Special Thali', description: 'Complete meal with variety - dal, sabzi, rice, roti, sweet', type: 'lunch', day: 'Sunday', likes: 95, dislikes: 3, isSpecial: true },
  { id: 'su1-snacks', name: 'Jalebi & Tea', description: 'Sweet crispy spirals with hot masala chai', type: 'snacks', day: 'Sunday', likes: 94, dislikes: 2, isSpecial: true },
  { id: 'su1-dinner', name: 'Gulab Jamun & Ice Cream', description: 'Sweet dessert balls in syrup with vanilla ice cream', type: 'dinner', day: 'Sunday', likes: 98, dislikes: 2, isSpecial: true },
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
