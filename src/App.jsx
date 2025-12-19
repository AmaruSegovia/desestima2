import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Download, Brain, Monitor, Layers, ChevronDown, Sparkles, Trophy, Brush, Code, Play } from 'lucide-react';

// --- IMPORTS DE ASSETS ---
import candelaImg from './assets/candela.png';
import amaruImg from './assets/amaru.png';
import neruImg from './assets/mila.png';
import cristianImg from './assets/cristian.png';
import estrellitaImg from './assets/estrellita_owo.png'; 
import portadaRufino from './assets/portada.png'; 
import magiaCover from './assets/magia.png'; 
import aurora from './assets/aurora.png';
import magia1 from './assets/magia1.png';
import magia2 from './assets/magia2.png';
import magia3 from './assets/magia3.png';
import magia4 from './assets/magia4.png'; 
import magia5 from './assets/magia5.png';

// --- NUEVO IMPORT DEL ICONO (Asegúrate de tener el archivo en la carpeta assets) ---
import iconoImg from './assets/icono.png'; 

// Iconos Tech
import clipstudio from './assets/clipstudio.png';
import unreal from './assets/unreal.png';
import git from './assets/git.png';
import aseprite from './assets/aseprite.png';
import blender from './assets/blender.png';
import unity from './assets/unity.png';
import processingLogo from './assets/processing.png'; 

// --- DATA URI PARA LA NUBE ---
const cloudSVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-0.498,0.068-0.979,0.194-1.435C11.383,11.353,10.467,11,9.5,11c-2.485,0-4.5,2.015-4.5,4.5c0,2.485,2.015,4.5,4.5,4.5H17.5z M17.5,8c2.485,0,4.5,2.015,4.5,4.5c0,2.485-2.015,4.5-4.5,4.5h-5.771c-0.89-1.31-1.429-2.863-1.579-4.545C10.74,12.23,11,12.119,11,12C11,9.791,12.791,8,15,8c0.119,0,0.23,0.02,0.345,0.049C15.863,8.019,16.421,8,17.5,8z'/%3E%3C/svg%3E`;

// --- EFECTOS VISUALES ---

const SnowEffect = () => {
  const snowflakes = useMemo(() => [...Array(30)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    opacity: Math.random() * 0.8 + 0.2,
    size: Math.random() * 4 + 2,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gray-900">
       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10"></div>
       {snowflakes.map((flake, i) => (
         <div key={i} className="snowflake bg-white rounded-full absolute" 
              style={{left: flake.left, animationDelay: flake.animationDelay, animationDuration: flake.animationDuration, opacity: flake.opacity, width: flake.size, height: flake.size}} />
       ))}
    </div>
  );
};

const CloudEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#4a7a94]">
       <div className="clouds-animation absolute inset-0 opacity-40" 
            style={{ '--cloud-url': `url("${cloudSVG}")` }}></div>
       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
};

// Fondo con patrón de puntos para MagIA
const MagiaBackground = () => (
  <div className="absolute inset-0 bg-[#1a0b2e]">
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
  </div>
);

