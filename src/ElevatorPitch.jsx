import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  Lightbulb,
  Target,
} from "lucide-react";

// Plantilla y ejemplos
const templateParts = {
  genre: [
    "plataformas",
    "puzzle",
    "shooter",
    "endless runner",
    "tower defense",
    "aventura",
  ],
  action: [
    "saltar",
    "disparar",
    "esquivar",
    "recolectar",
    "sobrevivir",
    "escapar",
  ],
  fun: [
    "timing preciso",
    "decisiones rápidas",
    "riesgo/recompensa",
    "aprender patrones",
    "superar récords",
  ],
};

const goodExamples = [
  {
    pitch:
      "Mi juego es un endless runner donde el jugador esquiva obstáculos porque es divertido por el timing preciso.",
    score: 95,
  },
  {
    pitch:
      "Es un puzzle donde movés cajas para llegar a la salida. Divertido por resolver con pocos movimientos.",
    score: 90,
  },
  {
    pitch:
      "Shooter donde disparás a enemigos que vienen de todos lados. Divertido por los power-ups locos.",
    score: 88,
  },
];

const tips = [
  "💡 Si necesitás más de 20 segundos para explicarlo, es muy complejo",
  "💡 'Mi juego es X donde hacés Y' - eso debería ser suficiente",
  "💡 ¿Cuál es LA mecánica que hace tu juego único?",
  "💡 Pensá en cómo lo explicarías a alguien que nunca jugó videojuegos",
  "💡 Si tu pitch tiene 'y también...' probablemente es muy ambicioso",
  "💡 Un buen pitch genera curiosidad, no confusión",
];

