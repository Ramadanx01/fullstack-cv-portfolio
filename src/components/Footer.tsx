import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const { isRtl } = useLanguage();
  const currentYear = new Date().getFullYear(); // بيقرا 2026 أوتوماتيك

  // الروابط السريعة للسكشنز الأساسية في الموقع
  const quickLinks = [
    { id: "hero", name: isRtl ? "الرئيسية" : "Home" },
    { id: "about", name: isRtl ? "عني" : "About" },
    { id: "skills", name: isRtl ? "المهارات" : "Skills" },
    { id: "projects", name: isRtl ? "المشاريع" : "Projects" },
    { id: "contact", name: isRtl ? "تواصل معي" : "Contact" }
  ];

  // روابط السوشيال ميديا المباشرة بتاعتك
  const socialLinks = [
    { id: "github", icon: FiGithub, url: "https://github.com/Ramadanx01", label: "GitHub" },
    { id: "linkedin", icon: FiLinkedin, url: "https://www.linkedin.com/in/mohamad-ramadan-a669312a5/", label: "LinkedIn" },
    { id: "email", icon: FiMail, url: "mailto:mrsrm555@gmail.com", label: "Email" }
  ];

  // دالة لتيسير السكرول السلس للسكشن عند الضغط
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-white/5 z-10"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center space-y-8 text-center">
        
        {/* 1. الاسم والوصف الصغير */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h3 className="text-xl font-black text-white tracking-wide">
            {isRtl ? "محمد رمضان" : "Mohamed Ramadan"}
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xs mx-auto">
            {isRtl 
              ? "مطور ويب متكامل - بناء تجارب ويب حديثة واحترافية." 
              : "Full Stack Developer - Building modern web experiences."}
          </p>
        </motion.div>

        {/* 2. الروابط السريعة التنقل (Quick Links) */}
        <motion.nav 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-neutral-400"
        >
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-cyan-neon transition-colors duration-200 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </motion.nav>

        {/* 3. روابط السوشيال ميديا مع تأثيرات الـ Glow والـ Scale */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-5 text-neutral-400"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="hover:text-cyan-neon p-2 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-neon/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-colors duration-200"
                aria-label={social.label}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* 4. خط الحقوق البسيط المكتوم السفلي */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[10px] sm:text-xs text-neutral-500 font-light select-none pt-4 border-t border-white/[0.02] w-full max-w-xs"
        >
          &copy; {currentYear} {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </motion.div>

      </div>
    </footer>
  );
}