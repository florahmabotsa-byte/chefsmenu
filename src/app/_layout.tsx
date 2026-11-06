import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { Stack } from 'expo-router';

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

// Custom hook to access menu data
export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'useMenu must be used inside MenuProvider'
    );
  }

  return context;
}

// Menu Provider
function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'Chicken Burger',
      description: 'Chicken burger with chips',
      course: 'Main Course',
      price: '85',
    },
    {
      id: '2',
      dishName: 'Chocolate Cake',
      description: 'Delicious chocolate cake',
      course: 'Dessert',
      price: '55',
    },
  ]);

  // Add menu item
  const addMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((current) => [...current, item]);
  }, []);

  // Update menu item
  const updateMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((current) =>
      current.map((oldItem) =>
        oldItem.id === item.id ? item : oldItem
      )
    );
  }, []);

  // Delete menu item
  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }, []);

  const value = useMemo(
    () => ({
      menuItems,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
    }),
    [
      menuItems,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
    ]
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}

// Main Application Layout
export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Chef's Menu",
          }}
        />

        <Stack.Screen
          name="addmenuitems"
          options={{
            title: 'Add Menu Item',
          }}
        />

        <Stack.Screen
          name="aditmenu"
          options={{
            title: 'Edit Menu Item',
          }}
        />

        <Stack.Screen
          name="explore"
          options={{
            title: 'Menu Items',
          }}
        />
      </Stack>
    </MenuProvider>
  );
}