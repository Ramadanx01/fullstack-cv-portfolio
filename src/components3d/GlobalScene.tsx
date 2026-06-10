import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل ملحق السكرول من GSAP
gsap.registerPlugin(ScrollTrigger);

// ================= 1. مخرج الكاميرا السينمائي (Multi-Stage Camera Director) =================
function CinematicDirector({ mouse }: { mouse: React.MutableRefObject<{ x: number, y: number }> }) {
  const { camera } = useThree();
  const scrollProgress = useRef({ value: 0 });

  // الإحداثيات المستهدفة للكاميرا في فضاء الـ 3D لعمل الـ Lerp الناعم
  const targetCam = useRef({ x: 0, y: 0, z: 5, rx: 0, ry: 0, rz: 0 });

  useEffect(() => {
    // ربط خط الموشن بالسكرول الكلي للموقع لتقسيم حركة الكاميرا لمراحل
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5, // سلاسة ممتازة لمنع التكتكة
      onUpdate: (self) => {
        scrollProgress.current.value = self.progress;
      }
    });

    return () => trigger.kill();
  }, []);

  useFrame(() => {
    const p = scrollProgress.current.value;

    // 🎬 تقسيم حركة الكاميرا بناءً على نسبة النزول (Scroll Progress)
    if (p < 0.35) {
      // المرحلة الأولى (Hero): الكاميرا قريبة، وتتحرك لليمين قليلاً لترك مساحة للنصوص على اليسار
      const localP = p / 0.35;
      targetCam.current.x = THREE.MathUtils.lerp(0, 1.2, localP);
      targetCam.current.y = THREE.MathUtils.lerp(0, -0.2, localP);
      targetCam.current.z = THREE.MathUtils.lerp(5, 4.2, localP);
      targetCam.current.ry = THREE.MathUtils.lerp(0, -0.3, localP);
      targetCam.current.rx = 0;
    } 
    else if (p >= 0.35 && p < 0.7) {
      // المرحلة الثانية (Projects / About): الكاميرا تلف وتتحرك لليسار بالكامل وتعمل زووم أوت لاستعراض المدارات
      const localP = (p - 0.35) / 0.35;
      targetCam.current.x = THREE.MathUtils.lerp(1.2, -1.4, localP);
      targetCam.current.y = THREE.MathUtils.lerp(-0.2, 0.4, localP);
      targetCam.current.z = THREE.MathUtils.lerp(4.2, 5.8, localP);
      targetCam.current.ry = THREE.MathUtils.lerp(-0.3, 0.4, localP);
      targetCam.current.rx = THREE.MathUtils.lerp(0, -0.2, localP);
    } 
    else {
      // المرحلة الثالثة والاخيرة (Contact / Footer): الكاميرا تطير بالكامل للأعلى وتنظر للأسفل (Fly Up Experience)
      const localP = (p - 0.7) / 0.3;
      targetCam.current.x = THREE.MathUtils.lerp(-1.4, 0, localP);
      targetCam.current.y = THREE.MathUtils.lerp(0.4, 4.5, localP); // الارتفاع لأعلى الفضاء
      targetCam.current.z = THREE.MathUtils.lerp(5.8, 2.5, localP); // الاقتراب من حقل النجوم العلوي
      targetCam.current.rx = THREE.MathUtils.lerp(-0.2, -1.2, localP); // النظر لأسفل نحو المجرة المتروكة خلفنا
      targetCam.current.ry = THREE.MathUtils.lerp(0.4, 0, localP);
    }

    // 🖱️ إضافة تأثير الـ Parallax الخفيف والذكي من حركة الماوس لزيادة الإحساس بالـ 3D Real Depth
    const mouseX = mouse.current.x * 0.3;
    const mouseY = mouse.current.y * 0.3;

    // تطبق حركات الكاميرا بـ Lerp ناعم جداً ومريح للعين
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCam.current.x + mouseX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCam.current.y + mouseY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCam.current.z, 0.05);

    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetCam.current.rx - (mouseY * 0.2), 0.05);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetCam.current.ry + (mouseX * 0.2), 0.05);
  });

  return null;
}

