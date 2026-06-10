import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiArrowTrendingUp, HiSparkles } from 'react-icons/hi2';

// تسجيل الملحق الخاص بالجهاز العصبي للسكرول
gsap.registerPlugin(ScrollTrigger);

export default function TechGrowthChart() {
  const { isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartPathRef = useRef<SVGPathElement>(null);
  const pointerRef = useRef<SVGGElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = chartPathRef.current;
    const pointer = pointerRef.current;
    if (!path || !pointer) return;

    // حساب الطول الكلي لخط الرسم البياني لعمل تأثير الرسم التدريجي
    const pathLength = path.getTotalLength();
    
    // إعداد الخط ليكون مخفي في البداية بالكامل
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 🎬 سلسلة أنيميشن الجرافيك المربوطة بالسكرول (رايح جاي)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 30%",     // يبدأ الأنيميشن لما قمة السكشن توصل لـ 30% من الشاشة
        end: "bottom 40%",   // ينتهي لما أسفل السكشن يوصل لـ 40%
        scrub: 1.2,          // الربط المباشر مع حركة السكرول بسلاسة ممتازة
        markers: false,       // يمكنك جعلها true أثناء التجارب لرؤية خطوط البداية والنهاية
      }
    });

    // 1. تحريك رسم الخط ومؤشر السهم بالتوازي مع ظهور الكلام خطوة بخطوة
    tl.to(path, { strokeDashoffset: pathLength * 0.6, duration: 1, ease: "none" }, "stage1")
      .to(pointer, {
        motionPath: {
          path: path,
          start: 0,
          end: 0.4,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        duration: 1,
        ease: "none"
      }, "stage1")
      .fromTo(step1Ref.current, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 }, "stage1+=0.2")

    // 2. المرحلة الثانية من الرسم والنمو
    tl.to(path, { strokeDashoffset: pathLength * 0.2, duration: 1, ease: "none" }, "stage2")
      .to(pointer, {
        motionPath: {
          path: path,
          start: 0.4,
          end: 0.8,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        duration: 1,
        ease: "none"
      }, "stage2")
      .fromTo(step2Ref.current, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 }, "stage2+=0.2")

    // 3. المرحلة الأخيرة (القمة والوصول للـ Full Stack البروفيشينال)
    tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "none" }, "stage3")
      .to(pointer, {
        motionPath: {
          path: path,
          start: 0.8,
          end: 1,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        duration: 1,
        ease: "none"
      }, "stage3")
      .fromTo(step3Ref.current, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 }, "stage3+=0.2")
      // تأثير توهج نبضي نهائي للسهم عند القمة
      .to(pointer, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // قاموس النصوص العربي والإنجليزي المدمج لتفادي أي أخطاء
  const text = {
    en: {
      title: "The Growth Curve",
      subtitle: "Visualizing my evolutionary path from code enthusiast to architectural builder.",
      phase1: "Phase 01: Core Frontend",
      phase1Desc: "HTML, CSS, JS, React & State Architectures.",
      phase2: "Phase 02: Systems Engineering",
      phase2Desc: "Deep Laravel backend, robust business API logic & DB normalization.",
      phase3: "Phase 03: Scale & Fusion",
      phase3Desc: "Deploying enterprise-grade platforms (Wasel, Khazna Sys)."
    },
    ar: {
      title: "منحنى النمو البرمجي",
      subtitle: "تجسيد بصري لمسار التطور البرمجي من شغف الكود إلى هندسة الأنظمة الحية.",
      phase1: "المرحلة الأولى: هندسة الواجهات",
      phase1Desc: "بناء واجهات تفاعلية متكاملة باستخدام JS, React وتعميق بنية الحالة.",
      phase2: "المرحلة الثانية: هندسة الأنظمة الخلفية",
      phase2Desc: "التعمق في Laravel، بناء الـ APIs، وتطوير منطق العمل وإدارة البيانات القوية.",
      phase3: "المرحلة الثالثة: الاندماج والإنتاجية الكبرى",
      phase3Desc: "إطلاق الأنظمة والمنصات الكاملة والضخمة في السوق الفعلي (واصل وخزنة)."
    }
  };

  const t = isRtl ? text.ar : text.en;

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full bg-[#07070b]/40 py-32 px-4 sm:px-6 lg:px-8 border-t border-b border-white/5 backdrop-blur-[2px] overflow-hidden"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* العناوين العلوية للسكشن */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-neon/10 border border-cyan-neon/30 text-cyan-neon text-xs font-semibold uppercase">
            <HiArrowTrendingUp className="w-3.5 h-3.5" />
            {t.title}
          </div>
          <h3 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            {t.title}
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 📉 لوحة الرسم البياني المضيئة والمربوطة بالسكرول */}
        <div className="relative w-full h-[400px] bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
          
          {/* شبكة الخلفية التكنولوجية للرسم البياني */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* الـ SVG الذكي الذي يرسم المنحنى التصاعدي */}
          <svg 
            viewBox="0 0 1000 400" 
            className="absolute inset-0 w-full h-full p-6 sm:p-10 pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* تدرج لوني مضيء لخط الرسم */}
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#00f5ff" />
              </linearGradient>
              
              {/* تأثير توهج النيون المحيط بالرسم */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* خط الخلفية الباهت الثابت لإعطاء عمق بصري للمسار */}
            <path
              d="M 50 350 Q 250 320 400 200 T 750 150 T 950 50"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              className="opacity-[0.04]"
            />

            {/* ⚡ خط الرسم البياني الحي والمضيء والمحرك بالسكرول */}
            <path
              ref={chartPathRef}
              d="M 50 350 Q 250 320 400 200 T 750 150 T 950 50"
              fill="none"
              stroke="url(#chartGradient)"
              strokeWidth="4"
              filter="url(#neonGlow)"
              strokeLinecap="round"
            />

            {/* 🏹 مؤشر رأس السهم المضيء الذي يتبع الخط بدقة فلكية */}
            <g ref={pointerRef} id="chartPointer">
              <circle r="7" fill="#00f5ff" />
              <circle r="15" fill="#00f5ff" className="opacity-20 animate-ping" />
              {/* مثلث السهم الصغير */}
              <polygon points="-4,-4 8,0 -4,4" fill="#ffffff" transform="rotate(0)" />
            </g>
          </svg>

          {/* 💬 الكروت والنصوص التفاعلية الموزعة على مسار السكرول الفعلي */}
          <div className="absolute inset-0 w-full h-full p-6 sm:p-10 pointer-events-none flex flex-col justify-between">
            
            {/* نقطة البيانات الأولى - أسفل اليسار (Frontend) */}
            <div 
              ref={step1Ref}
              className={`absolute bottom-8 ${isRtl ? 'right-6 sm:right-16' : 'left-6 sm:left-16'} max-w-[240px] p-4 rounded-xl bg-[#0a0a0f]/90 border border-cyan-neon/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.1)]`}
            >
              <h4 className="text-xs sm:text-sm font-bold text-cyan-neon flex items-center gap-1.5">
                <HiSparkles className="w-3.5 h-3.5" />
                {t.phase1}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-light leading-relaxed">{t.phase1Desc}</p>
            </div>

            {/* نقطة البيانات الثانية - المنتصف (Backend) */}
            <div 
              ref={step2Ref}
              className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[260px] p-4 rounded-xl bg-[#0a0a0f]/90 border border-purple-neon/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]"
            >
              <h4 className="text-xs sm:text-sm font-bold text-purple-neon flex items-center gap-1.5">
                <HiSparkles className="w-3.5 h-3.5" />
                {t.phase2}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-light leading-relaxed">{t.phase2Desc}</p>
            </div>

            {/* نقطة البيانات الثالثة - أعلى اليمين (Full Stack Pro) */}
            <div 
              ref={step3Ref}
              className={`absolute top-6 ${isRtl ? 'left-6 sm:left-16' : 'right-6 sm:right-16'} max-w-[250px] p-4 rounded-xl bg-[#0a0a0f]/90 border border-cyan-neon/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,245,255,0.15)]`}
            >
              <h4 className="text-xs sm:text-sm font-bold text-transparent bg-gradient-to-r from-cyan-neon to-white bg-clip-text flex items-center gap-1.5">
                <HiSparkles className="w-3.5 h-3.5 text-cyan-neon" />
                {t.phase3}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 font-light leading-relaxed">{t.phase3Desc}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}