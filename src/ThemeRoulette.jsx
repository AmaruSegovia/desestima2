import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

// Temas reales de Game Jams (Ludum Dare, GMTK, etc.)
const themes = [
  "Polimorfismo", // Ludum Dare 56
  "Invocación", // Ludum Dare 55
  "Metamorfosis", // Ludum Dare 54
  "Cultura", // Ludum Dare 53
  "Roles invertidos", // GMTK 2023
  "Gatos", // GMTK 2024
  "Burbujas", // Clásico
  "Educación", // Popular
  "Construcción", // Ludum Dare 52
  "Tiempo", // GMTK 2020
  "Unido", // GMTK 2021
  "Aleatorio", // GMTK 2022
];

// Palabras clave que indican ambición excesiva (español argentino)
const dangerWords = {
  high: [
    // Multijugador y online
    "multijugador",
    "online",
    "multiplayer",
    "coop",
    "cooperativo",
    "en linea",
    "en línea",
    "pvp",
    "versus",
    "competitivo online",
    "servers",
    "servidor",
    "servidores",
    // Mundo abierto
    "open world",
    "mundo abierto",
    "sandbox",
    "exploración libre",
    "mapa gigante",
    "mapa enorme",
    "mapa grande",
    "mundo enorme",
    "mundo gigante",
    "mundo grande",
    // Géneros complejos
    "mmorpg",
    "rpg",
    "rol",
    "jrpg",
    "action rpg",
    "souls-like",
    "soulslike",
    "roguelike",
    "metroidvania",
    "battle royale",
    // 3D y gráficos complejos
    "3d",
    "realista",
    "fotorrealista",
    "ray tracing",
    "graficos realistas",
    "gráficos realistas",
    "hiperrealista",
    "ultra realista",
    // Historia y narrativa
    "historia compleja",
    "narrativa profunda",
    "historia profunda",
    "lore extenso",
    "varios finales",
    "múltiples finales",
    "multiples finales",
    "finales alternativos",
    "finales diferentes",
    "muchos finales",
    "distintos finales",
    "ramificaciones",
    "arbol de decisiones",
    "árbol de decisiones",
    "decisiones que importan",
    "elecciones morales",
    "historia ramificada",
    "narrativa no lineal",
    // Cantidades grandes
    "cientos",
    "miles",
    "100",
    "50",
    "muchos niveles",
    "muchas misiones",
    "muchos personajes",
    "muchos enemigos",
    "montón de",
    "un montón",
    "bocha de",
    "banda de",
    "mil",
    "infinitos",
    "infinito",
    "ilimitado",
    "ilimitados",
    // Cinemáticas y multimedia
    "cinematicas",
    "cinemáticas",
    "cutscenes",
    "escenas cinematográficas",
    "voice acting",
    "voces",
    "doblaje",
    "actuación de voz",
    "locutor",
    "banda sonora orquestal",
    "orquesta",
    "música original completa",
    // IA y física avanzada
    "inteligencia artificial avanzada",
    "ia compleja",
    "ia avanzada",
    "física realista",
    "simulación",
    "simulador",
    "sistema de física",
    // Crafting y sistemas complejos
    "crafting complejo",
    "crafteo avanzado",
    "sistema de crafteo",
    "arbol de habilidades",
    "árbol de habilidades",
    "skill tree",
    "clases de personaje",
    "builds",
    "especialización",
    "especializaciones",
    // Otros términos peligrosos
    "mod support",
    "soporte de mods",
    "editor de niveles",
    "level editor",
    "procedural",
    "generación procedural",
    "generacion procedural",
    "destrucción de escenarios",
    "todo destructible",
    "física destructible",
  ],
  medium: [
    // Inventario y sistemas
    "inventario",
    "inventory",
    "sistema de items",
    "equipamiento",
    "armas diferentes",
    "muchas armas",
    "arsenal",
    "armería",
    // Diálogos
    "diálogos",
    "dialogo",
    "dialogos",
    "conversaciones",
    "sistema de diálogos",
    "npc con dialogos",
    "charlar con npcs",
    // Guardado
    "sistema de guardado",
    "save system",
    "guardar partida",
    "checkpoints múltiples",
    "autoguardado complejo",
    // Power ups y mejoras
    "power ups",
    "powerups",
    "mejoras",
    "upgrades",
    "subir de nivel",
    "experiencia",
    "xp",
    "puntos de experiencia",
    "nivel del personaje",
    // Jefes y enemigos
    "jefe final",
    "boss",
    "bosses",
    "jefes",
    "mini boss",
    "miniboss",
    "enemigos diferentes",
    "tipos de enemigos",
    "variedad de enemigos",
    "enemigos únicos",
    "ia de enemigos",
    // Niveles y mundos
    "niveles",
    "levels",
    "mundos",
    "zonas",
    "áreas",
    "biomas",
    "niveles secretos",
    "mundo secreto",
    "areas ocultas",
    "áreas ocultas",
    // Personajes
    "personajes",
    "characters",
    "personajes jugables",
    "personajes desbloqueables",
    "skins",
    "customización",
    "personalización del personaje",
    // Animaciones
    "animaciones",
    "animations",
    "animaciones complejas",
    "mocap",
    "partículas",
    "efectos especiales",
    "vfx",
    "efectos visuales",
    // Tutorial
    "tutorial",
    "guía",
    "tutorial interactivo",
    "sistema de ayuda",
    // Misiones
    "misiones",
    "quests",
    "misiones secundarias",
    "side quests",
    "objetivos opcionales",
    "coleccionables",
    // Clima y tiempo
    "clima dinámico",
    "ciclo dia noche",
    "ciclo día noche",
    "día y noche",
    "estaciones",
    "clima cambiante",
    // Economía
    "economía",
    "tienda",
    "comprar y vender",
    "dinero",
    "monedas",
    "sistema económico",
  ],
  low: [
    // Puntuación básica
    "puntuación",
    "score",
    "puntos",
    "high score",
    "puntaje",
    "récord",
    "record",
    "mejor puntuación",
    "mejor puntaje",
    "combo",
    "multiplicador",
    "streak",
    "racha",
    "bonus",
    "puntos extra",
    // Menús y UI básica
    "menú",
    "menu",
    "menú principal",
    "pantalla de inicio",
    "main menu",
    "botón de play",
    "opciones",
    "settings",
    "configuración",
    "pantalla de carga",
    "loading screen",
    "splash screen",
    // Audio básico
    "sonidos",
    "música",
    "efectos de sonido",
    "sfx",
    "soundtrack",
    "música de fondo",
    "sonido ambiente",
    "audio",
    // Pausa
    "pausa",
    "pause",
    "pantalla de pausa",
    "pausar el juego",
    // Finales básicos
    "créditos",
    "creditos",
    "pantalla de fin",
    "game over",
    "you win",
    "victoria",
    "derrota",
    "win screen",
    "lose screen",
    // Controles
    "controles",
    "teclado",
    "mouse",
    "gamepad",
    "joystick",
    "touch",
    "controles táctiles",
    "rebindear",
    "remapear",
    // Básicos de gameplay
    "vidas",
    "corazones",
    "health bar",
    "barra de vida",
    "hp",
    "respawn",
    "checkpoint",
    "reiniciar",
    "restart",
    "timer",
    "tiempo límite",
    "cuenta regresiva",
    "countdown",
    // Visual básico
    "cámara",
    "camara",
    "zoom",
    "scroll",
    "parallax",
    "fondo",
    "background",
    "sprites",
    "pixel art",
    "pixelart",
    // Otros básicos
    "enemigo",
    "obstáculo",
    "plataforma",
    "moneda",
    "item",
    "colisión",
    "hitbox",
    "trigger",
    "spawn",
    "spawner",
    "random",
    "aleatorio",
    "procedural simple",
  ],
};

