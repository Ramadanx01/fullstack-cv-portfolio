import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome, HiUser, HiBriefcase, HiAcademicCap, HiEnvelope, HiCommandLine } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi'; 
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t, isRtl } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  // تتبع اسكرول الشاشة لتنوير الأيقونات تلقائياً في السايد بار
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'certificates', 'contact'];
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-30% 0px -60% 0px',
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { id: 'hero', icon: <HiHome />, label: t('nav.home') },
    { id: 'about', icon: <HiUser />, label: t('nav.about') },
    { id: 'skills', icon: <HiCommandLine />, label: t('nav.skills') },
    { id: 'projects', icon: <HiBriefcase />, label: t('nav.projects') },
    { id: 'certificates', icon: <HiAcademicCap />, label: isRtl ? "الشهادات" : "Certificates" }, // ربط المسار بملف الشهادات الفعلي المحدث
    { id: 'contact', icon: <HiEnvelope />, label: t('nav.contact') },
  ];

  return (
    <>
      {/* ==================== 1. السايد بار العائم للشاشات الكبيرة ينور تلقائياً ==================== */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 p-3 bg-[#0a0a0f]/40 border border-white/5 backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(0,0,0,0.6)] pointer-events-auto ${
          isRtl ? 'right-6' : 'left-6'
        }`}
      >
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* التوهج النيون التلقائي في المكان اللي العميل واقف فيه حالياً */}
              <motion.div 
                whileHover={{ scale: 1.15, z: 20 }}
                className={`text-lg w-full h-full flex items-center justify-center rounded-full transition-all duration-300 border ${
                  isActive 
                    ? 'text-cyan-neon bg-cyan-neon/10 border-cyan-neon/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                    : 'text-neutral-400 bg-white/5 border-white/5 hover:text-cyan-neon hover:border-cyan-neon/30 hover:bg-white/10'
                }`}
              >
                {item.icon}
              </motion.div>

              {/* الـ Tooltip الأنيق */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-[#0a0a0f]/95 border border-white/10 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl ${
                  isRtl ? 'right-16 translate-x-4' : 'left-16 -translate-x-4'
                }`}
              >
                {item.label}
              </div>
            </a>
          );
        })}
      </div>

      {/* ==================== 2. السايد بار للشاشات الصغيرة (Mobile Drawer) ==================== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* الخلفية المظلمة الشفافة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
            />

            {/* لوحة القائمة الجانبية للموبايل */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-[75%] max-w-[300px] bg-[#0a0a0f]/95 border-white/5 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between md:hidden pointer-events-auto ${
                isRtl ? 'border-r' : 'border-l'
              }`}
            >
              <div>
                {/* هيدر الموبايل */}
                <div className="flex items-center justify-between mb-8" dir={isRtl ? 'rtl' : 'ltr'}>
                  <span className="text-xs font-black tracking-widest text-cyan-neon uppercase bg-cyan-neon/10 px-3 py-1 rounded-md border border-cyan-neon/20">NAVIGATION</span>
                  <button 
                    onClick={onClose} 
                    className="text-white text-xl p-2 bg-white/5 border border-white/10 rounded-lg hover:text-cyan-neon cursor-pointer transition-colors"
                  >
                    <HiX />
                  </button>
                </div>

                {/* روابط التنقل داخل الموبايل منورة تلقائياً */}
                <div className="flex flex-col gap-3" dir={isRtl ? 'rtl' : 'ltr'}>
                  {menuItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={onClose}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 border group cursor-pointer ${
                          isActive
                            ? 'bg-cyan-neon/10 border-cyan-neon/30 text-cyan-neon shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]'
                            : 'bg-white/[0.02] border-white/5 text-neutral-300 hover:bg-white/5 hover:border-cyan-neon/20 hover:text-cyan-neon'
                        }`}
                      >
                        <div className={`text-xl p-2 rounded-lg transition-all ${
                          isActive ? 'bg-cyan-neon/20 text-cyan-neon' : 'bg-white/5 text-neutral-400 group-hover:text-cyan-neon'
                        }`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* فوتر السايد بار موبايل */}
              <div className="text-center text-[10px] text-neutral-600 font-sans border-t border-white/5 pt-4 tracking-wider">
                &copy; {new Date().getFullYear()} M. RAMADAN
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}