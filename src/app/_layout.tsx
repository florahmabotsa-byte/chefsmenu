import React, { createContext, useContext, useState } from 'react';
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

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used inside MenuProvider');
  }

  return context;
}

export default function RootLayout() {
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

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((current) => [...current, item]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((current) =>
      current.map((oldItem) =>
        oldItem.id === item.id ? item : oldItem
      )
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
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
    </MenuContext.Provider>
  );
}