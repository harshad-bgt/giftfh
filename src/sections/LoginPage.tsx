import { useState } from 'react';
import BlueprintBackground from '../components/BlueprintBackground';

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const correctPassword = '102004';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPassword('');
      // Shake effect can be added via css or just visual feedback
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeypad = (num: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPassword('');
  };

  return (
    <div className="w-full h-[100svh] bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <BlueprintBackground />
      </div>

      <div className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-12">
          <p className="font-mono text-[#C8A96B] tracking-[0.4em] uppercase text-xs mb-4">Security Protocol</p>
          <h1 className="font-serif text-3xl text-[#F5F5F5] font-light tracking-widest">ENTER ACCESS KEY</h1>
        </div>

        {/* Custom Keypad Input Display */}
        <div className="flex gap-3 mb-12 justify-center w-full">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div 
              key={index} 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < password.length 
                  ? 'bg-[#C8A96B] shadow-[0_0_10px_rgba(200,169,107,0.5)]' 
                  : error 
                    ? 'bg-red-900/50' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
        
        {error && (
          <p className="absolute top-[42%] text-red-400 font-mono text-xs tracking-widest uppercase animate-pulse">
            Access Denied
          </p>
        )}

        {/* Mobile Keypad */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px] mx-auto mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeypad(num.toString())}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono text-2xl text-[#F5F5F5] border border-white/10 hover:bg-white/10 hover:border-[#C8A96B] transition-all duration-200 mx-auto"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono text-xs tracking-widest text-white/50 hover:text-white transition-all mx-auto uppercase"
          >
            CLR
          </button>
          <button
            onClick={() => handleKeypad('0')}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono text-2xl text-[#F5F5F5] border border-white/10 hover:bg-white/10 hover:border-[#C8A96B] transition-all duration-200 mx-auto"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono text-xs tracking-widest text-white/50 hover:text-white transition-all mx-auto uppercase"
          >
            DEL
          </button>
        </div>

        {/* Submit (Auto-submits when 6 digits are entered, but here is a manual fallback) */}
        <button 
          onClick={handleSubmit}
          disabled={password.length !== 6}
          className={`mt-12 w-full py-4 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-500 border ${
            password.length === 6 
              ? 'border-[#C8A96B] text-[#0A0A0A] bg-[#C8A96B] shadow-[0_0_20px_rgba(200,169,107,0.3)]' 
              : 'border-white/10 text-white/20 bg-transparent pointer-events-none'
          }`}
        >
          Authenticate
        </button>

      </div>
    </div>
  );
}
