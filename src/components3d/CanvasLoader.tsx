import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
  const { progress } = useProgress();
  
  return (
    <Html
      center
      as="div"
      className="flex flex-col items-center justify-center bg-transparent pointer-events-none"
    >
      <div className="w-14 h-14 border-4 border-t-cyan-neon border-white/5 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(0,245,255,0.3)]" />
      
      <p className="text-cyan-neon font-sans text-xs font-bold tracking-widest uppercase">
        {progress.toFixed(0)}% Loading
      </p>
    </Html>
  );
}