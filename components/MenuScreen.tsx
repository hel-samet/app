
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FoodItem } from '../types';
import { FOOD_ITEMS } from '../constants';

interface MenuScreenProps {
  onViewDetails: (item: FoodItem) => void;
  cartItemCount: number;
  onToggleFavorite: (itemId: number) => void;
  favorites: number[];
  onGoToCart: () => void;
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

export const FoodCard = ({ item, onViewDetails, onToggleFavorite, isFavorite }: { item: FoodItem; onViewDetails: (item: FoodItem) => void; onToggleFavorite: (itemId: number) => void; isFavorite: boolean }) => {
  const formatter = new Intl.NumberFormat('en-US');

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center relative cursor-pointer"
      onClick={() => onViewDetails(item)}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
        className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full p-2 z-10"
      >
        <HeartIcon isFilled={isFavorite} />
      </motion.button>
      <motion.img
        layoutId={`food-image-${item.id}`}
        src={item.image}
        alt={item.name}
        className="w-28 h-28 rounded-full object-cover -mt-10 shadow-lg"
      />
      <h3 className="mt-4 font-semibold text-lg text-gray-800">{item.name}</h3>
      <p className="mt-1 font-bold text-amber-500">N{formatter.format(item.price)}</p>
    </motion.div>
  );
};

const MenuScreen = ({ onViewDetails, cartItemCount, onToggleFavorite, favorites, onGoToCart }: MenuScreenProps) => {
  const categories: FoodItem['category'][] = ['Meals', 'Sides', 'Snacks', 'Drinks'];
  const [activeCategory, setActiveCategory] = useState<FoodItem['category']>('Meals');

  const filteredItems = FOOD_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="font-bold text-xl text-gray-800">Our Menu</h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onGoToCart} className="relative p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
                {cartItemCount}
            </motion.span>
          )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {categories.map(category => (
          <button 
            key={category} 
            onClick={() => setActiveCategory(category)}
            className={`py-2 px-4 whitespace-nowrap font-semibold relative ${activeCategory === category ? 'text-amber-500' : 'text-gray-400'}`}
          >
            {category}
            {activeCategory === category && <motion.span layoutId="category-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-full"></motion.span>}
          </button>
        ))}
      </div>

      <div className="border-b border-gray-200 -mx-6 mt-2 mb-8"></div>
        <AnimatePresence mode="wait">
            <motion.div
                key={activeCategory}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-2 gap-x-4 gap-y-12"
            >
                {filteredItems.map(item => (
                <FoodCard key={item.id} item={item} onViewDetails={onViewDetails} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(item.id)} />
                ))}
            </motion.div>
        </AnimatePresence>
        {filteredItems.length === 0 && <p className="col-span-2 text-center text-gray-500 mt-8">No items in this category yet.</p>}
    </div>
  );
};

export const HeartIcon = ({ isFilled }: { isFilled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFilled ? 'text-red-500' : 'text-gray-400'}`} viewBox="0 0 20 20" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);


export default MenuScreen;