const ElevatorPitch = () => {
  const navigate = useNavigate();
  const [pitchText, setPitchText] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos
  const [timerActive, setTimerActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const textareaRef = useRef(null);

  // Iniciar timer al montar
  useEffect(() => {
    setTimerActive(true);
    textareaRef.current?.focus();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Cambiar tip cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Analizar el pitch
  const analyzePitch = () => {
    const words = pitchText.trim().split(/\s+/).length;
    let score = 100;
    let feedback = [];

    // Penalizar por longitud excesiva
    if (words > 50) {
      score -= 30;
      feedback.push("Muy largo. Tratá de ser más conciso.");
    } else if (words > 35) {
      score -= 15;
      feedback.push("Un poco largo. Podés resumirlo más.");
    }

    // Penalizar por "y también", "además", etc.
    const additionWords = [
      "y también",
      "además",
      "aparte",
      "también tiene",
      "y además",
    ];
    additionWords.forEach((word) => {
      if (pitchText.toLowerCase().includes(word)) {
        score -= 10;
        feedback.push(`"${word}" indica features extra. ¿Son necesarias?`);
      }
    });

    // Bonus por estructura clara
    if (
      pitchText.toLowerCase().includes("es un") ||
      pitchText.toLowerCase().includes("mi juego es")
    ) {
      score += 5;
    }
    if (
      pitchText.toLowerCase().includes("divertido") ||
      pitchText.toLowerCase().includes("porque")
    ) {
      score += 5;
    }

    // Penalizar longitud muy corta
    if (words < 10) {
      score -= 20;
      feedback.push("Muy corto. Agregá por qué es divertido.");
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      feedback,
      wordCount: words,
      isPassable: score >= 60,
    };
  };

  const analysis = analyzePitch();

  const handleSubmit = () => {
    setTimerActive(false);
    setShowResult(true);
  };

  const handleRetry = () => {
    setPitchText("");
    setTimeLeft(120);
    setTimerActive(true);
    setShowResult(false);
    textareaRef.current?.focus();
  };

  const handleContinue = () => {
    navigate("/galeria-mvp");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "¡Excelente!";
    if (score >= 80) return "¡Muy bien!";
    if (score >= 60) return "Aceptable";
    if (score >= 40) return "Necesita trabajo";
    return "Muy complejo";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fondo */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 border-b-2 border-green-600 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-3 py-2.5 flex items-center justify-between">
          <Link
            to="/simulador-inversion"
            className="text-gray-400 hover:text-white transition-colors no-underline text-sm"
          >
            ← Volver
          </Link>

          <div className="text-green-300 flex items-center gap-1.5 text-sm font-medium">
            <Target size={16} />
            Paso 3 de 4
          </div>

          <div
            className={`flex items-center gap-1 font-bold text-sm ${
              timeLeft < 30 ? "text-red-400 animate-pulse" : "text-yellow-400"
            }`}
          >
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-lg mx-auto px-3 py-6">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            🎤 Elevator Pitch
          </h1>
          <p className="text-gray-400 text-sm">
            Explicá tu juego en una frase clara y corta
          </p>
        </div>

        {/* Plantilla sugerida */}
        <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-lg mb-4">
          <div className="text-gray-400 text-xs mb-2">
            📝 Plantilla sugerida:
          </div>
          <p className="text-white text-sm italic">
            "Mi juego es un <span className="text-blue-400">[género]</span>{" "}
            donde
            <span className="text-green-400"> [acción principal]</span> porque
            es divertido por
            <span className="text-yellow-400"> [qué lo hace divertido]</span>."
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            value={pitchText}
            onChange={(e) => setPitchText(e.target.value)}
            placeholder="Mi juego es un..."
            className="w-full h-28 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:border-green-500 focus:outline-none resize-none"
            disabled={showResult || timeLeft <= 0}
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{analysis.wordCount} palabras</span>
            <span className={analysis.wordCount > 35 ? "text-orange-400" : ""}>
              Ideal: 15-35 palabras
            </span>
          </div>
        </div>

        {/* Medidor de claridad */}
        {pitchText.length > 10 && !showResult && (
          <div className="bg-gray-800 border-2 border-gray-600 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-gray-400 font-medium">
                CLARIDAD DEL PITCH
              </span>
              <span className={`font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}%
              </span>
            </div>

            <div className="relative h-3 bg-gray-900 rounded overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-300 ${
                  analysis.score >= 80
                    ? "bg-green-500"
                    : analysis.score >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${analysis.score}%` }}
              />
            </div>

            {analysis.feedback.length > 0 && (
              <div className="mt-2 space-y-1">
                {analysis.feedback.map((fb, i) => (
                  <p key={i} className="text-orange-400 text-xs">
                    ⚠️ {fb}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resultado */}
        {showResult && (
          <div
            className={`p-4 rounded-lg border-2 mb-4 ${
              analysis.isPassable
                ? "bg-green-900/30 border-green-600"
                : "bg-orange-900/30 border-orange-600"
            }`}
          >
            <div className="text-center">
              <div className={`text-3xl mb-2 ${getScoreColor(analysis.score)}`}>
                {analysis.score}%
              </div>
              <div
                className={`font-bold text-lg ${getScoreColor(analysis.score)}`}
              >
                {getScoreLabel(analysis.score)}
              </div>

              {analysis.isPassable ? (
                <p className="text-green-300 text-sm mt-2">
                  ✅ Tu pitch es claro y conciso. ¡Buen trabajo!
                </p>
              ) : (
                <p className="text-orange-300 text-sm mt-2">
                  ⚠️ Intentá simplificar más tu explicación.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tip dinámico */}
        {!showResult && (
          <div className="bg-green-900/30 border border-green-600/50 p-3 rounded-lg mb-4">
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
        )}

        {/* Ejemplos */}
        <div className="bg-gray-800/30 border border-gray-700 p-3 rounded-lg mb-4">
          <div className="text-gray-400 text-xs mb-2">✨ Buenos ejemplos:</div>
          <div className="space-y-2">
            {goodExamples.map((ex, i) => (
              <div key={i} className="bg-gray-800/50 p-2 rounded text-xs">
                <p className="text-gray-300 italic">"{ex.pitch}"</p>
                <span className="text-green-400 text-[10px]">
                  {ex.score}% claridad
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 active:scale-95 transition-all"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>

          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={pitchText.length < 20}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-lg border-2 transition-all ${
                pitchText.length >= 20
                  ? "bg-green-600 border-green-400 text-white hover:bg-green-500 active:scale-95"
                  : "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle size={16} />
              Evaluar
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 border-2 border-green-400 text-white font-bold rounded-lg hover:bg-green-500 active:scale-95 transition-all"
            >
              Continuar
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ElevatorPitch;