const FloatingStars = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="absolute animate-pulse" style={{
        left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`
      }}>
        <Sparkles size={10} className="text-yellow-200 opacity-40" />
      </div>
    ))}
  </div>
);

// --- DATOS DE CONFIGURACIÓN ---
const projectsData = {
  ciudad: {
    id: 'ciudad',
    title: "CIUDAD DEL OLVIDO",
    subtitle: "Survival Horror / RPG",
    desc: "Olvidar no te librará de tus cadenas... Eres Aurora, atrapada en una dimensión alterna de Jujuy llena de niebla y monstruos.",
    cover: estrellitaImg,
    gameImages: [estrellitaImg, aurora], 
    bgType: 'snow',
    btnColor: 'bg-red-800 hover:bg-red-700',
    accentColor: 'text-red-500',
    techStack: [
      { name: 'Unreal 5', icon: unreal },
      { name: 'Blender', icon: blender },
      { name: 'Clip Studio', icon: clipstudio },
      { name: 'GitHub', icon: git },
    ],
    gallery: []
  },
  rufino: {
    id: 'rufino',
    title: "RUFINO VS ALIENS",
    subtitle: "Action Platformer",
    desc: "¡Caos pixelado! Defiende tu rancho de una invasión alienígena con tu perro bizco en este frenético juego estilo Pizza Tower.",
    cover: portadaRufino,
    gameImages: [portadaRufino, estrellitaImg], 
    bgType: 'clouds',
    btnColor: 'bg-yellow-500 text-black hover:bg-yellow-400',
    accentColor: 'text-yellow-300',
    techStack: [
      { name: 'Unity', icon: unity },
      { name: 'AseSprite', icon: aseprite },
      { name: 'Clip Studio', icon: clipstudio },
    ],
    gallery: []
  },
  magia: {
    id: 'magia',
    title: "MagIA",
    subtitle: "Roguelike Shooter",
    desc: "Magia vs Inteligencia Artificial. Limpia mazmorras procedurales en este bullet-hell. ¡Toca la pantalla para disparar!",
    cover: magiaCover,
    gameImages: [magiaCover, magia1, magia2, magia3, magia4, magia5], 
    bgType: 'magia',
    btnColor: 'bg-indigo-600 hover:bg-indigo-500',
    accentColor: 'text-indigo-400',
    techStack: [
      { name: 'Processing', icon: processingLogo },
      { name: 'AseSprite', icon: aseprite },
    ],
    gallery: []
  }
};

// --- COMPONENTES UI ---

const MemberCard = ({ name, role, icon, color, image, lvl }) => (
  <div className="relative bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-white/50 w-full group hover:-translate-y-1 transition-transform duration-300">
    <div className={`h-16 md:h-20 ${color} relative`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-1.5 md:top-2 right-1.5 md:right-2 bg-black/20 text-white text-[9px] md:text-[10px] font-mono px-1.5 md:px-2 py-0.5 md:py-1 rounded">LVL {lvl}</div>
    </div>
    <div className="flex justify-center -mt-8 md:-mt-10 relative z-10">
      <div className="p-1 bg-white rounded-xl md:rounded-2xl shadow-lg">
        <img src={image} alt={name} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-lg md:rounded-xl bg-gray-100" />
      </div>
    </div>
    <div className="text-center p-3 md:p-4">
      <h3 className="font-bold text-gray-800 text-sm md:text-base lg:text-lg mb-1">{name}</h3>
      <div className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase text-gray-500 bg-gray-100 px-1.5 md:px-2 py-0.5 rounded-full mb-2 md:mb-3">
        {icon} {role}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full ${color} w-[85%] group-hover:w-full transition-all duration-1000`}></div>
      </div>
    </div>
  </div>
);

