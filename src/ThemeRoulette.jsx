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

// Temas de ejemplo para la ruleta
const themes = [
  "Solo un botón",
  "Bajo el agua",
  "Caos controlado",
  "Lo pequeño es grande",
  "Bucle infinito",
  "Sin gravedad",
  "Tiempo limitado",
  "Todo al revés",
  "Minimalismo",
  "Conexión",
  "Supervivencia",
  "Exploración",
];

// Palabras clave que indican ambición excesiva
const dangerWords = {
  high: [
    "multijugador",
    "online",
    "multiplayer",
    "coop",
    "cooperativo",
    "open world",
    "mundo abierto",
    "sandbox",
    "mmorpg",
    "rpg",
    "rol",
    "realista",
    "3d",
    "fotorrealista",
    "historia compleja",
    "narrativa profunda",
    "cientos",
    "miles",
    "100",
    "50",
    "muchos niveles",
    "cinematicas",
    "cinemáticas",
    "cutscenes",
    "voice acting",
    "voces",
    "doblaje",
    "inteligencia artificial avanzada",
    "ia compleja",
    "física realista",
    "simulación",
    "crafting complejo",
    "crafteo avanzado",
  ],
  medium: [
    "inventario",
    "inventory",
    "diálogos",
    "dialogo",
    "conversaciones",
    "sistema de guardado",
    "save system",
    "power ups",
    "powerups",
    "mejoras",
    "jefe final",
    "boss",
    "bosses",
    "enemigos diferentes",
    "tipos de enemigos",
    "niveles",
    "levels",
    "mundos",
    "personajes",
    "characters",
    "animaciones",
    "animations",
    "partículas",
    "efectos especiales",
    "tutorial",
    "guía",
  ],
  low: [
    "puntuación",
    "score",
    "puntos",
    "menú",
    "menu",
    "sonidos",
    "música",
    "pausa",
    "pause",
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
    <div className="flex flex-col items-center gap-4">
      {/* Indicador */}
      <div className="text-yellow-400 text-2xl">▼</div>

      {/* Ruleta */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
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
          {/* Textos en la ruleta */}
          {themes.map((theme, i) => {
            const angle = (i * 360) / themes.length + 180 / themes.length;
            return (
              <div
                key={theme}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span
                  className="absolute text-white text-[8px] sm:text-[10px] font-bold whitespace-nowrap"
                  style={{
                    transform: `translateY(-90px) rotate(90deg)`,
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  {theme.length > 12 ? theme.slice(0, 10) + "..." : theme}
                </span>
              </div>
            );
          })}
        </div>

        {/* Centro de la ruleta */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-yellow-400 flex items-center justify-center">
            <Sparkles className="text-yellow-400" size={24} />
          </div>
        </div>
      </div>

      {/* Botón de girar */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className={`
          flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-lg
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
          <div className="text-gray-400 text-xs mb-1">Tu tema es:</div>
          <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
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
        score += 30;
        foundWords.push({ word, severity: "high" });
      }
    });

    dangerWords.medium.forEach((word) => {
      if (lowerInput.includes(word)) {
        score += 15;
        foundWords.push({ word, severity: "medium" });
      }
    });

    dangerWords.low.forEach((word) => {
      if (lowerInput.includes(word)) {
        score += 5;
        foundWords.push({ word, severity: "low" });
      }
    });

    // Bonus por longitud excesiva
    if (input.length > 200) score += 20;
    if (input.length > 300) score += 20;

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
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos
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
    setTimeLeft(120);
    setTimerActive(false);
  };

  const analyzeAndProceed = () => {
    const lowerInput = ideaText.toLowerCase();
    let score = 0;

    dangerWords.high.forEach((word) => {
      if (lowerInput.includes(word)) score += 30;
    });
    dangerWords.medium.forEach((word) => {
      if (lowerInput.includes(word)) score += 15;
    });

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

      {/* Contenido principal */}
      <main className="max-w-lg mx-auto px-3 py-6">
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
            {/* Fase de escritura */}
            <div className="text-center mb-4">
              <div className="text-gray-400 text-xs mb-1">Tu tema es:</div>
              <h2 className="text-xl font-bold text-yellow-400 mb-2">
                "{selectedTheme}"
              </h2>
              <p className="text-gray-400 text-sm">
                Describí tu idea de juego en 2 minutos
              </p>
            </div>

            {/* Textarea */}
            <div className="mb-4">
              <textarea
                ref={textareaRef}
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Mi juego es un... donde el jugador... La mecánica principal es..."
                className="w-full h-32 sm:h-40 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                disabled={timeLeft <= 0}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{ideaText.length} caracteres</span>
                <span>Mínimo 20 caracteres</span>
              </div>
            </div>

            {/* Scope Meter */}
            <ScopeMeter text={ideaText} />

            {/* Tip dinámico */}
            <div className="mt-4 bg-indigo-900/30 border border-indigo-600/50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb
                  size={16}
                  className="text-yellow-400 mt-0.5 flex-shrink-0"
                />
                <p className="text-gray-300 text-xs leading-relaxed">
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
