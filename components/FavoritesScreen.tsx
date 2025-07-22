import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FoodItem } from '../types';
import { HeartIcon } from './MenuScreen';

interface FavoritesScreenProps {
  favoriteItems: FoodItem[];
  onBack: () => void;
  onViewDetails: (item: FoodItem) => void;
  onToggleFavorite: (itemId: number) => void;
  onGoToCart: () => void;
  cartItemCount: number;
}

const FavoritesScreen = ({
  favoriteItems,
  onBack,
  onViewDetails,
  onToggleFavorite,
  onGoToCart,
  cartItemCount,
}: FavoritesScreenProps) => {
  const formatter = new Intl.NumberFormat('en-US');

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="p-2 -ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <h2 className="font-bold text-xl text-gray-800">My Favorites</h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onGoToCart} className="relative p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
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

      {/* Favorites List */}
      <div className="flex-grow overflow-y-auto -mx-6">
        <AnimatePresence>
          {favoriteItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center text-gray-500 mt-20 flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-semibold mt-4">No Favorites Yet</h3>
              <p className="mt-1 px-4">Tap the heart on any item to save it here for later.</p>
            </motion.div>
          ) : (
            <motion.div className="px-6 space-y-4">
              <AnimatePresence>
                {favoriteItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    className="flex items-center bg-white p-3 rounded-xl shadow-sm cursor-pointer"
                    onClick={() => onViewDetails(item)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-grow ml-4">
                      <h3 className="font-semibold text-gray-800 text-lg leading-tight">{item.name}</h3>
                      <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                        <StarIcon />
                        <span>
                          {item.rating} ({item.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-amber-500 font-bold text-xl mt-2">
                        N{formatter.format(item.price)}
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="p-2 ml-2 self-start"
                    >
                      <HeartIcon isFilled={true} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default FavoritesScreen;
