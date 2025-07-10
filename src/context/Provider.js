import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState("userDemo"); 

  const updateUser = (newUser) => {
    setUser(newUser);
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
        const isFavorite = prev.includes(productId);
        if (isFavorite) {
            return prev.filter((id) => id !== productId);
        } else {
            return [...prev, productId];
        }
    });
  };

  return (
    <StateContext.Provider value={{ favorites, toggleFavorite , user, updateUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useFavorites = () => useContext(StateContext);
