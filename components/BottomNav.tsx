
import React from 'react';
import { motion } from 'framer-motion';
import type { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  favoritesCount: number;
}

interface NavItemProps {
  screen: Screen;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (screen: Screen) => void;
}

const NavItem = ({ screen, label, icon, isActive, onClick }: NavItemProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(screen)}
      className={`flex flex-col items-center justify-center w-1/5 transition-colors duration-300 ${isActive ? 'text-amber-500' : 'text-gray-400'}`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
};

const BottomNav = ({ activeScreen, onNavigate, favoritesCount }: BottomNavProps) => {
  const navItems: { screen: Screen; label: string; icon: React.ReactNode }[] = [
    { screen: 'chat', label: 'Live Chat', icon: <ChatIcon isActive={activeScreen === 'chat'}/> },
    { screen: 'profile', label: 'Profile', icon: <ProfileIcon isActive={activeScreen === 'profile'}/> },
    { screen: 'home', label: 'Home', icon: <HomeIcon isActive={activeScreen === 'home' || activeScreen === 'menu'}/> },
    { screen: 'favorites', label: 'Favorites', icon: <FavoritesIcon isActive={activeScreen === 'favorites'} count={favoritesCount} /> },
  ];

  return (
    <div className="h-20 bg-white rounded-t-2xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] flex justify-around items-center px-2">
      {navItems.slice(0, 2).map(item => (
        <NavItem
          key={item.screen}
          screen={item.screen}
          label={item.label}
          icon={item.icon}
          isActive={activeScreen === item.screen}
          onClick={onNavigate}
        />
      ))}
      <MenuIcon isActive={activeScreen === 'home' || activeScreen === 'menu'} onClick={() => onNavigate('menu')} />
      {navItems.slice(2).map(item => (
        <NavItem
          key={item.screen}
          screen={item.screen}
          label={item.label}
          icon={item.icon}
          isActive={item.screen === 'home' ? (activeScreen === 'home' || activeScreen === 'menu') : activeScreen === item.screen}
          onClick={onNavigate}
        />
      ))}
    </div>
  );
};

const ChatIcon = ({isActive}: {isActive: boolean}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ProfileIcon = ({isActive}: {isActive: boolean}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const HomeIcon = ({isActive}: {isActive: boolean}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const MenuIcon = ({isActive, onClick}: {isActive: boolean, onClick: () => void}) => (
    <motion.button 
        onClick={onClick} 
        whileTap={{ scale: 0.9 }}
        className={`relative w-16 h-16 flex items-center justify-center rounded-full -mt-8 transition-all duration-300 ${isActive ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 'bg-gray-200'}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className={`absolute top-14 text-xs font-medium ${isActive ? 'text-amber-500' : 'text-gray-400'}`}>Menu</span>
    </motion.button>
);

const FavoritesIcon = ({isActive, count}: {isActive: boolean, count: number}) => (
    <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={isActive ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 0 : 2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
        </svg>
        {count > 0 && (
            <motion.span 
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{scale: 0}}
              className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center"
            >
                {count}
            </motion.span>
        )}
    </div>
);

export default BottomNav;