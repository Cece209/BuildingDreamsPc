import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [savedBuilds, setSavedBuilds] = useState([]);

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const saveBuild = () => {
        setSavedBuilds(prevBuilds => [...prevBuilds, { id: new Date().getTime(), items: cartItems }]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, savedBuilds, saveBuild, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);