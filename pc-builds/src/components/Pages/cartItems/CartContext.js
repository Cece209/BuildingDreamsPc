import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    const [savedBuilds, setSavedBuilds] = useState(() => {
        const localData = localStorage.getItem('savedBuilds');
        return localData ? JSON.parse(localData) : [];
    });

    // Update localStorage when cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Update localStorage when savedBuilds changes
    useEffect(() => {
        localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
    }, [savedBuilds]);

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const saveBuild = () => {
        setSavedBuilds(prevBuilds => [...prevBuilds, { id: new Date().getTime(), items: cartItems }]);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Optionally clear from localStorage
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, savedBuilds, saveBuild, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
