import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiExternalLink, FiInfo, FiCheckCircle, FiGithub, FiX } from 'react-icons/fi';

// استيراد أيقونات التقنيات الفعلية للمشاريع (HTML, Tailwind, JS, PHP, Laravel, MySQL)
import { 
  SiHtml5, 
  SiTailwindcss, 
  SiJavascript, 
  SiPhp, 
  SiLaravel, 
  SiMysql,
  SiVite,
  SiFramer,
  SiSocketdotio
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

// استيراد الصور رسميًا من المسارات الصحيحة عندك
import waselImg from '../assets/images/projects/wasel.png';
import examImg from '../assets/images/projects/exam.png';
import mtecImg from '../assets/images/projects/mtec-img.png';
import motiGraphImg from '../assets/images/projects/moti-graph.png';

// خريطة الأيقونات والألوان للتقنيات الحقيقية للمشاريع
const techMap: Record<string, { icon: any; color: string }> = {
  "HTML5": { icon: SiHtml5, color: "#E34F26" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "Laravel": { icon: SiLaravel, color: "#FF2D20" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "RESTful APIs": { icon: TbApi, color: "#00F5FF" },
  "Vite": { icon: SiVite, color: "#646CFF" },
  "Framer Motion": { icon: SiFramer, color: "#E11D48" },
  "WebSockets / Socket.io": { icon: SiSocketdotio, color: "#010101" }
};

interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  role: string;
  highlights: { en: string; ar: string }[];
  tech: string[];
  image: string;
  hasLive: boolean;
  liveUrl?: string;
  githubUrl?: string;
  codeDetails: {
    ar: string;
    en: string;
  };
}

export default function Projects() {
  const { isRtl } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // لمنع سكرول الصفحة الخلفية عند فتح المودال
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projectsData: Project[] = [
    {
      id: "wasel",
      title: "Wasel",
      subtitle: isRtl ? "منصة متكاملة لإدارة وطلب الطعام" : "Full Stack Food Ordering Platform",
      desc: isRtl 
        ? "منصة متكاملة لإدارة الطلبات والمطاعم مستوحاة من تطبيقات التوصيل الحديثة، تم تصميمها لتقديم تجربة مستخدم سلسة ونظام خلفي قوي يتحمل ضغط العمليات الكثيفة."
        : "A comprehensive order and restaurant management platform inspired by modern delivery apps, built to offer a seamless user experience and a robust, scalable backend.",
      role: isRtl 
        ? "تطوير المنصة بالكامل بمفردي من الصفر (End-to-End). قمت ببرمجة وهيكلة واجهات المستخدم باستخدام HTML5 و Tailwind CSS، وبناء وتطوير النظام الخلفي بالكامل بـ PHP و Laravel، وتصميم قاعدة البيانات."
        : "Solely developed the entire platform from scratch (End-to-End). Engineered the front-end layouts using HTML5 and Tailwind CSS, and built the core backend infrastructure utilizing PHP and Laravel alongside MySQL schemas.",
      highlights: [
        { en: "Multi Role System", ar: "نظام صلاحيات متعدد الأدوار" },
        { en: "Super Admin Dashboard", ar: "لوحة تحكم الإدارة العليا" },
        { en: "Restaurant Management", ar: "إدارة كاملة للمطاعم" },
        { en: "Authentication & OTP Verification", ar: "نظام توثيق وحماية عبر OTP" },
        { en: "Scalable Backend Architecture", ar: "بنية برمجية خلفية قابلة للتوسع" }
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "PHP", "Laravel", "MySQL", "RESTful APIs"],
      image: waselImg,
      hasLive: false,
      githubUrl: "https://github.com/Ramadanx01",
      codeDetails: {
        ar: "واجهات الواجهة الأمامية مبنية بالكامل باستخدام هيكلية نقيّة بـ HTML5 وتنسيقات Tailwind CSS المرنة. تم ربطها بسلاسة مع الباك اند المبني بـ Laravel والاعتماد على قواعد بيانات MySQL مجهزة بـ Indexes ومحسنة لتنفيذ الاستعلامات المعقدة وأنظمة التحقق والـ APIs المعيارية الكفوءة.",
        en: "The front-end interface is constructed dynamically using custom HTML5 structures and utility-first Tailwind CSS. It connects seamlessly to a robust Laravel backend and optimized MySQL database clusters featuring structured index tracking for scalable query executions."
      }
    },
    {
      id: "secure-exam",
      title: "Secure Exam Platform",
      subtitle: isRtl ? "منصة امتحانات ذكية محمية ضد الغش" : "AI-Powered Anti-Cheating Exam System",
      desc: isRtl 
        ? "منصة امتحانات قوية ومتقدمة لكل الصفوف الدراسية تتيح صناعة اختبارات ذكية في دقائق مع نظام مراقبة وفحص حي لكل جلسة امتحانية لمنع الغش بشكل صارم وتصحيح فوري."
        : "A robust online examination system for all academic tiers featuring smart test creation tools, instant auto-grading, and real-time session tracking engineered to heavily mitigate cheating.",
      role: isRtl 
        ? "تطوير المنصة بالكامل من الصفر فرونت وباك كجهد فردي. صممت الواجهات التفاعلية بـ HTML5 و Tailwind وبنيت المنطق البرمجي الخلفي بـ PHP و Laravel لمراقبة الجلسات وكشف خروج الطلاب وحفظ البيانات بشكل آمن."
        : "Completely engineered the platform end-to-end as a solo Full-Stack developer. Structured the interface via HTML5 and Tailwind CSS, and crafted the underlying server scripts in PHP/Laravel to monitor focus shifts and secure exam records.",
      highlights: [
        { en: "Smart Exam Builder", ar: "صناعة اختبارات ذكية وجدولة المواعيد" },
        { en: "Instant Auto-Grading & Reports", ar: "تصحيح تلقائي وفوري مع تقارير أداء تفصيلية" },
        { en: "Anti-Cheating Security System", ar: "نظام حماية متطور يمنع نسخ الأسئلة" },
        { en: "Tab & Session Monitoring", ar: "مراقبة حيّة للجلسة وكشف الخروج من الشاشة" },
        { en: "Randomized Questions & Choices", ar: "ترتيب عشوائي كامل للأسئلة والخيارات لضمان النزاهة" }
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "PHP", "Laravel", "MySQL", "WebSockets / Socket.io"],
      image: examImg,
      hasLive: false,
      githubUrl: "https://github.com/Ramadanx01",
      codeDetails: {
        ar: "تم تطوير الواجهات التفاعلية للمنصة بـ HTML5 و Tailwind CSS لتوفر سرعة استجابة فائقة. نظام الحماية يعتمد على سكريبتات جافا سكريبت مخصصة بالتعاون مع Page Visibility API لرصد الخروج وتنبيه خادم Laravel فورياً عبر قنوات حية لضمان مراقبة حقيقية وحماية مطلقة للامتحان.",
        en: "Front-end blueprints utilize semantic HTML5 and fast Tailwind CSS grids. Anti-cheating integration leverages fine-tuned native JavaScript alongside the Page Visibility API to instantly trap blur triggers, signaling the Laravel API in real-time to preserve strict academic integrity."
      }
    },
    {
      id: "mtec",
      title: "MTEC Academy",
      subtitle: isRtl ? "منصة تعليمية وتدريبية متخصصة" : "Educational Training Platform",
      desc: isRtl 
        ? "موقع احترافي لمركز تدريب تقني متخصص في تقديم الدبلومات والكورسات العملية. تم تطوير المنصة لتسهيل عرض البرامج التدريبية وإدارة طلبات التسجيل وربط المتدربين بالمركز بطريقة سهلة وحديثة."
        : "A professional website for a tech training center specializing in practical diplomas and courses. Developed to streamline course discovery, manage enrollment requests, and seamlessly connect students with the center.",
      role: isRtl 
        ? "تطوير المنصة بالكامل من الصفر بجهد فردي متكامل (Full-Stack). قمت ببناء الواجهات بـ HTML5 و Tailwind CSS، وتطوير لوحة التحكم الخلفية بـ PHP و Laravel لإدارة الطلاب والكورسات وصلاحيات النظام وقاعدة البيانات."
        : "Completely developed the entire platform from scratch as a solo Full-Stack developer. Built user layouts via HTML5/Tailwind CSS and established a secure multi-role back-office dashboard written in PHP/Laravel.",
      highlights: [
        { en: "Modern UI/UX Experience", ar: "تجربة مستخدم حديثة وأنيقة" },
        { en: "Course Showcase System", ar: "نظام استعراض وتصفية الكورسات" },
        { en: "Student Registration Flow", ar: "مسار تسجيل وإدارة طلبات مرن" },
        { en: "SEO Friendly Structure", ar: "بنية مهيأة بالكامل لمحركات البحث" },
        { en: "Production Deployment", ar: "مشروع منشور ومستخدم فعلياً" }
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "PHP", "Laravel", "MySQL"],
      image: mtecImg,
      hasLive: true,
      liveUrl: "https://mtec-academy.com",
      githubUrl: "#",
      codeDetails: {
        ar: "صُممت واجهات العرض لتكون مهيأة كلياً لمحركات البحث بـ HTML5 و Tailwind CSS الخفيف جداً، مع معالجة كافة لوجيك الحجز والإدارة بكفاءة وأمان تام في الباك اند المطور بـ Laravel لحماية بيانات المستخدمين والطلبات.",
        en: "Crafted strictly for maximum lightweight indexing using semantic HTML5 structures styled with Tailwind CSS layouts. Dynamic dynamic workflows and data parsing are fully secured behind a scalable PHP and Laravel core infrastructure."
      }
    },
    {
      id: "motigraph",
      title: "Moti Graph",
      subtitle: isRtl ? "موقع ويب لوكالة إبداعية" : "Creative Agency Website",
      desc: isRtl 
        ? "موقع احترافي لشركة متخصصة في التصميم والخدمات الإبداعية. الهدف من المشروع كان بناء حضور رقمي قوي ومميز يعكس هوية الشركة وخدماتها بطريقة بصرية عصرية وسريعة جداً."
        : "A high-end website for an agency specializing in creative design and digital services. The goal was to establish a strong digital presence that mirrors the company's creative brand identity with fast performance.",
      role: isRtl 
        ? "تطوير وتصميم الموقع بالكامل بمفردي من الصفر. قمت ببناء الهيكل بـ HTML5 وتنسيقه بـ Tailwind CSS لتنفيذ واجهة عرض فخمة وعصرية جداً تعكس الهوية البصرية للوكالة بدقة وسرعة تصفح عالية."
        : "Designed and developed the entire agency website end-to-end as a single engineer. Built a high-performance visual interface utilizing semantic HTML5 markup wrapped inside highly responsive Tailwind CSS styles.",
      highlights: [
        { en: "Premium Landing Pages", ar: "صفحات هبوط فخمة ومخصصة" },
        { en: "Service & Portfolio Showcase", ar: "معرض استعراض الخدمات والأعمال" },
        { en: "Brand-Oriented Micro-interactions", ar: "تفاعلات وحركات بصرية متكاملة" },
        { en: "Fast Performance & Optimization", ar: "أداء فائق السرعة واستجابة كاملة" },
        { en: "Client-Focused Experience", ar: "مسار تواصل مخصص لجذب العملاء" }
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript"],
      image: motiGraphImg,
      hasLive: true,
      liveUrl: "https://motigraph.com",
      githubUrl: "#",
      codeDetails: {
        ar: "الموقع يعتمد بشكل كامل على البساطة الهيكلية والأداء العالي، حيث تم استخدام الـ Vanilla JavaScript المدمج مع الهيكل النقي لـ HTML5 وتنسيقات Tailwind CSS لضمان أعلى سرعات تحميل ممكنة وضمان توافق ممتاز وتام مع الـ SEO.",
        en: "The project values speed and semantic precision; utilizing optimized native JavaScript structures inside crisp HTML5 markup and Tailwind CSS blocks to ensure premium core web vitals and unparalleled SEO indexing."
      }
    }
  ];

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section 
      id="projects" 
      className="relative w-full min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-transparent z-10"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="w-full max-w-6xl mx-auto space-y-24">
        
        {/* عنوان السكشن */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase">
            {isRtl ? "المشاريع المختارة" : "Featured Projects"}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            {isRtl 
              ? "استعراض لأقوى المشاريع التي قمت ببنائها بالكامل فرونت وباند من الصفر لتلبية متطلبات الأنظمة الحقيقية." 
              : "A curated selection of my strongest real-world projects, built end-to-end with full-stack execution."}
          </p>
        </motion.div>

        {/* قائمة المشاريع */}
        <div className="space-y-32">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* 1. قسم الصورة */}
                <motion.div 
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-full lg:col-span-5 ${!isEven ? 'lg:order-last' : ''}`}
                >
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl group cursor-pointer pointer-events-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                      draggable="false"
                    />
                  </div>
                </motion.div>

                {/* 2. قسم البيانات والمحتوى الفني */}
                <motion.div 
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full lg:col-span-7 space-y-6 text-center lg:text-left pointer-events-auto"
                >
                  <div className={`space-y-1 ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
                    <span className="text-xs font-bold tracking-widest text-cyan-neon uppercase bg-cyan-neon/10 px-3 py-1 rounded-full border border-cyan-neon/20">
                      {isRtl ? "تطوير متكامل (Full-Stack)" : "Full-Stack Project"}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white pt-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-neutral-400">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className={`text-neutral-300 font-light text-base leading-relaxed ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
                    {project.desc}
                  </p>

                  <div className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm font-light text-neutral-300 leading-relaxed ${isRtl ? 'text-right border-r-2 border-r-cyan-neon/40' : 'text-left border-l-2 border-l-cyan-neon/40'}`}>
                    <strong className="text-white font-bold block mb-1">
                      {isRtl ? "دوري في المشروع (من الصفر للآخر):" : "My Role (End-to-End):"}
                    </strong>
                    {project.role}
                  </div>

                  <div className="space-y-2">
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-400 text-xs sm:text-sm font-light ${isRtl ? 'text-right' : 'text-left'}`}>
                      {project.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 justify-center lg:justify-start">
                          <FiCheckCircle className="text-cyan-neon flex-shrink-0" />
                          <span>{isRtl ? highlight.ar : highlight.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* الـ Tech Stack بالأيقونات والألوان الإحترافية الفردية */}
                  <div className={`flex flex-wrap gap-2 justify-center ${isRtl ? 'lg:justify-start' : 'lg:justify-start'}`}>
                    {project.tech.map((techName) => {
                      const config = techMap[techName];
                      if (!config) return null;
                      const Icon = config.icon;
                      return (
                        <div 
                          key={techName}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-white/[0.02] border border-white/5 rounded-xl transition-colors duration-300"
                        >
                          <Icon style={{ color: config.color }} className="text-sm" />
                          <span>{techName}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* أزرار الـ Action */}
                  <div className={`flex flex-wrap items-center gap-4 pt-2 justify-center ${isRtl ? 'lg:justify-start' : 'lg:justify-start'}`}>
                    {project.hasLive ? (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 pointer-events-auto cursor-pointer"
                      >
                        <FiExternalLink />
                        {isRtl ? "معاينة حية" : "Live Demo"}
                      </a>
                    ) : (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-cyan-neon/20 hover:bg-cyan-neon/30 border border-cyan-neon/30 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 pointer-events-auto cursor-pointer"
                      >
                        <FiGithub />
                        {isRtl ? "كود المشروع" : "View Code"}
                      </a>
                    )}
                    
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="relative z-20 flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300 pointer-events-auto cursor-pointer"
                    >
                      <FiInfo />
                      {isRtl ? "تفاصيل الكود" : "Details"}
                    </button>
                  </div>

                </motion.div>

              </div>
            );
          })}
        </div>
      </div>

      {/* الـ Custom Modal المطور والمصلح بنسبة 100% */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
            
            {/* طبقة الخلفية (Backdrop) الممتدة بالكامل لضمان قفل المودال فوراً عند الضغط في أي مكان بالخارج */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-md cursor-pointer z-10"
            />

            {/* جسم المودال - تم تصغيره لـ max-w-xl على الشاشات الكبيرة ونزل مسافة الـ Navbar بـ pt-24 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-xl bg-neutral-900/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 mt-24 mb-12 z-20 pointer-events-auto"
            >
              {/* زر الإغلاق العلوي */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-white/5 p-2 rounded-lg transition-colors cursor-pointer z-30"
              >
                <FiX size={18} />
              </button>

              {/* ترويسة المودال */}
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-white">
                  {selectedProject.title}
                </h4>
                <p className="text-xs sm:text-sm font-medium text-cyan-neon">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* صورة المشروع داخل المودال */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
              </div>

              {/* تفاصيل الكود والحلول الهندسية */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isRtl ? "الهيكلة البرمجية وتفاصيل الكود:" : "Architectural & Code Details:"}
                </h5>
                <p className="text-neutral-300 font-light text-sm leading-relaxed text-justify">
                  {isRtl ? selectedProject.codeDetails.ar : selectedProject.codeDetails.en}
                </p>
              </div>

              {/* التقنيات بالأيقونات والألوان داخل المودال */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tech.map((techName) => {
                  const config = techMap[techName];
                  if (!config) return null;
                  const Icon = config.icon;
                  return (
                    <div 
                      key={techName}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-white/5 border border-white/5 rounded-xl"
                    >
                      <Icon style={{ color: config.color }} className="text-sm" />
                      <span>{techName}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}