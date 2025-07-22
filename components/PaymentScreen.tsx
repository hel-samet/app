
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PaymentScreenProps {
  totalAmount: number;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentScreen = ({ totalAmount, onBack, onPaymentSuccess }: PaymentScreenProps) => {
  const formatter = new Intl.NumberFormat('en-US');
  const [cardHolder, setCardHolder] = useState('Jane Doe');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/25');
  const [cvc, setCvc] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [saveCard, setSaveCard] = useState(true);

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };
  
  const formatExpiry = (value: string) => {
    let text = value.replace(/\D/g, '').slice(0, 4);
    if (text.length > 2) {
      text = text.slice(0, 2) + '/' + text.slice(2);
    }
    return text;
  };
  
  const InputField = ({ label, id, children }: {label: string, id: string, children: React.ReactNode}) => (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <motion.button whileTap={{scale:0.9}} onClick={onBack} className="p-2 -ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </motion.button>
        <h2 className="font-bold text-xl text-gray-800">Payment Details</h2>
        <div className="w-6 h-6"></div> {/* Spacer */}
      </div>

      {/* Flippable Credit Card Visual */}
      <div className="mb-6 flex-shrink-0" style={{ perspective: '1000px' }}>
        <motion.div 
            className={`relative w-full h-48`} 
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Card Front */}
          <div className="absolute w-full h-full bg-gradient-to-tr from-gray-700 to-gray-900 text-white p-5 rounded-2xl shadow-lg flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-start">
              <ChipIcon />
              <VisaIcon />
            </div>
            <div>
              <p className="text-xl font-mono tracking-wider mb-2">{cardNumber || '**** **** **** ****'}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400">Card Holder</p>
                  <p className="font-medium uppercase tracking-wider">{cardHolder || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Expires</p>
                  <p className="font-medium">{expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card Back */}
          <div className="absolute w-full h-full bg-gradient-to-tr from-gray-800 to-gray-900 text-white p-5 rounded-2xl shadow-lg flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="w-full h-8 bg-black mt-4"></div>
            <div className="flex justify-end mt-4">
              <div className="bg-white rounded p-1 w-3/4">
                 <p className="text-black text-right font-mono text-sm italic pr-2">{cvc}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 self-end">CVC</p>
          </div>
        </motion.div>
      </div>
      
      {/* Payment Form */}
      <form className="flex-grow flex flex-col" onSubmit={(e) => { e.preventDefault(); onPaymentSuccess(); }}>
        <div className="space-y-4">
          <InputField label="Card Holder" id="cardHolder">
            <input id="cardHolder" type="text" value={cardHolder} onFocus={() => setIsFlipped(false)} onChange={e => setCardHolder(e.target.value)} className="w-full p-3 mt-1 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors" />
          </InputField>
          
          <InputField label="Card Number" id="cardNumber">
             <input id="cardNumber" type="tel" value={cardNumber} onFocus={() => setIsFlipped(false)} onChange={e => setCardNumber(formatCardNumber(e.target.value))} maxLength={19} className="w-full p-3 mt-1 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors" />
          </InputField>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <InputField label="Expiry Date" id="expiry">
                <input id="expiry" type="text" placeholder="MM/YY" value={expiry} onFocus={() => setIsFlipped(false)} onChange={e => setExpiry(formatExpiry(e.target.value))} className="w-full p-3 mt-1 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors" />
              </InputField>
            </div>
            <div className="w-1/2">
              <InputField label="CVC" id="cvc">
                <input id="cvc" type="tel" placeholder="123" value={cvc} onFocus={() => setIsFlipped(true)} onBlur={() => setIsFlipped(false)} onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0,3))} maxLength={3} className="w-full p-3 mt-1 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors" />
              </InputField>
            </div>
          </div>
          
          <div className="flex items-center pt-2">
            <input
              id="saveCard"
              type="checkbox"
              checked={saveCard}
              onChange={() => setSaveCard(!saveCard)}
              className="h-5 w-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="saveCard" className="ml-3 text-sm text-gray-700">
              Save card for future payments
            </label>
          </div>

        </div>
        
        <div className="mt-auto pt-6 flex-shrink-0">
          <motion.button 
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full bg-amber-500 text-white font-bold py-4 rounded-full hover:bg-amber-600 transition-colors duration-300 shadow-lg flex items-center justify-center space-x-2 active:scale-95"
          >
            <LockIcon />
            <span>Pay N{formatter.format(totalAmount)}</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

const ChipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16v12H4z" opacity=".3"/>
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/>
      <path d="M9 11h2v2H9zM13 11h2v2h-2zM9 14h2v2H9zM13 14h2v2h-2z"/>
      <path d="M6 8h10v2H6z"/>
    </svg>
);

const VisaIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-12 h-8">
        <title>Visa</title>
        <path d="M8.995 14.823l-2.486-8.73h2.808l1.603 6.042c.15.588.275 1.15.352 1.688h.055c.077-.538.202-1.1.352-1.688l1.603-6.042h2.808l-3.956 12.413h-2.67zm8.396.143l1.11-4.225c.138-.523.248-.957.303-1.474h.055c-.077.67-.099 1.127-.12 1.639l-.462 4.06h-2.431l3.63-12.412h2.717l-2.222 8.575 2.19 3.837h-2.784zm-6.248-2.583c0-.44.396-.748.99-.748.44 0 .748.11.99.248l.22.88c0 .248.165.374.418.374.275 0 .418-.165.44-.462l-.248-1.232c-.11-.577-.523-1.045-1.287-1.045-.99 0-1.639.605-1.639 1.441 0 1.012.77 1.342 1.309 1.595.55.248.748.44.748.682 0 .418-.462.66-1.078.66-.577 0-.99-.137-1.166-.302l-.247-.902c-.055-.22-.248-.352-.462-.352-.22 0-.396.137-.396.396l.248 1.342c.137.66.66 1.155 1.54 1.155 1.045 0 1.749-.577 1.749-1.562 0-.825-.484-1.265-1.265-1.595-.523-.22-.77-.418-.77-.66zm10.745-.374l.935-3.85h2.64l-1.045 3.85h-2.53zm-15.01-.193l-.484-1.859-1.232.33c-.22.055-.418 0-.523-.22l-.77-3.234 3.19-.825c.193-.055.374 0 .44.193l.748 3.102 1.32-.33c.193-.055.352.055.418.247l.55 2.134-2.838.748c-.22.055-.418 0-.523-.22z" fill="#fff"/>
    </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);


export default PaymentScreen;