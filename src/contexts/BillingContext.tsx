import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MealRecord {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  snacks: boolean;
  dinner: boolean;
}

interface BillingContextType {
  mealRecords: MealRecord[];
  addMealRecord: (record: MealRecord) => void;
  getTotalMeals: () => number;
  getMealCost: () => number;
  getMonthlyBill: () => number;
  clearRecords: () => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

const MEAL_RATE = 56.45; // Rate per meal

export const BillingProvider = ({ children }: { children: ReactNode }) => {
  const [mealRecords, setMealRecords] = useState<MealRecord[]>(() => {
    const saved = localStorage.getItem("mealRecords");
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize with current month's data (mock data for demo)
    const records: MealRecord[] = [];
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= today.getDate(); i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      // Simulate realistic meal consumption (80-90% attendance)
      const random = Math.random();
      records.push({
        date: date.toISOString().split('T')[0],
        breakfast: random > 0.15,
        lunch: random > 0.1,
        snacks: random > 0.2,
        dinner: random > 0.15,
      });
    }
    
    return records;
  });

  useEffect(() => {
    localStorage.setItem("mealRecords", JSON.stringify(mealRecords));
  }, [mealRecords]);

  const addMealRecord = (record: MealRecord) => {
    setMealRecords(prev => {
      const existing = prev.findIndex(r => r.date === record.date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = record;
        return updated;
      }
      return [...prev, record];
    });
  };

  const getTotalMeals = () => {
    return mealRecords.reduce((total, record) => {
      return total + 
        (record.breakfast ? 1 : 0) + 
        (record.lunch ? 1 : 0) + 
        (record.snacks ? 1 : 0) + 
        (record.dinner ? 1 : 0);
    }, 0);
  };

  const getMealCost = () => {
    return MEAL_RATE;
  };

  const getMonthlyBill = () => {
    const totalMeals = getTotalMeals();
    return Math.round(totalMeals * MEAL_RATE);
  };

  const clearRecords = () => {
    setMealRecords([]);
  };

  return (
    <BillingContext.Provider
      value={{
        mealRecords,
        addMealRecord,
        getTotalMeals,
        getMealCost,
        getMonthlyBill,
        clearRecords,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within BillingProvider");
  }
  return context;
};
