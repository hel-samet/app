
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FoodItem, CartItem } from '../types';

interface DetailScreenProps {
  item: FoodItem;
  onBack: () => void;
  onAddToCart: (item: FoodItem, quantity: number) => void;
  onUpdateCartQuantity: (itemId: number, newQuantity: number) => void;
  cart: CartItem[];
  cartItemCount: number;
  recommendedItems: FoodItem[];
  onToggleFavorite: (itemId: number) => void;
  isFavorite: boolean;
  onGoToCart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const DetailScreen = ({ item, onBack, onAddToCart, onUpdateCartQuantity, cart, cartItemCount, recommendedItems, onToggleFavorite, isFavorite, onGoToCart }: DetailScreenProps) => {
  const [quantity, setQuantity] = useState(1);
  const formatter = new Intl.NumberFormat('en-US');

  const mainItemInCart = useMemo(() => cart.find(cartItem => cartItem.id === item.id), [cart, item.id]);

  const recommendedSidesInCart = useMemo(() => {
    return recommendedItems.map(side => {
      const cartItem = cart.find(ci => ci.id === side.id);
      return cartItem ? cartItem : { ...side, quantity: 0 };
    });
  }, [cart, recommendedItems]);

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <motion.div className="bg-white min-h-full" variants={containerVariants} initial="hidden" animate="visible">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={onGoToCart} className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <AnimatePresence>
            {cartItemCount > 0 && <motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItemCount}</motion.span>}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      
      <div className="flex flex-col items-center -mt-8">
        <div className="relative">
          <motion.img layoutId={`food-image-${item.id}`} src={item.image} alt={item.name} className="w-48 h-48 rounded-full object-cover shadow-lg" />
          <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} onClick={() => onToggleFavorite(item.id)} className="absolute bottom-2 right-0 bg-white rounded-full p-3 shadow-md">
             <HeartIcon isFilled={isFavorite} />
          </motion.button>
        </div>
      </div>

      <motion.div variants={itemVariants} className="text-center mt-4 px-6">
        <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <StarIcon />
          <span className="text-gray-500 font-medium">{item.rating} ({item.reviews} ratings)</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-3xl font-bold text-amber-500">N{formatter.format(item.price)}</p>
          <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-2">
            <motion.button whileTap={{scale: 0.9}} onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-2xl text-amber-500 p-2">-</motion.button>
            <span className="text-lg font-bold w-6 text-center">{quantity}</span>
            <motion.button whileTap={{scale: 0.9}} onClick={() => setQuantity(q => q + 1)} className="text-2xl text-amber-500 p-2">+</motion.button>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="px-6 mt-6">
        <h3 className="font-bold text-lg">Description</h3>
        <p className="text-gray-600 mt-2 text-sm">{item.description} <span className="font-semibold text-amber-500">(Each serving contains {item.calories} calories)</span></p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="font-bold text-lg px-6">Recommended sides</h3>
        <div className="flex space-x-4 overflow-x-auto p-6 pt-4 scrollbar-hide">
          {recommendedSidesInCart.map((side, index) => (
            <motion.div 
              key={side.id} 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-32 text-center"
            >
              <img src={side.image} alt={side.name} className="w-24 h-24 rounded-full object-cover mx-auto shadow-md"/>
              <p className="font-semibold mt-2 text-sm">{side.name}</p>
              <p className="text-amber-500 font-bold text-sm">N{formatter.format(side.price)}</p>
              <div className="flex items-center justify-center space-x-2 bg-gray-100 rounded-full mt-2">
                <motion.button whileTap={{scale:0.9}} onClick={() => onUpdateCartQuantity(side.id, side.quantity - 1)} className="text-lg text-amber-500 p-1">-</motion.button>
                <span className="text-md font-bold w-4 text-center">{side.quantity}</span>
                <motion.button whileTap={{scale:0.9}} onClick={() => onUpdateCartQuantity(side.id, side.quantity + 1)} className="text-lg text-amber-500 p-1">+</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="p-6 mt-auto">
        <motion.button 
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-amber-500 text-white font-bold py-4 rounded-full hover:bg-amber-600 transition-colors duration-300 shadow-lg flex items-center justify-center space-x-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span>Add to Cart</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const HeartIcon = ({ isFilled }: { isFilled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFilled ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 20 20" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


export default DetailScreen;