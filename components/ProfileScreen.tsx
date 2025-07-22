
import React from 'react';
import { motion } from 'framer-motion';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
};

const ProfileScreen = ({ onBack, onLogout }: ProfileScreenProps) => {
  const profileMenuItems = [
    { label: 'My Orders', icon: <OrderIcon /> },
    { label: 'My Favorites', icon: <HeartIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> },
    { label: 'Help & Support', icon: <HelpIcon /> },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 h-full flex flex-col bg-gray-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="p-2 -ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </motion.button>
        <h2 className="font-bold text-xl text-gray-800">My Profile</h2>
        <div className="w-6 h-6"></div> {/* Spacer */}
      </div>

      {/* Profile Info */}
      <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 flex-shrink-0">
        <motion.img
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.1 }}
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Profile" 
          className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
        />
        <h3 className="mt-4 text-2xl font-bold text-gray-800">Jane Doe</h3>
        <p className="text-gray-500">example@email.com</p>
      </motion.div>

      {/* Menu List */}
      <motion.div variants={containerVariants} className="flex-grow space-y-3">
        {profileMenuItems.map((item, index) => (
          <motion.button 
            key={index}
            variants={itemVariants}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center w-full p-4 bg-white rounded-xl shadow-sm hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="text-amber-500">{item.icon}</span>
            <span className="ml-4 font-semibold text-gray-700">{item.label}</span>
            <span className="ml-auto text-gray-400"><ChevronRightIcon /></span>
          </motion.button>
        ))}
      </motion.div>
      
      {/* Logout Button */}
      <motion.div variants={itemVariants} className="mt-auto pt-6 flex-shrink-0">
        <motion.button 
          onClick={onLogout}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-4 rounded-full transition-colors duration-300"
        >
          <LogoutIcon />
          <span>Logout</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// --- ICONS ---

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const OrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export default ProfileScreen;
