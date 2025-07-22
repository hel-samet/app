
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onUpdateCartQuantity: (itemId: number, newQuantity: number) => void;
  onProceedToCheckout: () => void;
}

const CartScreen = ({ cart, onBack, onUpdateCartQuantity, onProceedToCheckout }: CartScreenProps) => {
  const formatter = new Intl.NumberFormat('en-US');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 500 : 0; // Example fee
  const total = subtotal + deliveryFee;

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <motion.button whileTap={{scale: 0.9}} onClick={onBack} className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </motion.button>
        <h2 className="font-bold text-xl text-gray-800">My Cart</h2>
        <div className="w-10 h-10"></div> {/* Spacer to center title */}
      </div>

      {/* Cart Items */}
      <div className="flex-grow overflow-y-auto -mx-6 scrollbar-hide">
        <AnimatePresence>
        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center text-gray-500 mt-20 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.821-6.831M15 1.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <h3 className="text-xl font-semibold mt-4">Your Cart is Empty</h3>
            <p className="mt-1">Looks like you haven't added anything to your cart yet.</p>
          </motion.div>
        ) : (
          <motion.div className="px-6 space-y-4">
            <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                className="flex items-center bg-white p-3 rounded-xl shadow-sm"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-grow ml-4">
                  <h3 className="font-semibold text-gray-800 text-md">{item.name}</h3>
                  <p className="text-amber-500 font-bold text-lg">N{formatter.format(item.price)}</p>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-1">
                  <motion.button whileTap={{scale:0.9}} onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)} className="text-xl font-bold text-amber-500 p-1 w-7 h-7 flex items-center justify-center rounded-full">-</motion.button>
                  <span className="text-md font-bold w-5 text-center">{item.quantity}</span>
                  <motion.button whileTap={{scale:0.9}} onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)} className="text-xl font-bold text-amber-500 p-1 w-7 h-7 flex items-center justify-center rounded-full">+</motion.button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Totals and Checkout */}
      <AnimatePresence>
      {cart.length > 0 && (
        <motion.div 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{type: "spring", stiffness: 300, damping: 30}}
          className="pt-4 mt-4 border-t flex-shrink-0"
        >
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">N{formatter.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="font-medium">N{formatter.format(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-800">
              <span>Total</span>
              <span>N{formatter.format(total)}</span>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onProceedToCheckout} 
            className="w-full bg-amber-500 text-white font-bold py-4 rounded-full hover:bg-amber-600 transition-colors duration-300 shadow-lg"
          >
            Proceed to Checkout
          </motion.button>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default CartScreen;