// ================= 2. قلب النواة الكونية والأجرام التابعة (Cosmic Tech Core & Orbiting Moons) =================
function CosmicCore() {
  const coreRef = useRef<THREE.Group>(null);
  const internalMesh = useRef<THREE.Mesh>(null);
  const moonRef1 = useRef<THREE.Mesh>(null);
  const moonRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      // دوران المجرة بالكامل حول نفسها ببطء فخم
      coreRef.current.rotation.y = time * 0.05;
    }

    if (internalMesh.current) {
      // نبض ضوئي لنواة الطاقة المركزية وكأنها نجم حي
      const pulse = 1 + Math.sin(time * 3.0) * 0.05;
      internalMesh.current.scale.set(pulse, pulse, pulse);
    }

    // 🔄 تحريك الكواكب المدارية الصغيرة في مسارات دائرية حقيقية (وبيلف حوله حاجات)
    if (moonRef1.current) {
      const angle1 = time * 0.4;
      moonRef1.current.position.set(Math.cos(angle1) * 1.5, Math.sin(angle1) * 0.3, Math.sin(angle1) * 1.5);
      moonRef1.current.rotation.y = time * 0.5;
    }

    if (moonRef2.current) {
      const angle2 = -time * 0.25; // دوران في اتجاه معاكس وبسرعة مختلفة لتعميق البُعد الثالث
      moonRef2.current.position.set(Math.cos(angle2) * 2.2, Math.sin(angle2) * -0.4, Math.sin(angle2) * 2.2);
    }
  });

  return (
    <group ref={coreRef}>
      {/* 🌟 بطل المشهد: النواة ثلاثية الأبعاد الكرومية المتوهجة بالسيان */}
      <mesh ref={internalMesh}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshPhysicalMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* حلقة النيون المحيطية المستقيمة */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.015, 8, 64]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.5} />
      </mesh>

      {/* حلقة النيون الثانوية المائلة (Cyber Ring) */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.12, 0.01, 8, 64]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.2} transparent opacity={0.5} />
      </mesh>

      {/* 🔴 الجرم التابع الأول (تكنولوجي بلوري صغير) */}
      <mesh ref={moonRef1}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} wireframe />
      </mesh>

      {/* 🔵 الجرم التابع الثاني (نجم حماية مضيء في مدار أبعد) */}
      <mesh ref={moonRef2}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>
    </group>
  );
}

// ================= 3. حقل النجوم ثلاثي الأبعاد العميق (Deep Cosmic Starfield) =================
function CosmicStarfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 900; 

  // توليد النجوم في فضاء ثلاثي الأبعاد
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 15;     
      pos[i + 1] = (Math.random() - 0.5) * 15; 
      pos[i + 2] = (Math.random() - 0.5) * 12; 
    }
    return pos;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* ✨ الحل السحري هنا: مررنا الـ positions والـ itemSize (3) جوه الـ args كـ Array */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.035}
        sizeAttenuation={true} 
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

// ================= 4. الحاوية الكلية والمشهد العالمي (Global Master Component) =================
export default function GlobalScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // لقط حركة الماوس وسلْطها عالمياً بسلاسة
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#040408] pointer-events-none overflow-hidden">
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        {/* إضاءة سينمائية داكنة متوازنة للفضاء المحيط */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2.0} color="#00f5ff" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#a855f7" />
        
        {/* استدعاء المخرج والمكونات الفضائية ثلاثية الأبعاد الحقيقية */}
        <CinematicDirector mouse={mouse} />
        <CosmicCore />
        <CosmicStarfield />
      </Canvas>

      {/* طبقة السينما نويز المتناهية في الصغر لإعطاء لمسة الـ Premium Look */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.012] bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" 
      />

    </div>
  );
}