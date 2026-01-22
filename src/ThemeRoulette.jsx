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

// Temas reales de Game Jams (Ludum Dare, GMTK, etc.) - CORTOS
const themes = [
  "Polimorfismo",
  "Invocación",
  "Metamorfosis",
  "Cultura",
  "Roles Invert.",
  "Gatos",
  "Burbujas",
  "Educación",
  "Construcción",
  "Tiempo",
  "Unido",
  "Aleatorio",
];

// Helper para normalizar texto (quitar tildes y diéresis)
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Palabras clave que indican ambición excesiva (español argentino)
const dangerWords = {
  high: [
    // Multijugador y online
    "gigantesco",
    "masivo",
    "épico",
    "definitivo",
    "next gen",
    "nivel AAA",
    "calidad AAA",
    "como GTA",
    "como Dark Souls",
    "como Skyrim",
    "tipo Elden Ring",
    "multijugador",
    "online",
    "multiplayer",
    "coop",
    "cooperativo",
    "en linea",
    "en línea",
    "pvp",
    "versus",
    "mmo",
    "competitivo online",
    "servers",
    "servidor",
    "servidores",
    "crossplay",
    "netcode",
    "rollback netcode",
    "servidores dedicados",
    "matchmaking",
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
    "universo infinito",
    "galaxias",
    "planetas explorables",
    "ecosistema vivo",
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
    "moba",
    "rts",
    "simulador realista",
    "grand strategy",
    // 3D y gráficos complejos
    "3d",
    "realista",
    "fotorrealista",
    "ray tracing",
    "graficos realistas",
    "gráficos realistas",
    "hiperrealista",
    "ultra realista",
    "nanite",
    "lumen",
    "re real",
    "como la vida misma",
    "graficazos",
    "texturas 4k",
    "8k",
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
    "guion extendido",
    // Cantidades grandes
    "cientos",
    "miles",
    "100",
    "50",
    "ilimitado",
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
    "sistema de niveles",
    "procedimental",
    "generación procedural",
    // Plataformas y Online (Originales)
    "tecnología propia",
    "engine nuevo",
    "esports",
    "competitivo profesional",
    "multiplataforma simúltaneo",
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
    "destructible",
    "base de datos",
    "backend",
    "api",
    "networking",
    "netcode",
    "lag compensation",
    "matchmaking",
    "ranking",
    "leaderboard",
    "machine learning",
    "neural network",
    "vr game",
    "realidad virtual",
    "ar game",
    "realidad aumentada",
    "cross-platform",
    "multiplataforma",
    "steam",
    "publicar en steam",
    "early access",
    "dlc",
    "contenido descargable",
    "seasons",
    "temporadas",
    "battle pass",
    "pase de batalla",
    "microtransacciones",
    "tienda ingame",
    "loot boxes",
    "gacha",
    "mundo compartido",
    "co-op online",
    "online persistente",
    "servidor dedicado",
    "anticheat",
    "crossplay",
    "latencia baja",
    "sin lag",
    "pathfinding",
    "MMO",
    "destructible",
    "blockchain",
    "playstation 5",
    "ps5",
    "xbox",
    "competitivo",
    "esports",
    "esport",
    "mundo infinito",
    "simulacion de agua",
    "trading",
    "reconocimiento de voz",
    "reconocimiento facial",
    "skins",
  ],
  medium: [
    // Sistemas
    "sistema de combate",
    "tipos",
    "combos",
    "habilidades activas",
    "cooldowns",
    "dash",
    "parry",
    "esquivar",
    "patrones de ataque",
    "enemigos élite",
    "oleadas",
    "spawn dinámico",
    "ia simple",
    "ia básica",
    "stamina",
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
    "crafteo",
    "crafting",
    "personalización",
    "customización",
    "skins",
    "tienda",
    "shopping",
    "comprar cosas",
    "mochila",
    "loot",
    "looteo",
    "sistema de niveles",
    "experiencia",
    "xp",
    "experiencia",
    // Diálogos y personajes
    "diálogos",
    "conversaciones",
    "npc",
    "personajes secundarios",
    "aliados",
    "mascotas",
    "pets",
    "compañeros",
    "clases de personaje",
    "facciones",
    "reputación",
    "honor",
    // Mundo y ambiente
    "clima dinámico",
    "ciclo dia noche",
    "estaciones",
    "destrucción",
    "todo destructible",
    "física",
    "gravedad",
    "vehículos",
    "manejar",
    "autos",
    "volar",
    "aviones",
    "naves",
    "monturas",
    "caballos",
    "niveles secretos",
    "biomas",
    "mazmorras",
    "dungeons",
    "bosques",
    "ciudades gigantes",
    "pueblos",
    // Metas y UX
    "jefe final",
    "boss",
    "jefes",
    "miniboss",
    "quests",
    "misiones secundarias",
    "logros",
    "achievements",
    "trofeos",
    "medallas",
    "ranking",
    "leaderboard",
    "tabla de posiciones",
    "tutorial interactivo",
    "guía",
    "ayuda",
    "misiones opcionales",
    // Otros Medium (Originales)
    "mini boss",
    "miniboss",
    "enemigos diferentes",
    "tipos de enemigos",
    "variedad de enemigos",
    "enemigos únicos",
    "ia de enemigos",
    "niveles",
    "levels",
    "mundos",
    "zonas",
    "áreas",
    "biomas",
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
    // Básico
    "puntos",
    "score",
    "puntaje",
    "vidas",
    "health bar",
    "barra de vida",
    "corazones",
    "reintentar",
    "retry",
    "game over",
    "victoria",
    "ganar",
    "perder",
    "pausa",
    "menu",
    "sonidos",
    "musica",
    "musiquita",
    "sfx",
    "pantalla",
    "colores",
    "sprites",
    "animaciones",
    "vfx",
    "particulas",
    "un nivel",
    "un par de enemigos",
    "simple",
    // Coloquiales / No técnicos
    "lindo",
    "piola",
    "copado",
    "buenísimo",
    "buenisimo",
    "genial",
    "divertido",
    "entretener",
    "pasar el rato",
    "fácil",
    "difícil",
    "desafiante",
    "mucho",
    "todo",
    "grande",
    "mejor",
    "peor",
    "increíble",
    "asombroso",
    "que se mueva",
    "que salte",
    "que dispare",
    "que pegue",
    "boludeces",
    "cositas",
    "detalles",
    "gráficos",
    "dibujitos",
    "muñequitos",
    "skins",
    // Otros Low (Originales)
    "mecánica principal",
    "mecánica simple",
    "reglas claras",
    "objetivo claro",
    "estilo minimalista",
    "colores planos",
    "silhuetas claras",
    "sprites 2D",
    "animaciones 2D",
    "puntuación",
    "score",
    "puntos",
    "high score",
    "puntaje",
    "récord",
    "record",
    "mejor puntuación",
    "mejor puntaje",
    "multiplicador",
    "streak",
    "racha",
    "bonus",
    "puntos extra",
    // Menús y UI básica
    "menú",
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
    "gamepad",
    "joypad",
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
    "2D",
    "graficos 2d",
    "novela visual",
    "clicker",
    "plataformero",
    "top down",
    "top-down",
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
      // Cálculo simplificado: el ángulo que queda arriba es (360 - rotación) % 360
      const wheelAngleAtTop = (360 - normalizedAngle) % 360;
      const index = Math.floor(wheelAngleAtTop / segmentAngle);
      const theme = themes[index % themes.length];

      setSelectedTheme(theme);
      setIsSpinning(false);
      window.dispatchEvent(new CustomEvent("workshop-confetti"));
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
          {/* Textos en la ruleta - posicionados desde el centro hacia afuera */}
          {themes.map((theme, i) => {
            const angle = (i * 360) / themes.length + 180 / themes.length;
            return (
              <div
                key={theme}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute left-1/2 text-white font-semibold text-[7px] sm:text-[8px] md:text-[9px] lg:text-[11px]"
                  style={{
                    top: "12%",
                    transform: "translateX(-50%) rotate(90deg)",
                    textShadow:
                      "1px 1px 2px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.6)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {theme}
                </div>
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

// Función helper para detectar palabras completas (evita que 'miles' detecte 'mil')
const matchWholeWord = (text, word) => {
  // Escapar caracteres especiales de regex
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "i");
  return regex.test(text);
};

const analyzeScope = (input, theme = null) => {
  if (!input || input.length < 5)
    return { score: 0, foundWords: [], themeDetected: false };

  // Normalizamos input para la comparación
  const normalizedInput = normalizeText(input);
  const normalizedTheme = normalizeText(theme);

  let score = 0;
  let foundWords = [];
  let themeDetected = false;

  dangerWords.high.forEach((word) => {
    const normalizedWord = normalizeText(word);
    if (matchWholeWord(normalizedInput, normalizedWord)) {
      score += 16;
      foundWords.push({ word, severity: "high" });
    }
  });

  dangerWords.medium.forEach((word) => {
    const normalizedWord = normalizeText(word);
    if (matchWholeWord(normalizedInput, normalizedWord)) {
      score += 8;
      foundWords.push({ word, severity: "medium" });
    }
  });

  dangerWords.low.forEach((word) => {
    const normalizedWord = normalizeText(word);
    if (matchWholeWord(normalizedInput, normalizedWord)) {
      score += 2;
      foundWords.push({ word, severity: "low" });
    }
  });

  // Bonus por longitud excesiva
  if (input.length > 300) score += 10;
  if (input.length > 500) score += 15;

  // Penalización por cantidad de palabras: 1 punto cada 5 palabras
  const wordCount = input
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  score += Math.floor(wordCount / 5);

  // Detección de tema (accent-insensitive)
  if (theme && normalizedInput.includes(normalizedTheme)) {
    themeDetected = true;
  }

  return { score: Math.min(score, 100), foundWords, themeDetected };
};

const ScopeCoach = ({ score }) => {
  const getCoachState = () => {
    if (score === 0)
      return {
        emoji: "😄",
        msg: "¿Qué vamos a romper hoy?",
        color: "text-green-300",
      };
    if (score < 7)
      return {
        emoji: "🙂",
        msg: "Todo bajo control. Esto es una jam, no la pelicula del señor de los anillos",
        color: "text-green-400",
      };
    if (score < 14)
      return {
        emoji: "🤔",
        msg: "Mmm... todavía sigo creyendo en vos...",
        color: "text-green-400",
      };
    if (score < 21)
      return {
        emoji: "😅",
        msg: "¿De verdad hace falta esa mecánica?",
        color: "text-yellow-400",
      };
    if (score < 28)
      return {
        emoji: "🧐",
        msg: "No te lo quiero decir pero... esto ya no entra en un fin de semana.",
        color: "text-yellow-500",
      };
    if (score < 35)
      return {
        emoji: "😐",
        msg: "Acordate: cada idea nueva es un bug que todavía no conocés.",
        color: "text-orange-400",
      };
    if (score < 42)
      return {
        emoji: "😬",
        msg: "La PC esta pidiendo 2 modulos de RAM de 32GB extras",
        color: "text-orange-500",
      };
    if (score < 49)
      return {
        emoji: "😟",
        msg: "Esto huele a tres meses de laburo y deuda técnica incluida.",
        color: "text-red-400",
      };
    if (score < 56)
      return {
        emoji: "😨",
        msg: "¿Vas a programar con las manos y los pies al mismo tiempo?",
        color: "text-red-500",
      };
    if (score < 64)
      return {
        emoji: "😱",
        msg: "¡PARÁ! ¡PARÁ UN POCO! Nadie pidió un juego así en una jam.",
        color: "text-red-600",
      };
    if (score < 73)
      return {
        emoji: "🥵",
        msg: "Estoy viendo commits a las 5 AM que dicen 'fix del fix del fix finalfinal'",
        color: "text-red-700",
      };
    if (score < 82)
      return {
        emoji: "😵‍💫",
        msg: "Veo bugs... veo bugs heredados por generaciones.",
        color: "text-purple-400",
      };
    if (score < 91)
      return {
        emoji: "🤕",
        msg: "Mi estabilidad emocional depende de que borres una mecánica. Solo una.",
        color: "text-purple-500",
      };
    if (score < 100)
      return {
        emoji: "☣️",
        msg: "RIESGO CRÍTICO: Ni con todas las IAs trabajando en simultaneo haces esto en una semana",
        color: "text-purple-600",
      };
    return {
      emoji: "💀",
      msg: "[COACH HA DEJADO LA EXISTENCIA] No fallaste la jam. La jam falló en contenerte.",
      color: "text-gray-400",
    };
  };

  const state = getCoachState();

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl transition-all duration-300">
      <div className="text-4xl mb-1 animate-bounce">{state.emoji}</div>
      <div
        className={`text-[10px] uppercase font-black text-center ${state.color} leading-tight`}
      >
        Coach de Scope dice:
      </div>
      <div className="text-white text-xs text-center font-medium italic">
        "{state.msg}"
      </div>
    </div>
  );
};

// Componente del Scope Meter
const ScopeMeter = ({ text, theme }) => {
  const { score, themeDetected } = analyzeScope(text, theme);
  const writingPhase = localStorage.getItem("writingPhase") || "bad";
  const isPassable = writingPhase === "good" ? score < 40 : score >= 40;

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
      {/* Achievements Listener Secret logic */}
      {(() => {
        if (typeof window === "undefined") return null;

        // Logro: Monstruo de la Ambición
        if (
          writingPhase === "bad" &&
          score >= 100 &&
          !localStorage.getItem("achievement_monster")
        ) {
          localStorage.setItem("achievement_monster", "true");
          window.dispatchEvent(
            new CustomEvent("workshop-achievement", {
              detail: {
                icon: "👹",
                title: "Monstruo de la Ambición",
                desc: "Tu mala idea es legendaria.",
              },
            })
          );
        }

        // Logro nuevo: Coach Killer
        if (score >= 105 && !localStorage.getItem("achievement_killer")) {
          localStorage.setItem("achievement_killer", "true");
          window.dispatchEvent(
            new CustomEvent("workshop-achievement", {
              detail: {
                icon: "💀",
                title: "Asesino de Coaches",
                desc: "Mataste al Coach de tanto scope.",
              },
            })
          );
        }

        // Logro: Maestro de la Síntesis
        if (
          writingPhase === "good" &&
          score < 25 &&
          score > 0 &&
          !localStorage.getItem("achievement_synthesis")
        ) {
          localStorage.setItem("achievement_synthesis", "true");
          window.dispatchEvent(
            new CustomEvent("workshop-achievement", {
              detail: {
                icon: "🎯",
                title: "Maestro de la Síntesis",
                desc: "Scope perfecto para una Jam.",
              },
            })
          );
        }

        // Logro nuevo: Idea Machine (Escribir tu idea)
        if (
          writingPhase === "good" &&
          text.length > 30 &&
          !localStorage.getItem("achievement_ideamachine")
        ) {
          localStorage.setItem("achievement_ideamachine", "true");
          window.dispatchEvent(
            new CustomEvent("workshop-achievement", {
              detail: {
                icon: "💡",
                title: "Máquina de Ideas",
                desc: "¡Esa idea tiene potencial real!",
              },
            })
          );
          window.dispatchEvent(new CustomEvent("workshop-confetti"));
        }

        // Logro nuevo: Theme Visionary (🔮)
        if (
          themeDetected &&
          !localStorage.getItem("achievement_theme_visionary")
        ) {
          localStorage.setItem("achievement_theme_visionary", "true");
          window.dispatchEvent(
            new CustomEvent("workshop-achievement", {
              detail: {
                icon: "🔮",
                title: "Visionario Táctico",
                desc: "¡Usaste el tema de la ruleta magistralmente!",
              },
            })
          );
        }

        return null;
      })()}

      {/* Barra de ambición */}
      <div className="bg-gray-800 border-2 border-gray-600 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="text-gray-400 font-medium tracking-tight">
            {writingPhase === "bad"
              ? "🔥 MEDIDOR DE AMBICIÓN (¡SUBILO!)"
              : "⚖️ MEDIDOR DE AMBICIÓN"}
          </span>
          <span className={`font-bold ${status.color}`}>{status.label}</span>
        </div>

        <div className="relative h-4 bg-gray-900 rounded overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 transition-all duration-500 ${status.bg}`}
            style={{ width: `${score}%` }}
          />
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

      {/* Coach y Feedback */}
      <div className="grid grid-cols-2 gap-3 items-stretch">
        <ScopeCoach score={score} />

        <div
          className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 ${
            themeDetected
              ? "bg-green-900/30 border-green-600/50"
              : "bg-gray-800/30 border-gray-700"
          }`}
        >
          <div
            className={`text-xl mb-1 ${
              themeDetected ? "grayscale-0" : "grayscale opacity-30"
            }`}
          >
            ✨
          </div>
          <div
            className={`text-[10px] font-bold uppercase ${
              themeDetected ? "text-green-400" : "text-gray-500"
            }`}
          >
            Tema Detectado
          </div>
          <div
            className={`text-xs ${
              themeDetected ? "text-white font-bold" : "text-gray-600"
            }`}
          >
            "{theme}"
          </div>
        </div>
      </div>

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
                {writingPhase === "bad"
                  ? "¡Excelente! Esta idea es una pesadilla de desarrollo."
                  : "¡Perfecto! Tu idea es alcanzable."}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle size={18} />
              <span className="text-sm font-medium">
                {writingPhase === "bad"
                  ? "¡Falta ambición! Hacelo más IMPOSIBLE."
                  : "Muy ambicioso. Simplificá tu idea."}
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
  const [writingPhase, setWritingPhase] = useState("bad"); // 'bad' | 'good'
  const [timeLeft, setTimeLeft] = useState(180); // 3 mins iniciales para mala idea
  const [timerActive, setTimerActive] = useState(false);
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const textareaRef = useRef(null);

  // Sync phase with localStorage for ScopeMeter
  useEffect(() => {
    localStorage.setItem("writingPhase", writingPhase);
  }, [writingPhase]);

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
    setWritingPhase("bad");
    setTimeLeft(180); // 3 minutos para la mala idea
    setTimerActive(true);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleRetry = () => {
    setPhase("roulette");
    setSelectedTheme(null);
    setIdeaText("");
    setTimeLeft(600);
    setTimerActive(false);
  };
  const analyzeAndProceed = () => {
    const { score } = analyzeScope(ideaText, selectedTheme);

    // Obtener datos actuales
    const workshopData = JSON.parse(
      localStorage.getItem("workshopData") || "{}"
    );

    if (writingPhase === "bad") {
      if (score >= 40) {
        // Guardar mala idea
        workshopData.badIdea = ideaText;
        workshopData.badIdeaScore = Math.min(score * 1.5, 200); // Inflamos un poco para mas drama
        localStorage.setItem("workshopData", JSON.stringify(workshopData));

        // Pasar a la buena idea con efecto
        window.dispatchEvent(new CustomEvent("workshop-confetti"));
        setWritingPhase("good");
        setIdeaText("");
        setTimeLeft(600); // 10 minutos para la buena
      }
    } else {
      if (score < 40) {
        // Guardar buena idea
        workshopData.theme = selectedTheme;
        workshopData.idea = ideaText;
        workshopData.scopeScore = Math.min(score, 100);
        localStorage.setItem("workshopData", JSON.stringify(workshopData));

        window.dispatchEvent(new CustomEvent("workshop-confetti"));
        navigate("/simulador-inversion");
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const { score } = analyzeScope(ideaText, selectedTheme);

  const canProceed =
    ideaText.length > 20 && (writingPhase === "bad" ? score >= 40 : score < 40);

  // Screen shake effect for high scope
  const shakeClass =
    writingPhase === "bad" && score > 70 ? "animate-shake" : "";
  const bgIntensity = score / 100;

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white transition-colors duration-500`}
    >
      {/* Glow de fondo dinámico */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at center, rgba(239, 68, 68, ${
            bgIntensity * 0.15
          }) 0%, transparent 70%)`,
          opacity: score > 40 ? 1 : 0,
        }}
      />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
          20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
        }
        .animate-shake {
          animation: shake 0.5s infinite;
        }
      `}</style>
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
            Paso 1 de 3
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
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                {writingPhase === "bad"
                  ? "🧠 Fase 1: El Monstruo de la Ambición"
                  : "✨ Fase 2: Tu Idea MVP"}
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                {writingPhase === "bad"
                  ? "Escribí la idea más imposible y gigante que se te ocurra."
                  : "Ahora simplificalo al máximo. ¿Qué es lo mínimo que necesitás?"}
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
                  placeholder={
                    writingPhase === "bad"
                      ? "Ej: Un MMO open-world con realismo extremo, 1000 jugadores y blockchain..."
                      : "Ej: Un plataformero de 1 nivel donde el personaje cambia de color..."
                  }
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
                  <Lightbulb size={18} />
                  {writingPhase === "bad"
                    ? "Cómo hacerla MÁS imposible:"
                    : "Preguntas para guiarte:"}
                </h3>
                <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
                  {(writingPhase === "bad"
                    ? [
                        "¿Tiene multijugador masivo?",
                        "¿Es mundo abierto infinito?",
                        "¿Tiene gráficos fotorrealistas?",
                        "¿Usa IA compleja o red neuronal?",
                        "¿Tiene mil niveles y cinemáticas?",
                      ]
                    : [
                        "¿Cuál es la mecánica principal?",
                        "¿Cómo se gana o se pierde?",
                        "¿Cómo se controla el personaje?",
                        "¿Qué es lo más simple que podés hacer?",
                        "¿Se puede terminar en una tarde?",
                      ]
                  ).map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-purple-600/30">
                  <p className="text-purple-200 text-xs italic text-center">
                    {writingPhase === "bad"
                      ? "Tip: ¡No te guardes nada, queremos el caos!"
                      : "Tip: Una buena idea se puede explicar en 2-3 oraciones."}
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Meter */}
            <div className={`mt-4 ${shakeClass}`}>
              <ScopeMeter text={ideaText} theme={selectedTheme} />
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
                    ? "bg-purple-600 border-purple-400 text-white hover:bg-purple-500 active:scale-95 shadow-lg shadow-purple-900/20"
                    : "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
                }`}
              >
                {writingPhase === "bad"
                  ? "Subir Mala Idea"
                  : "Continuar Taller"}
                <ArrowRight size={16} />
              </button>
            </div>

            {!canProceed && ideaText.length > 20 && (
              <p className="text-center text-red-400 text-xs mt-2 font-bold animate-pulse">
                {writingPhase === "bad"
                  ? "⚠️ ¡Necesitamos más ambición! Alcanza el estado Imposible."
                  : "⚠️ Simplificá tu idea para poder continuar."}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ThemeRoulette;
