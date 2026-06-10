import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TbHexagonLetterR } from 'react-icons/tb';
import { MdLanguage } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { toggleLanguage, language, isRtl, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // 1. تأثير حركة تغيير خلفية الناف بار عند السكرول لأسفل
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. تتبع السكشن الحالي لتنوير الروابط تلقائياً في الشاشات الكبيرة
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
      rootMargin: '-30% 0px -60% 0px', // دقة رصد السكشن الفعلي في منتصف الشاشة
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'certificates', label: isRtl ? "الشهادات" : "Certificates" },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-40 py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
        isScrolled 
          ? 'bg-[#0a0a0f]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* اللوجو المستقبلي النيون */}
        <a href="#hero" className="flex items-center gap-2 text-xl font-bold tracking-widest text-white group cursor-pointer">
          <div className="relative">
            <TbHexagonLetterR className="text-cyan-neon text-3xl transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute inset-0 bg-cyan-neon/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-sans font-extrabold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">RAMADAN</span>
        </a>

        {/* روابط التنقل للشاشات الكبيرة لتنشيط الرتم الحي للموقع */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-1 transition-colors duration-300 hover:text-cyan-neon cursor-pointer ${
                activeSection === link.id ? 'text-cyan-neon font-bold' : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-neon shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* أزرار التحكم اليمنى */}
        <div className="flex items-center gap-3">
          {/* زر تغيير اللغة زجاجي مع توهج نيون عند الهوفر */}
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-1.5 text-white text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-cyan-neon rounded-full px-4 py-1.5 transition-all duration-300 shadow-inner hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] cursor-pointer"
          >
            <MdLanguage className="text-base text-cyan-neon" />
            <span className="font-sans">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* زرار الهمبرجر يفتح السايد بار الجانبي */}
          <button
            onClick={onMenuClick}
            className="text-white text-2xl p-2 bg-white/5 border border-white/10 rounded-xl hover:text-cyan-neon hover:border-cyan-neon transition-all cursor-pointer"
          >
            <HiMenuAlt3 />
          </button>
        </div>

      </div>
    </motion.nav>
  );
}