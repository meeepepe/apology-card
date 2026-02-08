import React, { useState, useEffect, useRef } from 'react';
import { Heart, ArrowRight, ArrowLeft, RefreshCw, Stamp, Send, Mail, Sparkles, Volume2, VolumeX } from 'lucide-react';

const ApologyCard = () => {
  const [viewState, setViewState] = useState('envelope'); // 'envelope', 'opening', 'language', 'card'
  const [language, setLanguage] = useState(null); 
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // --- ส่วนจัดการเพลง (Audio Logic) ---
  // เริ่มต้นเป็น true (ปิดเสียง) ไว้ก่อน แต่พอเปิดซองเราจะสั่งให้เป็น false
  const [isMuted, setIsMuted] = useState(true); 
  const audioRef = useRef(null);

  const toggleAudio = () => {
      if (audioRef.current) {
          if (audioRef.current.paused) {
              audioRef.current.play();
              setIsMuted(false);
          } else {
              audioRef.current.pause();
              setIsMuted(true);
          }
      }
  };
  // ----------------------------------

  // Floating Background Hearts Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100, // Random horizontal position
          animationDuration: 10 + Math.random() * 10, // Random speed
          size: 10 + Math.random() * 20, // Random size
          opacity: 0.1 + Math.random() * 0.3
        };
        // Keep only last 15 hearts to prevent memory issues
        const cleanHearts = [...prev, newHeart].filter(h => Date.now() - h.id < 20000);
        return cleanHearts;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Content Data
  const content = {
    th: [
      {
        text: "ถ้าแนทได้อ่านข้อความนี้ แปลว่า แนทได้รับของขวัญแทนคำขอโทษจากปอนแล้ว ซึ่งปอนอยากจะบอกแนทว่าปอนขอโทษที่ปอนอาจทำให้แนทรู้สึกไม่ปลอดภัยในความสัมพันธ์ ปอนผิดเองที่ทำในสิ่งที่แนทจะไม่พอใจ ปอนขอโทษที่ทำตัวไม่ดีแต่ปอนจะทำตัวให้ดีขึ้นนะ อาจจะยังทำให้แนทเชื่อไม่ได้แต่ปอนจะทำให้แนทเห็นว่าแนทสามารถกลับมาเชื่อใจปอนได้อีกครั้งแน่นอน"
      },
      {
        text: "แล้วก็..."
      },
      {
        text: "ขอโทษที่ปอนอาจจะยังให้หรือทำอะไรให้แนทได้ไม่มากเท่าที่แนทเคยได้รับนะ ขอโทษที่เป็นคนอารมณ์ร้อนชอบพูดอะไรไม่คิดนะ ขอโทษที่ปอนอาจจะไม่ได้มีมาก ไม่ได้เป็นคนเตรียมพร้อมสำหรับทุกอย่าง ไม่ใช่คนที่แนทจะอยากพึ่งพา หรือแนทอาจจะไม่เห็นว่าปอนมีดีหรือเก่งเลยก็ได้ แต่ปอนจะพัฒนาเรื่อยๆ นะ ขอโทษที่การอยู่ร่วมกับปอนมันอาจจะไม่ได้ Perfect หรืออาจเต็มไปด้วย Problem ปอนอาจจะไม่ได้ใหม่สำหรับคำว่ารักแต่ปอนก็ยังใหม่กับคำว่า \"แนท\" ถึงจะเกือบปีแต่ปอนก็อาจจะยังไม่ได้รู้จักแนทมากพอ ปอนขอโทษนะที่ปอนยังไม่ได้รู้จักแนทมากพอในบางเรื่อง แต่ถ้าไม่เป็นการรบกวน ปอนขอเรียนรู้แนทเพิ่มได้ไหมอีกซักครั้ง"
      },
      {
        text: "หน้าสุดท้ายแล้วก่อนจะจบ Post card นี้ ปอนอยากจะบอกว่าปอนรักแนทนะ ถึงแนทอาจจะไม่เชื่อแต่ปอนไม่เคยโกหก แนทยังเป็นคนที่สวยที่สุดสำหรับปอน แนทยังเป็นผู้หญิงที่ปอนจะยื่นมือ เสนอหน้า เพื่อช่วยแนท หรือไปกับแนททุกที่แน่นอน เพราะสำหรับปอน แนทเป็นคนที่สำคัญมาก ทั้งกับปอนและครอบครัวปอน เพราะงั้นปอนเลยอยากพูดอีกรอบว่าปอนรักแนทนะ"
      },
      {
        title: "The End",
        text: "จบ",
        isEnd: true
      }
    ],
    en: [
      {
        text: "If you are reading this, Nat, it means you've received my apology gift. I want to tell you that I'm sorry for making you feel unsafe in our relationship. It was my fault for doing things that upset you. I apologize for my bad behavior, but I promise to do better. I may not be able to make you believe me right away, but I will prove to you that you can trust me again, for sure."
      },
      {
        text: "And also..."
      },
      {
        text: "I'm sorry that I might not be able to give or do as much for you as you're used to. I'm sorry for my hot temper and for speaking without thinking. I apologize for not being fully prepared for everything, or for not yet being someone you feel you can rely on. You might not see my good side right now, but I will keep improving. Being with me might not be perfect, or it might be full of problems. I'm not new to love, but I am still new to 'Nat'. Even after almost a year, I might not know you enough. I'm sorry for that. But if it's not too much trouble, may I have the chance to learn about you again?"
      },
      {
        text: "This is the last page. Before ending this postcard, I want to say that I love you, Nat. You might not believe it, but I never lie. You are still the most beautiful person to me. You are the woman I will always reach out to help, or go anywhere with, absolutely. Because for me, you are very important—both to me and my family. So, I want to say it again: I love you, Nat."
      },
      {
        title: "The End",
        text: "End",
        isEnd: true
      }
    ]
  };

  const handleNext = () => {
    if (page < content[language].length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setPage(page + 1);
        setAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setAnimating(true);
      setTimeout(() => {
        setPage(page - 1);
        setAnimating(false);
      }, 300);
    }
  };

  const openEnvelope = () => {
    setViewState('opening');
    
    // --- สั่งเล่นเพลงตรงนี้ทันที (Auto Play on Interaction) ---
    if (audioRef.current) {
        audioRef.current.volume = 0.5; // ความดัง 50%
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // เล่นสำเร็จ -> เปลี่ยนสถานะปุ่มเป็น "เปิดเสียง"
                setIsMuted(false);
            })
            .catch(error => {
                console.log("Audio play failed:", error);
                // ถ้าเล่นไม่ได้ (เช่น Browser บล็อกจริงๆ) ก็ให้ปุ่มเป็น "ปิดเสียง" ไว้
                setIsMuted(true);
            });
        }
    }
    // -----------------------------------------------------

    setTimeout(() => {
        setViewState('language');
    }, 1500);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setPage(0);
    setViewState('card');
  };

  const handleSendLove = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Preload fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500&family=Caveat:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-200 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden relative font-['Prompt'] selection:bg-rose-200">
      
      {/* --- ตัวเล่นเพลง (Loop เพลงซ้ำเมื่อจบ) --- */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* --- ปุ่มเปิด/ปิดเสียง (มุมขวาบน) --- */}
      <button 
           onClick={toggleAudio}
           className="absolute top-4 right-4 z-50 p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/80 transition-all text-rose-400"
      >
           {/* แสดงไอคอนตามสถานะจริงของเพลง */}
           {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
      </button>

      <style>{`
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
        }
      `}</style>

      {/* Background Floating Hearts */}
      {hearts.map(heart => (
        <div
            key={heart.id}
            className="absolute text-rose-300 pointer-events-none"
            style={{
                left: `${heart.left}%`,
                bottom: '-50px',
                fontSize: `${heart.size}px`,
                opacity: heart.opacity,
                animation: `floatUp ${heart.animationDuration}s linear forwards`
            }}
        >
            <Heart fill="currentColor" />
        </div>
      ))}

      {/* VIEW: ENVELOPE */}
      {viewState === 'envelope' || viewState === 'opening' ? (
        <div 
            onClick={viewState === 'envelope' ? openEnvelope : undefined}
            className={`cursor-pointer transform transition-all duration-1000 ${viewState === 'opening' ? 'scale-150 opacity-0 translate-y-20' : 'hover:scale-105 active:scale-95'}`}
        >
            <div className="relative w-[85vw] max-w-sm aspect-[3/2] bg-white shadow-2xl rounded-lg flex items-center justify-center border-2 border-rose-100">
                {/* Envelope Flap */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-50 origin-top transform transition-transform duration-500 z-10" 
                     style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
                </div>
                
                {/* Envelope Body lines */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-white z-0 rounded-lg overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[144px] border-b-[96px] border-l-transparent border-b-rose-50/50 sm:border-l-[180px] sm:border-b-[120px]"></div>
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[144px] border-b-[96px] border-r-transparent border-b-rose-50/50 sm:border-r-[180px] sm:border-b-[120px]"></div>
                </div>

                {/* Stamp */}
                <div className="absolute top-4 right-4 transform rotate-12 opacity-80">
                     <div className="w-10 h-12 sm:w-12 sm:h-14 border-2 border-dashed border-rose-300 flex items-center justify-center">
                        <Heart className="text-rose-400 w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                     </div>
                </div>

                {/* Text */}
                <div className="z-10 text-center mt-8">
                    <p className="font-['Caveat'] text-3xl sm:text-4xl text-rose-600 font-bold">To: Nat</p>
                    <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest animate-pulse font-light">Tap to open</p>
                </div>
            </div>
        </div>
      ) : null}

      {/* VIEW: LANGUAGE SELECTION */}
      {viewState === 'language' && (
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6 sm:space-y-8 animate-fade-in-up border border-white/50 mx-4">
          <div className="space-y-3">
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400 mx-auto animate-bounce" />
            <h1 className="text-xl sm:text-2xl text-gray-700 font-light">You have a message from Pond</h1>
          </div>
          
          <div className="flex flex-col gap-3 sm:gap-4">
            <button 
              onClick={() => selectLanguage('en')}
              className="w-full py-3 sm:py-4 px-6 bg-white border border-rose-100 rounded-xl text-rose-600 hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95 touch-manipulation font-light"
            >
              <span className="text-sm sm:text-base">Read in English</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => selectLanguage('th')}
              className="w-full py-3 sm:py-4 px-6 bg-rose-400 text-white rounded-xl hover:bg-rose-500 shadow-lg shadow-rose-200/50 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95 touch-manipulation font-light"
            >
              <span className="text-sm sm:text-base">อ่านภาษาไทย</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW: MAIN CARD */}
      {viewState === 'card' && language && (
        <div className="w-full max-w-2xl relative animate-fade-in mb-safe-area">
          {/* Confetti Effect */}
          {showConfetti && (
             <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <Heart 
                        key={i} 
                        className="absolute text-rose-500" 
                        fill="currentColor"
                        style={{
                            left: '50%',
                            top: '50%',
                            width: `${Math.random() * 30 + 10}px`,
                            height: `${Math.random() * 30 + 10}px`,
                            animation: `pop 1s ease-out forwards`,
                            transform: `translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px)`
                        }} 
                    />
                ))}
             </div>
          )}

          {/* Navigation - Top Left Back Button */}
          <button 
            onClick={() => setViewState('language')}
            className="absolute -top-10 sm:-top-12 left-0 text-gray-500 hover:text-rose-500 flex items-center gap-2 text-sm transition-colors py-2 active:opacity-70 font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'th' ? 'เลือกภาษาใหม่' : 'Back'}
          </button>

          {/* Card Container */}
          <div className={`bg-white relative rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform flex flex-col ${animating ? 'opacity-50 scale-95 blur-[1px]' : 'opacity-100 scale-100 blur-0'}`}>
            
            {/* Progress Bar */}
            <div className="h-1 bg-gray-50 w-full">
                <div 
                    className="h-full bg-rose-300 transition-all duration-500 rounded-r-full opacity-70"
                    style={{ width: `${((page + 1) / content[language].length) * 100}%` }}
                />
            </div>

            {/* Postcard Header Texture */}
            <div className="h-1.5 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 opacity-60" />
            
            {/* Main Content Body */}
            <div className="p-6 sm:p-10 md:p-12 min-h-[500px] sm:min-h-[550px] flex flex-col justify-between">
              
              {/* Header: From/To & Stamp */}
              <div className="flex justify-between items-start mb-4 sm:mb-6 border-b border-gray-50 pb-4">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[10px] sm:text-xs font-medium tracking-widest text-gray-400 uppercase flex items-center gap-2">
                    <Send className="w-3 h-3" />
                    {language === 'th' ? 'จาก: ปอน' : 'From: Pond'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium tracking-widest text-gray-400 uppercase flex items-center gap-2">
                    <Heart className="w-3 h-3 text-rose-300" />
                    {language === 'th' ? 'ถึง: แนท' : 'To: Nat'}
                  </span>
                </div>
                <div className="w-16 h-20 sm:w-20 sm:h-24 border border-dashed border-gray-200 flex items-center justify-center relative rotate-3 bg-rose-50/30 shadow-sm">
                   <div className="absolute inset-0 m-1 border border-gray-100" />
                   <div className="text-center">
                       <span className="text-[8px] sm:text-[10px] text-rose-300 block font-light">POSTAGE</span>
                       <Heart className="text-rose-300 w-6 h-6 sm:w-8 sm:h-8 mx-auto my-1" fill="currentColor" />
                       <span className="text-[8px] sm:text-[10px] text-rose-300 block font-light">LOVE</span>
                   </div>
                   <div className="absolute -bottom-2 -right-2 transform -rotate-12 opacity-50">
                     <Stamp className="text-gray-300 w-8 h-8 sm:w-10 sm:h-10" />
                   </div>
                </div>
              </div>

              {/* Main Text Area - Adjusted to hide scrollbars */}
              <div className="flex-grow flex items-center justify-center py-2 sm:py-4 w-full">
                {content[language][page].isEnd ? (
                  <div className="text-center space-y-6 w-full animate-fade-in">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                        <div className="absolute inset-0 bg-rose-50 rounded-full animate-ping opacity-20"></div>
                        <div className="relative bg-rose-50 rounded-full w-full h-full flex items-center justify-center text-rose-400 shadow-sm">
                            <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-400" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-light tracking-wide">
                      {content[language][page].text}
                    </h2>

                    <button 
                        onClick={handleSendLove}
                        className="mt-6 px-8 py-3 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-all shadow-lg shadow-rose-100 flex items-center gap-2 mx-auto active:scale-95 touch-manipulation font-light tracking-wide"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">{language === 'th' ? 'ส่งกำลังใจให้ปอน' : 'Send Love to Pond'}</span>
                    </button>

                    <button 
                      onClick={() => setPage(0)}
                      className="mt-8 text-gray-400 hover:text-rose-400 flex items-center justify-center gap-2 text-xs mx-auto transition-colors p-2 font-light"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {language === 'th' ? 'อ่านอีกรอบ' : 'Read again'}
                    </button>
                  </div>
                ) : (
                  // Added 'no-scrollbar' and 'overflow-x-hidden'
                  <div className="relative w-full overflow-y-auto overflow-x-hidden max-h-[50vh] sm:max-h-none no-scrollbar px-1">
                      {/* Fixed Sparkles positioning to be inside padding to prevent overflow */}
                      <Sparkles className="absolute top-0 left-0 w-4 h-4 text-yellow-200 opacity-60" />
                      
                      <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-8 sm:leading-loose whitespace-pre-line text-center font-light px-4 break-words tracking-wide`}>
                        "{content[language][page].text}"
                      </p>
                      
                      <Sparkles className="absolute bottom-0 right-0 w-4 h-4 text-rose-200 opacity-60" />
                  </div>
                )}
              </div>

              {/* Pagination Footer */}
              <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-gray-300 font-mono">
                    {page + 1} / {content[language].length}
                </span>

                <div className="flex gap-3 sm:gap-4">
                  <button 
                    onClick={handlePrev}
                    disabled={page === 0}
                    className={`p-3 sm:p-4 rounded-full transition-all border ${page === 0 ? 'border-gray-100 text-gray-200 cursor-not-allowed' : 'border-rose-100 text-rose-400 hover:bg-rose-50 hover:border-rose-200 active:bg-rose-100'}`}
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={content[language][page].isEnd}
                    className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all flex items-center gap-2 ${content[language][page].isEnd ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white shadow-lg hover:bg-gray-900 hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95'}`}
                  >
                     <span className="text-sm sm:text-base font-light">{language === 'th' ? 'ต่อไป' : 'Next'}</span>
                     <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>

            </div>
          </div>
          
          <p className="text-center text-rose-300/50 text-[10px] mt-8 pb-4 font-light tracking-[0.2em] uppercase">
            Made with heart for Nat
          </p>
        </div>
      )}
    </div>
  );
};

export default ApologyCard;
