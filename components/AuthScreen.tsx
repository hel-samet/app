
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AuthScreenProps {
  onLogin: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};


const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="bg-white min-h-full flex flex-col items-center justify-center p-6 pt-12 relative overflow-hidden">
        <motion.div initial={{ scale: 0, opacity: 0}} animate={{ scale: 1, opacity: 1, transition: { type: 'spring', delay: 0.2 } }} className="absolute -top-24 -left-24 w-48 h-48 bg-amber-100 rounded-full"></motion.div>
        <motion.div initial={{ scale: 0, opacity: 0}} animate={{ scale: 1, opacity: 1, transition: { type: 'spring', delay: 0.4 } }} className="absolute -bottom-16 -right-20 w-52 h-52 bg-amber-100 rounded-full"></motion.div>
        
        <motion.div variants={itemVariants} className="text-center mb-8 z-10">
            <h1 className="text-5xl font-bold text-amber-500">Yummies</h1>
            <p className="text-gray-500">Food Delivery App</p>
        </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-xs z-10">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center relative -mt-10">
            <motion.div initial={{y: -50, opacity: 0}} animate={{y:0, opacity: 1}} transition={{delay: 0.5}} className="absolute -top-16">
                 <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1" alt="Food" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"/>
            </motion.div>
            <div className="w-full mt-16">
                <div className="flex justify-center border-b mb-6">
                    <button 
                        className={`w-1/2 pb-2 font-semibold text-center transition-colors duration-300 ${activeTab === 'signin' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('signin')}
                    >
                        Sign In
                    </button>
                    <button 
                        className={`w-1/2 pb-2 font-semibold text-center transition-colors duration-300 ${activeTab === 'signup' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                {activeTab === 'signin' ? (
                    <motion.form variants={containerVariants} className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                        <motion.div variants={itemVariants}>
                            <label className="text-sm font-medium text-gray-500" htmlFor="email">E-mail address</label>
                            <input id="email" type="email" className="w-full p-3 mt-1 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" defaultValue="example@email.com" />
                        </motion.div>
                        <motion.div variants={itemVariants} className="relative">
                            <label className="text-sm font-medium text-gray-500" htmlFor="password">Enter password</label>
                            <input id="password" type={passwordVisible ? "text" : "password"} className="w-full p-3 mt-1 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" defaultValue="password" />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400">
                                <EyeIcon />
                            </button>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-amber-500 rounded" defaultChecked />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <a href="#" className="font-medium text-gray-500 hover:text-amber-500">Forgot password?</a>
                        </motion.div>
                        <motion.button variants={itemVariants} type="submit" whileTap={{ scale: 0.95 }} className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-md">
                            Login
                        </motion.button>
                    </motion.form>
                ) : (
                     <div className="text-center text-gray-500 py-10">Sign Up form coming soon!</div>
                )}
                 <motion.div variants={itemVariants} className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-400 font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mb-4">Sign in using:</motion.p>
                <motion.div variants={itemVariants} className="flex justify-center space-x-4">
                    <motion.button whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition"><GoogleIcon /></motion.button>
                    <motion.button whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition"><FacebookIcon /></motion.button>
                    <motion.button whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition"><TwitterIcon /></motion.button>
                </motion.div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const GoogleIcon = () => (<svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.09 4.809A11.932 11.932 0 0 1 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.824A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12h-8c0 6.627 5.373 12 12 12c0 1.341.138 2.65.389 3.917z"></path><path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 7.581l6.19 4.824C40.021 35.637 44 29.895 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>);
const FacebookIcon = () => (<svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>);
const TwitterIcon = () => (<svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.56 1.45-1.26 1.99-2.06z"></path></svg>);

export default AuthScreen;