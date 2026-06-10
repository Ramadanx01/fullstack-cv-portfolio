import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; 
import { useLanguage } from '../context/LanguageContext';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi2';
import profileImg from '../assets/images/profile1.jpg';

export default function Hero() {
  const { t, isRtl } = useLanguage();

  // إعدادات الأنيميشن المتتابع للنصوص لتدفق سينمائي ناعم
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isRtl ? 40 : -40, y: 15 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 18 }
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen w-full flex items-center justify-center relative pt-28 md:pt-0 overflow-hidden bg-transparent pointer-events-none"
    >
      
      {/* الحاوية الرئيسية للمحتوى */}
      <div 
        className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 pointer-events-auto"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        
        {/* ================= الجانب النصي التعريفي الفخم ================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`flex flex-col justify-center space-y-6 ${isRtl ? 'text-right items-start' : 'text-left items-start'}`}
        >
          {/* شارة الترحيب المستقبلية */}
          <motion.div variants={itemVariants}>
            <span className="text-xs md:text-sm font-bold tracking-widest text-cyan-neon bg-cyan-neon/10 border border-cyan-neon/30 rounded-full px-4 py-1.5 font-sans uppercase backdrop-blur-md">
              {t('hero.welcome') || "WELCOME TO MY SPACE"}
            </span>
          </motion.div>

          {/* الاسم الرئيسي */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none font-sans"
          >
            {t('hero.name') || "Mohamad Ramadan"}
          </motion.h1>

          {/* اللقب التقني المدمج */}
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-neon via-indigo-400 to-purple-neon bg-clip-text text-transparent"
          >
            {t('hero.title') || "Full Stack & 3D Developer"}
          </motion.h2>

          {/* الوصف المهني المتزن والذكي */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed"
          >
            {t('hero.subtitle') || "Crafting robust full-stack architectures and high-performance immersive 3D web applications where clean code meets interactive motion."}
          </motion.p>

          {/* أزرار اتخاذ الإجراء (CTA) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-2 w-full justify-start"
          >
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(0, 245, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              href="#projects" 
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-neon to-blue-600 text-black font-extrabold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(0,245,255,0.2)] cursor-pointer"
            >
              <span>{t('hero.cta_projects') || "View Work"}</span>
              {isRtl ? <HiArrowLeft className="text-base" /> : <HiArrowRight className="text-base" />}
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-sm transition-all hover:border-purple-neon hover:text-purple-neon cursor-pointer"
            >
              {t('hero.cta_contact') || "Contact Me"}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ================= جانب الصورة الشخصية السينمائية المفرغة ================= */}
        <div className="flex items-center justify-center w-full min-h-[320px] sm:min-h-[400px] md:min-h-[500px]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -12, 0]
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center"
          >
            {/* 1. هالة توهج نيون خلفية مدمجة لإعطاء عمق بصري ملون */}
            <div className="absolute w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-cyan-neon/20 via-indigo-500/10 to-purple-neon/20 blur-2xl -z-10 animate-pulse" />
            
            {/* 2. قرص خلفي زجاجي بلمسة Glassmorphism */}
            <div className="absolute w-3/4 h-3/4 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)] -z-10" />

            {/* 3. حلقات دائرية سايبيرية دوارة خفيفة تحيط بالصورة */}
            <div className="absolute w-full h-full border border-dashed border-cyan-neon/20 rounded-full animate-[spin_80s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[85%] h-[85%] border border-double border-purple-neon/15 rounded-full animate-[spin_40s_linear_reverse_infinite] pointer-events-none" />

            {/* 4. عرض الصورة الشخصية */}
            <img 
                 src={profileImg}  /* 🎯 هنا التعديل السحري */
                 alt="Mohamad Ramadan" 
                 className="w-[85%] h-[85%] object-cover rounded-full border border-white/10 drop-shadow-[0_15px_30px_rgba(0,245,255,0.3)] filter contrast-105 saturate-110 relative z-10"
                 onError={(e) => {
                   e.currentTarget.src = "https://via.placeholder.com/400";
                 }}
               />
            
            {/* 5. ظل نيون سفلي ناعم يعكس الإضاءة المستندة للقاعدة */}
            <div className="absolute bottom-4 w-1/2 h-4 bg-cyan-neon/30 blur-xl rounded-full z-20" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
