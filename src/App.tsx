import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';

// استيراد الملفات الإضافية
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

// المشهد الـ 3D الخلفي
import GlobalScene from './components3d/GlobalScene'; 

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-neon selection:text-bg-dark overflow-x-hidden relative">
      
      {/* 🌌 المشهد الـ 3D الموحد شغال في الخلفية */}
      <GlobalScene />

      {/* المكونات الثابتة العلوية والجانبية (pointer-events-auto مدموجة جواها) */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* الحاوية الرئيسية للسكاشن */}
      <main className="relative z-10 pointer-events-none">
        
        {/* السكاشن الأساسية */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        
        {/* 
          السكاشن الجديدة: كسرنا الـ pointer-events-none هنا 
          عن طريق لفّهم في div واخد pointer-events-auto عشان يحس بالماوس والأنيميشن يشتغل فوراً!
        */}
        <div className="pointer-events-auto w-full">
          <Certificates />
        </div>

        <div className="pointer-events-auto w-full">
          <Contact />
        </div>
        
      </main>

      {/* الـ Footer شغال حر برة الـ main عشان اللمسات والضغطات تشتغل بسلاسة */}
      <div className="pointer-events-auto w-full relative z-20">
        <Footer />
      </div>

    </div>
  );
}