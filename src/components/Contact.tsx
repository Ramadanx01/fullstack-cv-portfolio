import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiMail, FiLinkedin, FiDownload, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const { isRtl } = useLanguage();

  // بيانات التواصل الشخصية المحددة بدقة
  const contactInfo = {
    email: "mrsrm555@gmail.com",
    whatsapp: "201080860210", // كود مصر + الرقم بدون الصفر الأول للربط المباشر
    linkedin: "https://www.linkedin.com/in/mohamad-ramadan-a669312a5/",
    cvUrl: "/Mohamed_Ramadan_CV.pdf" // مسار ملف الـ CV في فولدر public عندك
  };

  // أنيميشن حاوية العناصر (تأثير التتابع الاستثنائي Stagger)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // أنيميشن الكروت الفردية عند الدخول (Fade Up)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  const cards = [
    {
      id: "email",
      title: isRtl ? "البريد الإلكتروني" : "Email Me",
      value: contactInfo.email,
      subText: isRtl ? "ارسل رسالة مباشرة" : "Send a direct message",
      icon: FiMail,
      color: "#06B6D4", // Cyan
      bgGlow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      borderGlow: "group-hover:border-cyan-neon/40",
      iconColor: "text-cyan-neon",
      url: `mailto:${contactInfo.email}`
    },
    {
      id: "whatsapp",
      title: isRtl ? "واتساب سريع" : "WhatsApp",
      value: "01080860210",
      subText: isRtl ? "تحدث معي فوراً وبشكل حي" : "Chat with me instantly",
      icon: FaWhatsapp,
      color: "#25D366", // WhatsApp Green
      bgGlow: "group-hover:shadow-[0_0_30px_rgba(37,211,102,0.15)]",
      borderGlow: "group-hover:border-emerald-500/40",
      iconColor: "text-emerald-400",
      url: `https://wa.me/${contactInfo.whatsapp}`
    },
    {
      id: "linkedin",
      title: isRtl ? "لينكد إن" : "LinkedIn",
      value: isRtl ? "عرض الحساب الشخصي" : "View my profile",
      subText: isRtl ? "تواصل مهني وشبكة علاقات" : "Professional networking",
      icon: FiLinkedin,
      color: "#0077B5", // LinkedIn Blue
      bgGlow: "group-hover:shadow-[0_0_30px_rgba(0,119,181,0.15)]",
      borderGlow: "group-hover:border-blue-500/40",
      iconColor: "text-blue-400",
      url: contactInfo.linkedin
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-[85vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-transparent z-10"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* تأثير تدرج خلفي خفيف ناعم جداً لا يؤثر على الـ 3D */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/5 to-transparent pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto space-y-14 relative z-20 text-center">
        
        {/* العناوين والـ Intro الذكي القصير السريع */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-xs font-bold tracking-widest text-cyan-neon uppercase bg-cyan-neon/10 px-4 py-1.5 rounded-full border border-cyan-neon/20">
            {isRtl ? "ابدأ المحادثة" : "Get In Touch"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wide">
            {isRtl ? "خلينا نبني حاجة قوية مع بعض" : "Let’s build something amazing together"}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-md mx-auto">
            {isRtl 
              ? "متاح حالياً للمشاريع الحرة والفرص البرمجية الجديدة. تواصل معي مباشرة عبر أي منصة." 
              : "Currently available for freelance projects and technical opportunities. Reach out via any platform."}
          </p>
        </motion.div>

        {/* شبكة كروت التواصل الـ 3 الفخمة المستهدفة */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative p-6 flex flex-col items-center justify-center bg-neutral-900/30 border border-white/5 rounded-2xl transition-all duration-300 backdrop-blur-sm select-none ${card.bgGlow} ${card.borderGlow}`}
              >
                {/* الأيقونة بحجم كبير وتأثير أنيق */}
                <div className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4 group-hover:bg-white/[0.04] transition-colors ${card.iconColor}`}>
                  <Icon size={28} />
                </div>

                <h3 className="text-base font-bold text-white transition-colors duration-200">
                  {card.title}
                </h3>
                
                <p className="text-xs text-neutral-400 font-light mt-1 mb-3 line-clamp-1">
                  {card.subText}
                </p>

                <span className={`text-xs font-medium tracking-wide border-b border-transparent ${card.iconColor} border-dashed group-hover:border-current transition-all duration-200`}>
                  {card.value}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* زر تحميل الـ CV (المستوى الإحترافي للأعمال والشركات) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="pt-4"
        >
          <a
            href={contactInfo.cvUrl}
            download
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-black bg-cyan-neon hover:bg-cyan-neon/90 rounded-xl shadow-lg shadow-cyan-neon/10 hover:shadow-cyan-neon/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FiDownload size={16} className="stroke-[3]" />
            <span>{isRtl ? "تحميل السيرة الذاتية" : "Download Resume / CV"}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}