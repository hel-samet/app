
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen, FoodItem, CartItem } from './types';
import { FOOD_ITEMS } from './constants';
import AuthScreen from './components/AuthScreen';
import MenuScreen from './components/MenuScreen';
import DetailScreen from './components/DetailScreen';
import CartScreen from './components/CartScreen';
import PaymentScreen from './components/PaymentScreen';
import BottomNav from './components/BottomNav';
import FavoritesScreen from './components/FavoritesScreen';
import ProfileScreen from './components/ProfileScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleLogin = () => {
    setCurrentScreen('menu');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const viewDetails = (item: FoodItem) => {
    setSelectedItem(item);
    setCurrentScreen('detail');
  };

  const goBackToMenu = () => {
    setSelectedItem(null);
    setCurrentScreen('menu');
  };
  
  const handleGoToCart = () => {
    setCurrentScreen('cart');
  };

  const handleProceedToCheckout = () => {
    setCurrentScreen('payment');
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Your order is on its way.');
    setCart([]);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setCart([]);
    setFavorites([]);
    setSelectedItem(null);
    setCurrentScreen('auth');
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };
  
  const addToCart = (item: FoodItem, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const updateCartQuantity = (itemId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      return prevCart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 0 ? 500 : 0;
    return subtotal + deliveryFee;
  }, [cart]);

  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '-100%' },
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate',
    duration: 0.5,
  };

  const renderScreen = () => {
    let screenComponent;
    switch (currentScreen) {
      case 'auth':
        screenComponent = <AuthScreen onLogin={handleLogin} />;
        break;
      case 'menu':
        screenComponent = <MenuScreen onViewDetails={viewDetails} cartItemCount={cartItemCount} onToggleFavorite={toggleFavorite} favorites={favorites} onGoToCart={handleGoToCart} />;
        break;
      case 'detail':
        if (selectedItem) {
          screenComponent = (
            <DetailScreen
              item={selectedItem}
              onBack={goBackToMenu}
              onAddToCart={addToCart}
              onUpdateCartQuantity={updateCartQuantity}
              cart={cart}
              cartItemCount={cartItemCount}
              recommendedItems={FOOD_ITEMS.filter(item => item.category === 'Sides' && item.id !== selectedItem.id)}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(selectedItem.id)}
              onGoToCart={handleGoToCart}
            />
          );
        } else {
           screenComponent = <MenuScreen onViewDetails={viewDetails} cartItemCount={cartItemCount} onToggleFavorite={toggleFavorite} favorites={favorites} onGoToCart={handleGoToCart} />; // Fallback
        }
        break;
      case 'cart':
        screenComponent = <CartScreen cart={cart} onBack={goBackToMenu} onUpdateCartQuantity={updateCartQuantity} onProceedToCheckout={handleProceedToCheckout} />;
        break;
      case 'payment':
        screenComponent = <PaymentScreen totalAmount={totalAmount} onBack={() => setCurrentScreen('cart')} onPaymentSuccess={handlePaymentSuccess} />;
        break;
      case 'profile':
        screenComponent = <ProfileScreen onBack={goBackToMenu} onLogout={handleLogout} />;
        break;
      case 'favorites': {
        const favoriteItems = FOOD_ITEMS.filter(item => favorites.includes(item.id));
        screenComponent = (
          <FavoritesScreen
            favoriteItems={favoriteItems}
            onBack={goBackToMenu}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
            onGoToCart={handleGoToCart}
            cartItemCount={cartItemCount}
          />
        );
        break;
      }
      default:
         screenComponent = <MenuScreen onViewDetails={viewDetails} cartItemCount={cartItemCount} onToggleFavorite={toggleFavorite} favorites={favorites} onGoToCart={handleGoToCart} />;
    }
     return (
        <motion.div
            key={currentScreen}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full w-full"
        >
            {screenComponent}
        </motion.div>
    );
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-[800px] bg-gray-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        <div className="flex-grow overflow-y-auto pb-20 scrollbar-hide">
            <AnimatePresence mode="wait">
                {renderScreen()}
            </AnimatePresence>
        </div>
        <AnimatePresence>
        {currentScreen !== 'auth' && currentScreen !== 'payment' && (
          <motion.div
             initial={{ y: '100%' }}
             animate={{ y: 0 }}
             exit={{ y: '100%' }}
             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
             className="absolute bottom-0 left-0 right-0"
          >
            <BottomNav activeScreen={currentScreen} onNavigate={navigateTo} favoritesCount={favorites.length} />
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
