import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiBootstrap, 
  SiSass, 
  SiHtml5, 
  SiPhp, 
  SiLaravel, 
  SiMysql, 
  SiGit, 
  SiGithub, 
  SiFigma,
  SiNextdotjs,
  SiVite
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';
import { DiCss3 } from 'react-icons/di';

export default function Skills() {
  const { isRtl } = useLanguage();
  
  // حالة الـ Tab النشطة حالياً (All هو الافتراضي)
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');
  
  // تحديد الكارت الحالي عن طريق الاسم (string) لحل مشكلة تهنيج التبويبات والـ Hover
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  // مصفوفة التقنيات الكاملة المحدثة والمفلترة تماماً بناءً على مشروعك والـ Stack الحقيقي بتاعك
  const skillsData = [
    // === Frontend ===
    { name: "React", icon: SiReact, color: "#61DAFB", glow: "rgba(97, 218, 251, 0.25)", category: "frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.2)", category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", glow: "rgba(49, 120, 198, 0.25)", category: "frontend" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.25)", category: "frontend" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", glow: "rgba(6, 182, 212, 0.25)", category: "frontend" },
    { name: "Vite", icon: SiVite, color: "#646CFF", glow: "rgba(100, 108, 255, 0.25)", category: "frontend" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", glow: "rgba(227, 79, 38, 0.25)", category: "frontend" },
    { name: "CSS3", icon: DiCss3, color: "#1572B6", glow: "rgba(21, 114, 182, 0.25)", category: "frontend" },
    { name: "Sass", icon: SiSass, color: "#CC6699", glow: "rgba(204, 102, 153, 0.25)", category: "frontend" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", glow: "rgba(121, 82, 179, 0.25)", category: "frontend" },
    
    // === Backend ===
    { name: "PHP", icon: SiPhp, color: "#777BB4", glow: "rgba(119, 123, 180, 0.25)", category: "backend" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20", glow: "rgba(255, 45, 32, 0.25)", category: "backend" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", glow: "rgba(68, 121, 161, 0.25)", category: "backend" },
    { name: "REST APIs", icon: TbApi, color: "#00F5FF", glow: "rgba(0, 245, 255, 0.25)", category: "backend" },
    
    // === Tools ===
    { name: "Git", icon: SiGit, color: "#F05032", glow: "rgba(240, 80, 50, 0.25)", category: "tools" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.2)", category: "tools" },
    { name: "VS Code", icon: VscCode, color: "#007ACC", glow: "rgba(0, 122, 204, 0.25)", category: "tools" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E", glow: "rgba(242, 78, 30, 0.25)", category: "tools" }
  ];

  // فلترة الكروت بناءً على الـ Tab المختارة
  const filteredSkills = skillsData.filter(skill => activeTab === 'all' || skill.category === activeTab);

  // مصفوفة التبويبات (Tabs)
  const tabs = [
    { id: 'all', en: "All", ar: "الكل" },
    { id: 'frontend', en: "Frontend", ar: "الواجهات" },
    { id: 'backend', en: "Backend", ar: "الخلفيات" },
    { id: 'tools', en: "Tools", ar: "الأدوات" }
  ] as const;

  // أنيميشن حاوية الـ Grid لتفعيل الـ Stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 }
    }
  };

  // أنيميشن ظهور الكروت الفردية
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 110, damping: 15 } 
    }
  };

  return (
    <section 
      id="skills" 
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 lg:px-8 bg-transparent"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="w-full max-w-5xl space-y-12">
        
        {/* عنوان السكشن الاحترافي الفخم */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase">
            {isRtl ? "التقنيات التي أعمل بها" : "Technologies I Work With"}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            {isRtl 
              ? "مجموعة الأدوات واللغات والبيئات البرمجية التي أستخدمها لبناء الأنظمة المتكاملة واجهات وخلفيات." 
              : "The modern tech stack and tools I leverage to build production-grade web applications."}
          </p>
        </motion.div>

        {/* أزرار الـ Tabs العصرية بنظام شغال ومضمون 100% */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setHoveredSkillName(null); // ريست لأي هافر قديم منعاً لأي تهنيج
                }}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 select-none ${
                  isActive 
                    ? 'text-white' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {/* خلفية متحركة ذكية عند الانتقال بين الـ Tabs */}
                {isActive && (
                  <motion.div 
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {isRtl ? tab.ar : tab.en}
              </button>
            );
          })}
        </div>

        {/* الـ Grid الرئيسي الموحد المحرك بالـ Stagger والتأثيرات التفاعلية الزجاجية */}
        <motion.div 
          key={activeTab} // مفتاح تغيير الـ Tab ليعيد تشغيل الـ Stagger بسلاسة وثبات
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredSkills.map((skill) => {
            const IconComponent = skill.icon;
            
            // إصلاح منطق الـ Dimming Effect بالاعتماد على الاسم الفريد للتقنية
            const isAnyCardHovered = hoveredSkillName !== null;
            const isThisCardHovered = hoveredSkillName === skill.name;
            const cardOpacity = isAnyCardHovered ? (isThisCardHovered ? 1 : 0.35) : 1;

            return (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                onMouseEnter={() => setHoveredSkillName(skill.name)}
                onMouseLeave={() => setHoveredSkillName(null)}
                animate={{ opacity: cardOpacity }}
                transition={{ duration: 0.25 }}
                // Hover Lift عالي الأداء مع البوردر الملون والـ Glow الخاص بالبراند
                whileHover={{ 
                  y: -6, 
                  scale: 1.03,
                  boxShadow: `0 15px 35px -5px ${skill.glow}`,
                  borderColor: skill.color
                }}
                className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm select-none cursor-default transition-colors duration-300 group"
              >
                {/* تأثير الـ Radial Glow الخلفي الدائري لتعزيز رؤية اللوجو */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${skill.glow} 0%, transparent 70%)` }}
                />

                {/* الأيقونة الكبيرة بلون البراند وحركة الـ Dynamic Rotation الخفيفة الشيك */}
                <div 
                  className="text-4xl sm:text-5xl mb-4 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[12deg]"
                  style={{ color: skill.color }}
                >
                  <IconComponent />
                </div>

                {/* اسم التقنية الاحترافي */}
                <span className="text-sm sm:text-base font-semibold text-neutral-300 tracking-wide relative z-10 group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}