// Consejos para reducir el scope
const tips = [
  "💡 En vez de 'muchos niveles', pensá en UN nivel bien diseñado",
  "💡 El multijugador consume el 80% del tiempo. ¿Y si es single player?",
  "💡 Los modelos 3D llevan días. ¿Probaste con arte 2D simple?",
  "💡 Un boss final es genial, pero ¿y si el desafío es el tiempo?",
  "💡 Las cinemáticas son lindas pero no hacen al juego divertido",
  "💡 Un inventario simple: solo 3 items. O mejor, ninguno",
  "💡 ¿Sistema de guardado? En una jam, que se juegue de una sentada",
  "💡 La IA más efectiva es la más simple: patrullar y perseguir",
  "💡 Un juego de 2 minutos terminado > un juego de 2 horas incompleto",
  "💡 Si no podés explicar tu mecánica en 10 segundos, es muy compleja",
];

// Componente de la Ruleta
const RouletteWheel = ({ onSpinComplete, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedTheme(null);

    // Rotación aleatoria: mínimo 5 vueltas + posición random
    const spins = 5 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomAngle;

    setRotation(totalRotation);

    // Calcular tema seleccionado después de la animación
    setTimeout(() => {
      const normalizedAngle = totalRotation % 360;
      const segmentAngle = 360 / themes.length;
      const index = Math.floor(
        ((360 - normalizedAngle + segmentAngle / 2) % 360) / segmentAngle
      );
      const theme = themes[index % themes.length];

      setSelectedTheme(theme);
      setIsSpinning(false);
      onSpinComplete(theme);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      {/* Indicador */}
      <div className="text-yellow-400 text-2xl md:text-3xl">▼</div>

      {/* Ruleta - Tamaños responsive */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <div
          className="w-full h-full rounded-full border-4 border-yellow-400 overflow-hidden transition-transform duration-[4000ms] ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(from 0deg, 
              ${themes
                .map((_, i) => {
                  const colors = [
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#f59e0b",
                    "#10b981",
                    "#06b6d4",
                  ];
                  return `${colors[i % colors.length]} ${
                    (i / themes.length) * 100
                  }% ${((i + 1) / themes.length) * 100}%`;
                })
                .join(", ")}
            )`,
          }}
        >
          {/* Textos en la ruleta - posicionados al 65% del radio */}
          {themes.map((theme, i) => {
            const angle = (i * 360) / themes.length + 180 / themes.length;
            return (
              <div
                key={theme}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span
                  className="absolute text-white font-bold whitespace-nowrap text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px]"
                  style={{
                    top: "8%",
                    transform: "rotate(90deg)",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                    maxWidth: "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {theme.length > 13 ? theme.slice(0, 11) + "..." : theme}
                </span>
              </div>
            );
          })}
        </div>

        {/* Centro de la ruleta */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-gray-900 border-4 border-yellow-400 flex items-center justify-center">
            <Sparkles className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Botón de girar */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className={`
          flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base rounded-lg
          border-2 transition-all
          ${
            isSpinning
              ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-yellow-500 border-yellow-400 text-black hover:bg-yellow-400 active:scale-95"
          }
        `}
      >
        <RefreshCw size={18} className={isSpinning ? "animate-spin" : ""} />
        {isSpinning ? "Girando..." : "Girar Ruleta"}
      </button>

      {/* Tema seleccionado */}
      {selectedTheme && (
        <div className="text-center animate-pulse">
          <div className="text-gray-400 text-xs md:text-sm mb-1">
            Tu tema es:
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
            "{selectedTheme}"
          </div>
        </div>
      )}
    </div>
  );
};

// Componente del Scope Meter
const ScopeMeter = ({ text }) => {
  const analyzeScope = (input) => {
    const lowerInput = input.toLowerCase();
    let score = 0;
    let foundWords = [];

    dangerWords.high.forEach((word) => {
      if (lowerInput.includes(word)) {
        score += 16; // Reducido de 30
        foundWords.push({ word, severity: "high" });
      }
    });

    dangerWords.medium.forEach((word) => {
      if (lowerInput.includes(word)) {
        score += 8; // Reducido de 15
        foundWords.push({ word, severity: "medium" });
      }
    });

    dangerWords.low.forEach((word) => {
      if (lowerInput.includes(word)) {
        score += 2; // Reducido de 5
        foundWords.push({ word, severity: "low" });
      }
    });

    // Bonus por longitud excesiva
    if (input.length > 300) score += 10;
    if (input.length > 500) score += 15;

    return { score: Math.min(score, 100), foundWords };
  };

  const { score, foundWords } = analyzeScope(text);
  const isPassable = score < 40;

  const getStatus = () => {
    if (score < 20)
      return {
        label: "✅ ¡Perfecto!",
        color: "text-green-400",
        bg: "bg-green-500",
      };
    if (score < 40)
      return {
        label: "👍 Aceptable",
        color: "text-yellow-400",
        bg: "bg-yellow-500",
      };
    if (score < 70)
      return {
        label: "⚠️ Peligroso",
        color: "text-orange-400",
        bg: "bg-orange-500",
      };
    return { label: "💀 Imposible", color: "text-red-400", bg: "bg-red-500" };
  };

  const status = getStatus();

  return (
    <div className="space-y-3">
      {/* Barra de ambición */}
      <div className="bg-gray-800 border-2 border-gray-600 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="text-gray-400 font-medium">MEDIDOR DE AMBICIÓN</span>
          <span className={`font-bold ${status.color}`}>{status.label}</span>
        </div>

        <div className="relative h-4 bg-gray-900 rounded overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 transition-all duration-500 ${status.bg}`}
            style={{ width: `${score}%` }}
          />

          {/* Marcador de límite */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/50"
            style={{ left: "40%" }}
          />
        </div>

        <div className="flex justify-between mt-1 text-[10px] text-gray-500">
          <span>Simple</span>
          <span className="text-yellow-500">Límite →</span>
          <span>Imposible</span>
        </div>
      </div>

      {/* Palabras detectadas */}
      {foundWords.length > 0 && (
        <div className="bg-red-900/30 border border-red-600/50 p-3 rounded-lg">
          <div className="text-red-400 text-xs font-bold mb-2">
            ⚠️ Palabras peligrosas detectadas:
          </div>
          <div className="flex flex-wrap gap-1">
            {foundWords.slice(0, 6).map((item, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded ${
                  item.severity === "high"
                    ? "bg-red-800 text-red-200"
                    : item.severity === "medium"
                    ? "bg-orange-800 text-orange-200"
                    : "bg-yellow-800 text-yellow-200"
                }`}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resultado */}
      {text.length > 10 && (
        <div
          className={`p-3 rounded-lg border-2 ${
            isPassable
              ? "bg-green-900/30 border-green-600"
              : "bg-red-900/30 border-red-600"
          }`}
        >
          {isPassable ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">
                ¡Podés continuar! Tu idea es alcanzable.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle size={18} />
              <span className="text-sm font-medium">
                Muy ambicioso. Simplificá tu idea.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente principal
const ThemeRoulette = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("roulette"); // 'roulette' | 'writing'
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [ideaText, setIdeaText] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [timerActive, setTimerActive] = useState(false);
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const textareaRef = useRef(null);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Cambiar tip cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSpinComplete = (theme) => {
    setSelectedTheme(theme);
  };

  const startWriting = () => {
    setPhase("writing");
    setTimerActive(true);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleRetry = () => {
    setPhase("roulette");
    setSelectedTheme(null);
    setIdeaText("");
    setTimeLeft(300);
    setTimerActive(false);
  };

  const analyzeAndProceed = () => {
    const lowerInput = ideaText.toLowerCase();
    let score = 0;

    dangerWords.high.forEach((word) => {
      if (lowerInput.includes(word)) score += 20;
    });
    dangerWords.medium.forEach((word) => {
      if (lowerInput.includes(word)) score += 8;
    });
    dangerWords.low.forEach((word) => {
      if (lowerInput.includes(word)) score += 3;
    });

    // Guardar datos en localStorage
    const workshopData = JSON.parse(
      localStorage.getItem("workshopData") || "{}"
    );
    workshopData.theme = selectedTheme;
    workshopData.idea = ideaText;
    workshopData.scopeScore = Math.min(score, 100);
    localStorage.setItem("workshopData", JSON.stringify(workshopData));

    if (score < 40) {
      navigate("/simulador-inversion");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const canProceed =
    ideaText.length > 20 &&
    (() => {
      const lowerInput = ideaText.toLowerCase();
      let score = 0;
      dangerWords.high.forEach((word) => {
        if (lowerInput.includes(word)) score += 30;
      });
      dangerWords.medium.forEach((word) => {
        if (lowerInput.includes(word)) score += 15;
      });
      return score < 40;
    })();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fondo */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 border-b-2 border-purple-600 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-3 py-2.5 flex items-center justify-between">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors no-underline text-sm"
          >
            ← Volver
          </Link>

          <div className="text-purple-300 flex items-center gap-1.5 text-sm font-medium">
            <Sparkles size={16} />
            Paso 1 de 4
          </div>

          {phase === "writing" && (
            <div
              className={`flex items-center gap-1 font-bold text-sm ${
                timeLeft < 30 ? "text-red-400 animate-pulse" : "text-yellow-400"
              }`}
            >
              <Clock size={16} />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
      </header>

      {/* Contenido principal - más ancho en PC */}
      <main className="max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto px-3 md:px-6 py-6">
        {phase === "roulette" ? (
          <>
            {/* Fase de ruleta */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                🎰 Ruleta de Temas
              </h1>
              <p className="text-gray-400 text-sm">
                Girá la ruleta para obtener tu tema de Game Jam
              </p>
            </div>

            <RouletteWheel
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />

            {selectedTheme && !isSpinning && (
              <div className="mt-6 text-center">
                <button
                  onClick={startWriting}
                  className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-600 border-2 border-purple-400 text-white font-bold rounded-lg hover:bg-purple-500 active:scale-95 transition-all"
                >
                  Escribir mi idea
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Fase de escritura - Layout más amplio para PC */}
            <div className="text-center mb-4 md:mb-6">
              <div className="text-gray-400 text-xs md:text-sm mb-1">
                Tu tema es:
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-yellow-400 mb-2">
                "{selectedTheme}"
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Describí tu idea de juego en 5 minutos
              </p>
            </div>

            {/* Grid para PC: Textarea + Ayuda lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Columna izquierda: Textarea */}
              <div>
                <textarea
                  ref={textareaRef}
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  placeholder="Mi juego es un... donde el jugador... La mecánica principal es..."
                  className="w-full h-40 md:h-56 p-3 md:p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white text-sm md:text-base placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                  disabled={timeLeft <= 0}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{ideaText.length} caracteres</span>
                  <span>Mínimo 20 caracteres</span>
                </div>
              </div>

              {/* Columna derecha: Ayuda con preguntas clave */}
              <div className="bg-purple-900/30 border border-purple-600/50 p-3 md:p-4 rounded-lg">
                <h3 className="text-purple-300 font-bold text-sm md:text-base mb-3 flex items-center gap-2">
                  💡 Preguntas para guiarte:
                </h3>
                <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">▸</span>
                    <span>
                      ¿Qué <strong className="text-white">género</strong> es?
                      (plataformas, puzzle, shooter...)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">▸</span>
                    <span>
                      ¿Cuál es la{" "}
                      <strong className="text-white">mecánica principal</strong>
                      ? (saltar, disparar, esquivar...)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">▸</span>
                    <span>
                      ¿Cómo se relaciona con el{" "}
                      <strong className="text-white">tema</strong>?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">▸</span>
                    <span>
                      ¿Qué lo hace{" "}
                      <strong className="text-white">divertido</strong>?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">▸</span>
                    <span>
                      ¿Cuál es el{" "}
                      <strong className="text-white">objetivo</strong> del
                      jugador?
                    </span>
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-purple-600/30">
                  <p className="text-purple-200 text-xs italic">
                    Tip: Una buena idea se puede explicar en 2-3 oraciones.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Meter */}
            <div className="mt-4">
              <ScopeMeter text={ideaText} />
            </div>

            {/* Tip dinámico */}
            <div className="mt-4 bg-indigo-900/30 border border-indigo-600/50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb
                  size={16}
                  className="text-yellow-400 mt-0.5 flex-shrink-0"
                />
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  {currentTip}
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 active:scale-95 transition-all"
              >
                <RefreshCw size={16} />
                Reintentar
              </button>

              <button
                onClick={analyzeAndProceed}
                disabled={!canProceed}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-lg border-2 transition-all ${
                  canProceed
                    ? "bg-green-600 border-green-400 text-white hover:bg-green-500 active:scale-95"
                    : "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continuar
                <ArrowRight size={16} />
              </button>
            </div>

            {!canProceed && ideaText.length > 20 && (
              <p className="text-center text-red-400 text-xs mt-2">
                ⚠️ Simplificá tu idea para poder continuar
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ThemeRoulette;
