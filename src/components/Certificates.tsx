import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiAward, FiExternalLink, FiMaximize2, FiX, FiCalendar } from 'react-icons/fi';

// استيراد صور الشهادات من المسارات المحددة بدقة داخل الـ assets
import cert1Img from '../assets/images/Certificates/cert1.jpg';
import cert2Img from '../assets/images/Certificates/cert3.jpg';
import cert3Img from '../assets/images/Certificates/cert2.jpg';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  image: string;
  isVerified: boolean;
  verifyUrl?: string;
  tags: string[];
}

export default function Certificates() {
  const { isRtl } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // التحكم في سكرول الصفحة الخلفية عند فتح مودال تكبير الصورة
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const certificatesData: Certificate[] = [
    {
      id: "moti-graph-exp",
      title: isRtl ? "شهادة خبرة وتدريب متكامل" : "Full-Stack Experience & Training Certificate",
      issuer: "Moti Graph",
      date: "2026",
      desc: isRtl 
        ? "شهادة معتمدة وموثقة رقمياً من الشركة بعد إتمام التدريب المكثف على بناء الأنظمة السحابية، قواعد البيانات، وتطوير الواجهات الاحترافية وإدارة المشاريع الفلكستيرية بالكامل."
        : "An officially verified experience certificate and intensive training program covering system architecture, database optimization, and scalable web solutions.",
      image: cert3Img,
      isVerified: true,
      // 🎯 تعديل الرابط هنا ليكون مباشر وصافي بدون جوجل ترانسليت
      verifyUrl: "https://moti-graph.com/certificates.php?cert_id=MOT-EXP-2026-0078",
      tags: ["Full-Stack", "Backend", "Moti Graph"]
    },
    {
      id: "isef-volunteer",
      title: isRtl ? "شهادة تطوع وتنظيم - معرض ISEF الدولي" : "Volunteering & Organizing Certificate - ISEF",
      issuer: isRtl ? "معرض إنتل الدولي للعلوم والهندسة (ISEF)" : "Intel International Science and Engineering Fair",
      date: "2025",
      desc: isRtl 
        ? "شهادة تكريم وتقدير للمشاركة الفعالة في تنظيم وإدارة فعاليات مسابقة ايسف (ISEF) العالمية للعلوم والهندسة, والمساعدة في توجيه الفرق ودعم البيئة التكنولوجية."
        : "A certificate of appreciation for active volunteering, event coordination, and logistics management during the world-renowned ISEF international competition.",
      image: cert1Img,
      isVerified: false,
      tags: [isRtl ? "تطوع" : "Volunteering", isRtl ? "مسابقات عالمية" : "International Events"]
    },
    {
      id: "robotics-workshop",
      title: isRtl ? "شهادة ابتكار ومشاركة في ورشة الروبوتات" : "Robotics Innovation & Engineering Workshop",
      issuer: isRtl ? "ورشة العمل التكنولوجية للروبوتات" : "Advanced Robotics Engineering Workshop",
      date: "2025",
      desc: isRtl 
        ? "شهادة إتمام ورشة العمل التطبيقية الخاصة بهندسة البرمجيات والتحكم الذكي، والمشاركة في بناء وبرمجة النماذج الأولية للأنظمة واللوجيك البرمجي الفعلي."
        : "Certified participation in hands-on robotics engineering, firmware logic implementation, and automated hardware prototyping integrations.",
      image: cert2Img,
      isVerified: false,
      tags: [isRtl ? "روبوتات" : "Robotics", isRtl ? "برمجة وهندسة" : "Engineering"]
    }
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15, delay: index * 0.15 }
    })
  };

  return (
    <section 
      id="certificates" 
      className="relative w-full min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-transparent z-10 pointer-events-auto"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="w-full max-w-6xl mx-auto space-y-16">
        
        {/* عنوان السكشن */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase flex items-center justify-center gap-3">
            <FiAward className="text-cyan-neon text-3xl sm:text-4xl" />
            {isRtl ? "الشهادات والاعتمادات" : "Certificates & Badges"}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            {isRtl 
              ? "توثيق رسمي للمهارات والخبرات الفنية والمشاركات الدولية والمحلية." 
              : "Official recognition of technical skills, business experience, and international engagements."}
          </p>
        </motion.div>

        {/* شبكة عرض الشهادات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={cert.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col bg-neutral-900/40 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group backdrop-blur-sm"
            >
              
              {/* قسم صورة الشهادة مع تأثيرات التحويم وزر التكبير */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50 border-b border-white/5">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                  <button
                    onClick={() => setSelectedImage(cert.image)}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl shadow-lg backdrop-blur-md transition-all duration-200 transform hover:scale-110 cursor-pointer"
                    title={isRtl ? "تكبير الصورة" : "Enlarge Image"}
                  >
                    <FiMaximize2 size={18} />
                  </button>
                  
                  {cert.isVerified && cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cyan-neon/20 hover:bg-cyan-neon/30 border border-cyan-neon/30 text-cyan-neon hover:text-white rounded-xl shadow-lg backdrop-blur-md transition-all duration-200 transform hover:scale-110"
                      title={isRtl ? "التحقق الرقمي" : "Verify Credential"}
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>

                {/* شارة التوثيق */}
                {cert.isVerified && (
                  <span className="absolute top-3 left-3 z-20 text-[10px] font-bold tracking-widest text-cyan-neon uppercase bg-neutral-950/80 px-2.5 py-1 rounded-md border border-cyan-neon/30 backdrop-blur-sm">
                    {isRtl ? "موثقة برابط" : "Verified Link"}
                  </span>
                )}
              </div>

              {/* بيانات وتفاصيل الشهادة */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                    <FiCalendar className="text-cyan-neon/70" />
                    <span>{cert.date}</span>
                    <span>•</span>
                    <span className="text-white font-bold">{cert.issuer}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-neon transition-colors duration-300 line-clamp-1 pt-1">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed flex-grow line-clamp-3 text-justify">
                  {cert.desc}
                </p>

                {/* الـ Tags والروابط السفلية */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] font-medium text-neutral-300 bg-white/5 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {cert.isVerified && cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-neon hover:text-white transition-colors duration-200"
                    >
                      <span>{isRtl ? "رابط التوثيق" : "Verification"}</span>
                      <FiExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* المودال المخصص لعرض صور الشهادات بالحجم الكامل */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 w-full h-full bg-black/90 backdrop-blur-md cursor-pointer z-10"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative max-w-4xl max-h-[80vh] bg-transparent rounded-xl overflow-hidden z-20 pointer-events-auto flex items-center justify-center"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-black/60 p-2 rounded-lg transition-colors cursor-pointer z-30 border border-white/10"
              >
                <FiX size={18} />
              </button>

              <img 
                src={selectedImage} 
                alt="Certificate Fullscreen" 
                className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl select-none"
                draggable="false"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