const TechCard = ({ name, logoUrl, colorClass }) => (
  <div className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center justify-center gap-1.5 md:gap-2 hover:shadow-lg transition-all group min-h-[80px] md:min-h-[100px]">
    <div className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-50 rounded-md md:rounded-lg group-hover:bg-white`}>
      <img src={logoUrl} alt={name} className="w-full h-full object-contain p-0.5 md:p-1" />
    </div>
    <span className="font-bold text-gray-800 text-[10px] md:text-xs text-center leading-tight">{name}</span>
  </div>
);

const ProjectViewer = ({ activeProjectKey }) => {
  const project = projectsData[activeProjectKey];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef(null);
  
  const getBg = () => {
    if (!project) return null;
    if (project.bgType === 'snow') return <SnowEffect />;
    if (project.bgType === 'clouds') return <CloudEffect />;
    if (project.bgType === 'magia') return <MagiaBackground />;
  };

  const nextImage = () => {
    if (!project?.gameImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.gameImages.length);
  };

  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX, clientY) => {
    if (!isDragging || !dragStart) return;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 80;
    if (Math.abs(dragOffset.x) > threshold || Math.abs(dragOffset.y) > threshold) {
      nextImage();
    }
    
    setIsDragging(false);
    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <div className={`transition-all duration-700 ease-in-out overflow-hidden relative ${activeProjectKey ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="relative border-t-4 border-black min-h-[700px] bg-gray-900">
        {getBg()}
        
        {/* Contenedor principal */}
        <div className="relative z-10 max-w-6xl mx-auto py-5 md:py-8 lg:py-12 xl:py-20 px-3 md:px-4 pointer-events-none flex flex-col justify-between h-full">
          
          <div className="flex flex-col-reverse lg:flex-row gap-5 md:gap-6 lg:gap-16 items-center lg:items-start">
            
            {/* TEXTO / INFO */}
            <div className="flex-1 space-y-3 md:space-y-4 lg:space-y-6 w-full text-gray-200 pointer-events-auto">
              <div className="inline-block border-b-4 border-current pb-1.5 md:pb-2 mb-2 px-2 md:px-4">
                <h3 className="text-lg md:text-2xl lg:text-3xl xl:text-5xl font-serif font-black drop-shadow-md uppercase leading-tight">{project?.title}</h3>
                <p className={`font-mono text-[10px] md:text-xs lg:text-sm font-bold mt-0.5 md:mt-1 ${project?.accentColor}`}>{project?.subtitle}</p>
              </div>
              
              <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow-2xl">
                <p className="text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-relaxed">{project?.desc}</p>
                
                {/* STACK TECNOLÓGICO */}
                <div className="mt-3 md:mt-4 lg:mt-6 border-t border-white/20 pt-2 md:pt-3 lg:pt-4 flex gap-1.5 md:gap-2 lg:gap-3 flex-wrap">
                  {project?.techStack.map(t => (
                    <div key={t.name} className="flex items-center gap-1 md:gap-1.5 lg:gap-2 bg-black/40 backdrop-blur-sm px-1.5 md:px-2 lg:px-3 py-1 md:py-1 lg:py-1.5 rounded-md md:rounded-lg border border-white/10 shadow-sm">
                      <div className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-md p-0.5 flex items-center justify-center bg-white">
                        <img src={t.icon} className="w-full h-full object-contain" alt=""/>
                      </div>
                      <span className="text-gray-200 text-[9px] md:text-[10px] lg:text-xs font-bold font-mono">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECCIÓN DE GALERÍA (RENDERIZADO) */}
              {project?.gallery && project.gallery.length > 0 && (
                <div className="bg-black/50 p-2.5 md:p-3 lg:p-4 rounded-lg md:rounded-xl border border-white/10 overflow-x-auto">
                   <h4 className="text-[10px] md:text-xs font-bold uppercase mb-1.5 md:mb-2 flex items-center gap-2">Galería</h4>
                   <div className="flex gap-2 md:gap-3 lg:gap-4">
                     {project.gallery.map((media, i) => (
                        <div key={i} className="flex-shrink-0 w-24 h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 bg-black rounded overflow-hidden border border-white/30 relative group cursor-pointer hover:scale-105 transition-transform">
                           {media.type === 'image' ? (
                             <img src={media.url} className="w-full h-full object-cover" alt="Gallery"/>
                           ) : (
                             <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <Play size={16} className="text-white md:w-5 md:h-5"/>
                             </div>
                           )}
                        </div>
                     ))}
                   </div>
                </div>
              )}
              
              <button className={`flex items-center gap-1.5 md:gap-2 px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 rounded-lg md:rounded-xl font-black shadow-xl hover:scale-105 transition-all text-white w-full md:w-auto justify-center text-xs md:text-sm lg:text-base ${project?.btnColor}`}>
                <Download size={16} className="md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" /> DESCARGAR DEMO
              </button>
            </div>

            {/* VISUALES (Swipe Cards estilo Tinder) */}
            <div className="w-full lg:flex-1 flex flex-col items-center justify-center pointer-events-auto">
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-md">
                {/* Indicadores de progreso superiores */}
                {project?.gameImages && project.gameImages.length > 1 && (
                  <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-3 px-2">
                    {project.gameImages.map((_, i) => (
                      <div key={i} className="h-0.5 md:h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                        <div className={`h-full bg-white transition-all duration-300 ${i === currentImageIndex ? 'w-full' : 'w-0'}`}></div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Stack de imágenes */}
                <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                  {project?.gameImages?.map((img, i) => {
                    const isActive = i === currentImageIndex;
                    const isNext = i === (currentImageIndex + 1) % project.gameImages.length;
                    
                    if (!isActive && !isNext) return null;
                    
                    const rotation = isDragging && isActive ? dragOffset.x * 0.03 : 0;
                    const scale = isActive ? 1 : 0.95;
                    const opacity = isActive ? 1 : 0.5;
                    const zIndex = isActive ? 20 : 10;
                    
                    return (
                      <div
                        key={i}
                        ref={isActive ? imageRef : null}
                        className="absolute inset-0 touch-none select-none"
                        style={{
                          transform: isActive 
                            ? `translate(${isDragging ? dragOffset.x : 0}px, ${isDragging ? dragOffset.y : 0}px) rotate(${rotation}deg) scale(${scale})`
                            : `scale(${scale})`,
                          opacity: opacity,
                          zIndex: zIndex,
                          transition: isDragging ? 'none' : 'all 0.3s ease-out',
                          cursor: isActive ? 'grab' : 'default'
                        }}
                        onMouseDown={(e) => isActive && handleDragStart(e.clientX, e.clientY)}
                        onMouseMove={(e) => isDragging && handleDragMove(e.clientX, e.clientY)}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={(e) => isActive && handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchMove={(e) => isDragging && handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchEnd={handleDragEnd}
                      >
                        <div className="relative bg-white p-1.5 md:p-2 lg:p-3 pb-6 md:pb-8 lg:pb-10 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.5)] lg:shadow-[10px_10px_0px_rgba(0,0,0,0.5)] transform rotate-2 border-2 border-black h-full">
                          <div className="bg-black w-full h-full relative overflow-hidden border-2 border-black">
                            <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="absolute bottom-1 md:bottom-1.5 lg:bottom-2 left-0 w-full text-center font-pixel text-black text-[7px] md:text-[8px] lg:text-xs font-bold uppercase tracking-wider px-2 pointer-events-none">
                            {project?.title} - {currentImageIndex + 1}/{project?.gameImages?.length || 1}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Instrucciones de swipe */}
                {project?.gameImages && project.gameImages.length > 1 && (
                  <div className="text-center mt-2 md:mt-3 text-white/60 text-[10px] md:text-xs font-mono">
                    Arrastra para ver más →
                  </div>
                )}

                {/* Controles de navegación (opcional, para desktop) */}
                {project?.gameImages && project.gameImages.length > 1 && (
                  <div className="flex justify-center gap-1.5 md:gap-2 mt-2 md:mt-3">
                    {project.gameImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          i === currentImageIndex ? 'bg-white w-4 md:w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeProject, setActiveProject] = useState(null);
  const footerRef = useRef(null); 

  // --- USEEFFECT PARA EL COLOR DE LA BARRA, TITULO E ICONO ---
  useEffect(() => {
    // 1. Cambiar color de barra de navegador a blanco
    const metaThemeColor = document.querySelector("meta[name=theme-color]") || document.createElement('meta');
    metaThemeColor.name = "theme-color";
    metaThemeColor.content = "#ffffff";
    document.head.appendChild(metaThemeColor);

    // 2. Cambiar Título de la página
    document.title = "Desestima2 | Portfolio";

    // 3. Cambiar Icono (Favicon) - AHORA USA icono.png
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = iconoImg; // <--- AQUÍ SE USA LA NUEVA IMAGEN
  }, []);

  const toggleProject = (key) => {
    setActiveProject(prev => prev === key ? null : key);
    
    // AUMENTÉ EL TIEMPO A 800ms PARA ESPERAR LA ANIMACIÓN CSS (700ms)
    setTimeout(() => {
      // SI HAY PROYECTO ACTIVO, SCROLL HASTA EL FINAL (FOOTER)
      if (activeProject !== key) {
        footerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600); 
  };

  const isAnyActive = activeProject !== null;

  return (
    <div className="min-h-screen w-full font-sans bg-gray-50 text-gray-900 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-10 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-24 px-3 md:px-4 overflow-hidden">
        <FloatingStars />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-1 md:gap-1.5 lg:gap-2 bg-yellow-400 text-yellow-900 px-2 md:px-2.5 lg:px-3 py-0.5 md:py-1 rounded-full font-bold text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider mb-2 md:mb-3 lg:mb-4 border-2 border-black shadow-[2px_2px_0px_black] md:shadow-[3px_3px_0px_black] lg:shadow-[4px_4px_0px_black] animate-bounce">
              <Trophy size={9} className="md:w-2.5 md:h-2.5 lg:w-3 lg:h-3" /> 1° Puesto Game Jam UNJU
            </div>
            <h1 className="font-pixel text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-gray-900 mb-1.5 md:mb-2 lg:mb-3 drop-shadow-sm px-2">
              DESESTIMA<span className="text-indigo-600">2</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-sm lg:text-base px-4">Creamos experiencias inmersivas con código y pasión.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12 lg:mb-16 px-1 md:px-2">
            <MemberCard name="Amaru Segovia" lvl="22" role="Dev IA" icon={<Brain size={11}/>} color="bg-purple-500" image={amaruImg} />
            <MemberCard name="Candela Carrasco" lvl="24" role="UI/UX Art" icon={<Brush size={11}/>} color="bg-pink-500" image={candelaImg} />
            <MemberCard name="Milagros Sosa" lvl="24" role="3D & Anim" icon={<Monitor size={11}/>} color="bg-blue-500" image={neruImg} />
            <MemberCard name="Cristian Arraya" lvl="20" role="Dev Mecánicas" icon={<Code size={11}/>} color="bg-green-500" image={cristianImg} />
          </div>

          <div className="border-t border-gray-200 pt-6 md:pt-8 lg:pt-12">
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-3 md:mb-4 lg:mb-6 text-gray-400 font-mono text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest">
              <Layers size={10} className="md:w-3 md:h-3 lg:w-3.5 lg:h-3.5" /> Stack Tecnológico General
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-2.5 lg:gap-3 px-1 md:px-2">
              <TechCard name="Unreal 5" logoUrl={unreal} colorClass="bg-black" />
              <TechCard name="Unity 6" logoUrl={unity} colorClass="bg-gray-700" />
              <TechCard name="Blender" logoUrl={blender} colorClass="bg-orange-500" />
              <TechCard name="AseSprite" logoUrl={aseprite} colorClass="bg-blue-500" />
              <TechCard name="Clip Studio" logoUrl={clipstudio} colorClass="bg-pink-500" />
              <TechCard name="Git" logoUrl={git} colorClass="bg-orange-600" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PROYECTOS */}
      <section className="bg-gray-900 text-white py-10 md:py-12 lg:py-16 px-3 md:px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-5 md:mb-6 lg:mb-8 text-center md:text-left px-2">Nuestros Proyectos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {Object.values(projectsData).map((p) => {
              const isActive = activeProject === p.id;
              
              // Lógica de grises
              const containerClass = `
                group cursor-pointer rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-500 relative bg-gray-800
                ${isActive ? 'ring-2 md:ring-4 ring-indigo-500 scale-105 z-10 border-indigo-400 grayscale-0' : 'border-gray-700 hover:border-gray-500'}
                ${isAnyActive && !isActive ? 'grayscale opacity-60 scale-95 hover:grayscale-0 hover:opacity-100 hover:scale-100' : ''}
              `;

              return (
                <div 
                  key={p.id}
                  onClick={() => toggleProject(p.id)}
                  className={containerClass}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={p.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-2 md:bottom-3 lg:bottom-4 left-2 md:left-3 lg:left-4 right-2 md:right-3 lg:right-4">
                      <h3 className="font-bold text-sm md:text-base lg:text-lg leading-tight mb-0.5 md:mb-1 text-white drop-shadow-md">{p.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] md:text-[9px] lg:text-[10px] font-mono bg-white/20 backdrop-blur-md px-1 md:px-1.5 lg:px-2 py-0.5 rounded text-white">{p.subtitle}</span>
                        {isActive && <ChevronDown size={16} className="text-white animate-bounce md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"/>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectViewer activeProjectKey={activeProject} />

      <footer ref={footerRef} className="bg-black text-white py-6 md:py-8 border-t border-gray-900 text-center">
        <p className="font-pixel text-[8px] md:text-xs text-gray-500 px-4">© 2024 DESESTIMA2 • JUJUY, ARGENTINA</p>
      </footer>

      <style jsx>{`
        .snowflake { animation: fall linear infinite; }
        @keyframes fall { to { transform: translateY(150vh); } }
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        
        /* Animación Nubes */
        .clouds-animation {
          background-image: var(--cloud-url);
          background-size: 100px;
          filter: brightness(0) invert(1);
          animation: cloudsMove 60s linear infinite;
        }
        @keyframes cloudsMove {
          from { background-position: 0 0; }
          to { background-position: 1000px 500px; }
        }
        
        .pixel-art { image-rendering: pixelated; }
        
        /* Ocultar scrollbar pero mantener funcionalidad */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;