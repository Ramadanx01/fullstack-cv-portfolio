import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { isRtl } = useLanguage();

  // 1. القائمة الموسعة للـ Tech Stack Chips بناءً على طلبك
  const techChips = [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "PHP",
    "Laravel",
    "MySQL",
    "REST APIs",
    "Git",
    "GitHub"
  ];

  // 2. الـ 3 Stats الصغيرة البديلة للرسومات المعقدة
  const stats = [
    { en: "Frontend", ar: "هندسة الواجهات" },
    { en: "Backend", ar: "الأنظمة الخلفية" },
    { en: "Database", ar: "قواعد البيانات" }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-transparent" 
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      
      {/* الكارت الرئيسي: بطل المشهد، ممتد بالكامل وعريض ليكون النص هو الأساس */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center space-y-8"
      >
        
        {/* قسم العناوين والتعريف المختصر والاحترافي */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {isRtl ? "من أنا؟" : "Who Am I?"}
          </h3>
          
          <div className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed space-y-4">
            {isRtl ? (
              <>
                <p>أنا محمد، مطور Full Stack أركز على بناء تطبيقات ويب حديثة تجمع بين تجربة مستخدم سلسة وبنية خلفية قوية وقابلة للتوسع.</p>
                <p>أستمتع بتحويل الأفكار إلى منتجات حقيقية، بداية من تصميم الواجهات وحتى بناء قواعد البيانات والمنطق البرمجي وإطلاق المشروع بشكل احترافي.</p>
                <p>هدفي ليس فقط كتابة الكود، بل بناء أنظمة عملية تحل مشاكل حقيقية وتقدم تجربة استخدام مميزة.</p>
              </>
            ) : (
              <>
                <p>I'm Mohamed, a Full Stack Developer focused on building modern web applications that combine exceptional user experiences with scalable backend systems.</p>
                <p>I enjoy transforming ideas into real products, from crafting interfaces to designing databases and developing reliable business logic.</p>
                <p>My goal is not only to write code, but to create solutions that solve real problems and deliver meaningful value.</p>
              </>
            )}
          </div>
        </div>

        {/* كروت الـ 3 Stats الصغيرة والأنيقة المقسمة للتخصصات الأساسية */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="py-3 px-4 rounded-xl bg-white/[0.01] border border-white/5 text-neutral-200 text-sm font-medium tracking-wide"
            >
              {isRtl ? stat.ar : stat.en}
            </div>
          ))}
        </div>

        {/* خط فاصل ناعم جداً يفصل التخصصات عن الـ Chips */}
        <div className="h-[1px] w-1/3 bg-white/5 mx-auto" />

        {/* قسم الـ Tech Stack Chips المحسنة مع أنيميشن ظهور سريع و Hover تفاعلي */}
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
          {techChips.map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ y: -2, borderColor: "rgba(0, 245, 255, 0.3)", backgroundColor: "rgba(0, 245, 255, 0.02)" }}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-400 bg-white/[0.01] border border-white/5 rounded-lg transition-colors cursor-default select-none"
            >
              {tech}
            </motion.span>
          ))}
        </div>

      </motion.div>
    </section>
  );
}