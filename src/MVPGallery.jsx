import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Star,
  Lightbulb,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Datos de juegos famosos con sus MVPs
const mvpExamples = [
  {
    id: 1,
    name: "Minecraft",
    mvpTime: "6 días",
    finalTime: "10+ años",
    mvpFeatures: [
      "Bloques que se rompen",
      "Personaje que camina",
      "Mundo plano",
    ],
    finalFeatures: [
      "Miles de bloques",
      "Multijugador",
      "Mods infinitos",
      "The End",
      "Redstone",
    ],
    lesson:
      "Notch hizo el primer prototipo en una semana. Solo podías caminar y romper bloques. ¡Y fue suficiente para saber que era divertido!",
    mvpImage: "🟫",
    finalImage: "🏰",
  },
  {
    id: 2,
    name: "Super Meat Boy",
    mvpTime: "3 semanas",
    finalTime: "2 años",
    mvpFeatures: [
      "Un cuadrado rojo que salta",
      "Plataformas grises",
      "Una meta",
    ],
    finalFeatures: [
      "300+ niveles",
      "Personajes secretos",
      "Cutscenes",
      "Bosses",
      "Música épica",
    ],
    lesson:
      "El prototipo era literalmente un cuadrado rojo. No tenía animaciones ni efectos. Solo el salto perfecto.",
    mvpImage: "🟥",
    finalImage: "🥩",
  },
  {
    id: 3,
    name: "Hollow Knight",
    mvpTime: "1 Game Jam",
    finalTime: "4 años",
    mvpFeatures: ["Caballero que salta", "Ataque básico", "Un enemigo"],
    finalFeatures: [
      "Mundo gigante",
      "40+ bosses",
      "Historia profunda",
      "DLCs",
      "Secrets",
    ],
    lesson:
      "Empezó en una Jam de 72 horas. El primer prototipo tenía UN solo enemigo y UN solo ataque.",
    mvpImage: "⚔️",
    finalImage: "🦋",
  },
  {
    id: 4,
    name: "Stardew Valley",
    mvpTime: "Meses",
    finalTime: "4 años",
    mvpFeatures: ["Granja vacía", "Plantar una semilla", "Recoger un vegetal"],
    finalFeatures: [
      "Pueblo completo",
      "NPCs con historias",
      "Matrimonio",
      "Coop",
      "Minas",
    ],
    lesson:
      'ConcernedApe (1 persona) empezó solo con "plantar y cosechar". Todo lo demás vino después.',
    mvpImage: "🌱",
    finalImage: "🏡",
  },
  {
    id: 5,
    name: "Celeste",
    mvpTime: "4 días (PICO-8)",
    finalTime: "2 años",
    mvpFeatures: ["Personaje que salta", "Dash", "Plataformas simples"],
    finalFeatures: [
      "700+ pantallas",
      "Historia emocional",
      "B-Sides",
      "Música icónica",
    ],
    lesson:
      "El prototipo de PICO-8 solo tenía salto y dash. ¡Y ya era increíblemente divertido!",
    mvpImage: "🔴",
    finalImage: "🍓",
  },
];

const tips = [
  "💡 Todos estos juegos empezaron como prototipos feos",
  "💡 Lo importante es que la MECÁNICA sea divertida, no los gráficos",
  "💡 Si tu cuadrado gris es divertido, tu juego final será increíble",
  "💡 Primero hacelo funcionar, después hacelo lindo",
  "💡 Un juego terminado siempre le gana a uno incompleto",
];

const MVPGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const currentGame = mvpExamples[currentIndex];

  const nextGame = () => {
    setShowFinal(false);
    setCurrentIndex((prev) => (prev + 1) % mvpExamples.length);
  };

  const prevGame = () => {
    setShowFinal(false);
    setCurrentIndex(
      (prev) => (prev - 1 + mvpExamples.length) % mvpExamples.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fondo */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 border-b-2 border-yellow-600 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-3 py-2.5 flex items-center justify-between">
          <Link
            to="/elevator-pitch"
            className="text-gray-400 hover:text-white transition-colors no-underline text-sm"
          >
            ← Volver
          </Link>

          <div className="text-yellow-300 flex items-center gap-1.5 text-sm font-medium">
            <Star size={16} />
            Paso 4 de 4
          </div>

          <div className="text-gray-400 text-sm">
            {currentIndex + 1}/{mvpExamples.length}
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-lg mx-auto px-3 py-6">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            📸 Galería: Antes y Después
          </h1>
          <p className="text-gray-400 text-sm">
            Juegos famosos que empezaron como prototipos simples
          </p>
        </div>

        {/* Card del juego */}
        <div className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden mb-4">
          {/* Título */}
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-3">
            <h2 className="text-xl font-bold text-white">{currentGame.name}</h2>
          </div>

          {/* Toggle MVP / Final */}
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowFinal(false)}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                  !showFinal
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                🛠️ MVP ({currentGame.mvpTime})
              </button>
              <button
                onClick={() => setShowFinal(true)}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                  showFinal
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                ✨ Final ({currentGame.finalTime})
              </button>
            </div>

            {/* Comparación visual */}
            <div className="flex items-center justify-center gap-4 py-6">
              <div
                className={`text-6xl transition-all duration-300 ${
                  !showFinal ? "scale-110" : "scale-75 opacity-50"
                }`}
              >
                {currentGame.mvpImage}
              </div>
              <ArrowRight
                className={`text-gray-500 transition-all ${
                  showFinal ? "text-green-400" : ""
                }`}
                size={24}
              />
              <div
                className={`text-6xl transition-all duration-300 ${
                  showFinal ? "scale-110" : "scale-75 opacity-50"
                }`}
              >
                {currentGame.finalImage}
              </div>
            </div>

            {/* Features */}
            <div
              className={`p-3 rounded-lg ${
                showFinal
                  ? "bg-green-900/30 border border-green-600"
                  : "bg-blue-900/30 border border-blue-600"
              }`}
            >
              <div className="text-xs font-bold mb-2 text-gray-300">
                {showFinal ? "✨ Versión Final:" : "🛠️ Prototipo MVP:"}
              </div>
              <ul className="space-y-1">
                {(showFinal
                  ? currentGame.finalFeatures
                  : currentGame.mvpFeatures
                ).map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-300 flex items-center gap-2"
                  >
                    <span
                      className={showFinal ? "text-green-400" : "text-blue-400"}
                    >
                      •
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lección */}
          <div className="bg-gray-900/50 px-4 py-3 border-t border-gray-700">
            <div className="flex items-start gap-2">
              <Lightbulb
                size={16}
                className="text-yellow-400 mt-0.5 flex-shrink-0"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentGame.lesson}
              </p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={prevGame}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 active:scale-95 transition-all"
          >
            <ChevronLeft size={18} />
            Anterior
          </button>
          <button
            onClick={nextGame}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 active:scale-95 transition-all"
          >
            Siguiente
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Indicadores de progreso */}
        <div className="flex justify-center gap-2 mb-6">
          {mvpExamples.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setShowFinal(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-yellow-400 w-6"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Tip final */}
        <div className="bg-yellow-900/30 border border-yellow-600/50 p-4 rounded-lg mb-6">
          <div className="text-center">
            <Trophy className="inline-block text-yellow-400 mb-2" size={32} />
            <p className="text-yellow-300 font-bold text-sm mb-1">Recordá:</p>
            <p className="text-gray-300 text-sm">
              {tips[currentIndex % tips.length]}
            </p>
          </div>
        </div>

        {/* Botón de finalizar */}
        <Link
          to="/"
          className="block w-full text-center px-6 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-500 active:scale-95 transition-all no-underline"
        >
          <div className="flex items-center justify-center gap-2">
            <Home size={20} />
            ¡Completaste el taller!
          </div>
          <div className="text-xs mt-1 opacity-80">Volver al inicio</div>
        </Link>
      </main>
    </div>
  );
};

export default MVPGallery;
