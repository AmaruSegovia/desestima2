import React, { useState, useMemo, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Gamepad2,
  Coins,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Opciones de inversión organizadas por categorías
const categories = [
  {
    id: "mecanicas",
    name: "⚙️ Mecánicas",
    color: "blue",
    options: [
      { id: 1, name: "Movimiento básico", cost: 3000, hint: "Esencial" },
      { id: 2, name: "Salto", cost: 5000, hint: "Común" },
      { id: 3, name: "Disparo", cost: 8000, hint: "Popular" },
    ],
  },
  {
    id: "arte",
    name: "🎨 Arte",
    color: "pink",
    options: [
      { id: 4, name: "Sprites 2D", cost: 6000, hint: "Básico" },
      {
        id: 5,
        name: "Modelos 3D",
        cost: 28000,
        hint: "⚠️ Costoso",
        danger: true,
      },
      {
        id: 6,
        name: "Cinemáticas",
        cost: 35000,
        hint: "⚠️ Muy costoso",
        danger: true,
      },
    ],
  },
  {
    id: "programacion",
    name: "💻 Programación",
    color: "green",
    options: [
      { id: 7, name: "IA enemigo básica", cost: 10000, hint: "Opcional" },
      { id: 8, name: "Sistema guardado", cost: 12000, hint: "Complejo" },
      {
        id: 9,
        name: "Multijugador",
        cost: 45000,
        hint: "⚠️ Peligroso",
        danger: true,
      },
    ],
  },
  {
    id: "extra",
    name: "✨ Extras",
    color: "purple",
    options: [
      { id: 10, name: "Menú principal", cost: 4000, hint: "Necesario" },
      { id: 11, name: "Música y sonidos", cost: 8000, hint: "Ambienta" },
    ],
  },
];

// Obtener todas las opciones como lista plana
const allOptions = categories.flatMap((cat) =>
  cat.options.map((opt) => ({
    ...opt,
    category: cat.id,
    categoryColor: cat.color,
  }))
);

const BUDGET = 70000;

const colorClasses = {
  blue: {
    bg: "bg-blue-900/50",
    border: "border-blue-500",
    text: "text-blue-400",
    header: "bg-blue-800",
  },
  pink: {
    bg: "bg-pink-900/50",
    border: "border-pink-500",
    text: "text-pink-400",
    header: "bg-pink-800",
  },
  green: {
    bg: "bg-green-900/50",
    border: "border-green-500",
    text: "text-green-400",
    header: "bg-green-800",
  },
  purple: {
    bg: "bg-purple-900/50",
    border: "border-purple-500",
    text: "text-purple-400",
    header: "bg-purple-800",
  },
};

// Componente de opción individual
const OptionItem = memo(({ option, isSelected, onToggle, color }) => {
  const colors = colorClasses[color];

  return (
    <button
      onClick={() => onToggle(option.id)}
      className={`
        w-full p-3 transition-all duration-200 text-left border-2 active:scale-[0.98]
        ${
          isSelected
            ? "bg-green-700 border-green-400 shadow-lg"
            : option.danger
            ? `bg-red-900/40 border-red-600/50 hover:border-red-500`
            : `${colors.bg} ${colors.border}/30 hover:${colors.border}`
        }
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-bold ${
              isSelected ? "text-white" : "text-gray-100"
            }`}
          >
            {option.name}
          </div>
          <div
            className={`text-xs mt-0.5 ${
              option.danger
                ? "text-red-400"
                : isSelected
                ? "text-green-200"
                : "text-gray-400"
            }`}
          >
            {option.hint}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold ${
              isSelected
                ? "text-yellow-300"
                : option.danger
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            ${(option.cost / 1000).toFixed(0)}K
          </span>

          {isSelected && (
            <div className="w-5 h-5 bg-green-400 rounded flex items-center justify-center">
              <span className="text-green-900 text-xs font-bold">✓</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
});

// Componente de categoría colapsable
const CategorySection = memo(
  ({ category, selectedOptions, onToggle, defaultExpanded = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const colors = colorClasses[category.color];
    const selectedCount = category.options.filter((opt) =>
      selectedOptions.includes(opt.id)
    ).length;

    return (
      <div className={`border-2 ${colors.border}/50 overflow-hidden`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full ${colors.header} px-3 py-2 flex items-center justify-between`}
        >
          <span className="text-white font-bold text-sm">{category.name}</span>
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {selectedCount}
              </span>
            )}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {isExpanded && (
          <div className="divide-y divide-gray-700/50">
            {category.options.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                isSelected={selectedOptions.includes(option.id)}
                onToggle={onToggle}
                color={category.color}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

// Modal de resultado
const ResultModal = ({ isOpen, success, spent, onClose, onRetry }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90"
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-sm p-5 border-4 transition-all duration-300
          ${showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          ${
            success
              ? "bg-green-900 border-green-400"
              : "bg-red-900 border-red-500"
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div
            className={`text-5xl mb-3 ${
              success ? "animate-bounce" : "animate-pulse"
            }`}
          >
            {success ? "🎮" : "💀"}
          </div>

          <h2
            className={`text-xl font-bold mb-2 ${
              success ? "text-green-300" : "text-red-300"
            }`}
          >
            {success ? "¡Nivel Completado!" : "¡Game Over!"}
          </h2>

          <p className="text-white/90 mb-4 text-sm leading-relaxed">
            {success ? (
              <>
                ¡Tu juego está listo! Gastaste{" "}
                <span className="text-green-300 font-bold">
                  ${spent.toLocaleString()}
                </span>
                .
              </>
            ) : (
              <>Te quedaste sin tiempo... Fue muy ambicioso.</>
            )}
          </p>

          {!success && (
            <div className="bg-black/40 border border-orange-500/50 p-3 mb-4 text-left rounded">
              <p className="text-orange-300 text-xs font-bold mb-1">
                💡 Consejo:
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                En una Game Jam, es mejor un juego simple y terminado. ¡Empezá
                básico!
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-gray-500 text-sm text-white font-bold hover:bg-gray-600 active:translate-y-0.5 transition-all"
            >
              <RotateCcw size={16} />
              Reintentar
            </button>
            {success ? (
              <Link
                to="/elevator-pitch"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 border-2 border-green-400 text-sm text-white font-bold hover:bg-green-500 active:translate-y-0.5 transition-all no-underline"
              >
                Continuar
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                to="/taller"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 border-2 border-indigo-400 text-sm text-white font-bold hover:bg-indigo-500 active:translate-y-0.5 transition-all no-underline"
              >
                <ArrowLeft size={16} />
                Volver al inicio
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const InvestmentSimulator = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const totalSpent = useMemo(() => {
    return selectedOptions.reduce((sum, id) => {
      const option = allOptions.find((o) => o.id === id);
      return sum + (option?.cost || 0);
    }, 0);
  }, [selectedOptions]);

  const remaining = BUDGET - totalSpent;
  const budgetPercentage = Math.min((totalSpent / BUDGET) * 100, 100);
  const isOverBudget = remaining < 0;

  const toggleOption = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((optId) => optId !== id) : [...prev, id]
    );
  };

  const handleInvest = () => {
    // Guardar datos en localStorage
    const workshopData = JSON.parse(
      localStorage.getItem("workshopData") || "{}"
    );
    workshopData.totalSpent = totalSpent;
    workshopData.isOverBudget = isOverBudget;
    workshopData.selectedFeatures = selectedOptions.map((id) => {
      const option = allOptions.find((o) => o.id === id);
      return option?.name || "";
    });
    localStorage.setItem("workshopData", JSON.stringify(workshopData));

    setShowResult(true);
  };

  const handleRetry = () => {
    setSelectedOptions([]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fondo con patrón */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header sticky */}
      <header className="sticky top-0 z-40 bg-gray-900/95 border-b-2 border-indigo-600 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-3 py-2.5 flex items-center justify-between">
          <Link
            to="/taller"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors no-underline text-sm"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Volver</span>
          </Link>

          <div className="text-indigo-300 flex items-center gap-1.5 text-sm font-medium">
            <Gamepad2 size={16} />
            Paso 2 de 4
          </div>

          <div
            className={`flex items-center gap-1 font-bold text-sm ${
              isOverBudget ? "text-red-400" : "text-yellow-400"
            }`}
          >
            <Coins size={16} />${remaining.toLocaleString()}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-3 md:px-6 py-5 md:py-8 text-center">
        <div className="max-w-lg md:max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Simulador de Inversión
          </h1>

          <p className="text-gray-400 text-sm mb-4">
            Tenés{" "}
            <span className="text-green-400 font-bold">
              ${BUDGET.toLocaleString()}
            </span>{" "}
            para hacer tu juego. ¿Podrás terminarlo?
          </p>

          {/* Barra de presupuesto */}
          <div className="bg-gray-800 border-2 border-gray-600 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-gray-400 font-medium">PRESUPUESTO</span>
              <span
                className={`font-bold ${
                  isOverBudget ? "text-red-400" : "text-green-400"
                }`}
              >
                ${totalSpent.toLocaleString()} / ${BUDGET.toLocaleString()}
              </span>
            </div>

            <div className="relative h-5 bg-gray-900 rounded overflow-hidden border border-gray-700">
              {/* Segmentos */}
              <div className="absolute inset-0 flex">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-gray-700/50 last:border-r-0"
                  />
                ))}
              </div>

              {/* Barra de progreso */}
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-300 rounded-sm ${
                  isOverBudget
                    ? "bg-red-500"
                    : budgetPercentage > 80
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${budgetPercentage}%` }}
              />

              {isOverBudget && (
                <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
              )}
            </div>

            {isOverBudget && (
              <div className="flex items-center gap-1.5 mt-2 text-red-400 text-xs font-medium">
                <AlertTriangle size={14} />
                ¡Excedido por ${Math.abs(remaining).toLocaleString()}!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categorías de opciones */}
      <section className="px-3 md:px-6 pb-28">
        <div className="max-w-lg md:max-w-4xl mx-auto">
          <div className="text-gray-500 text-xs md:text-sm mb-2 md:mb-4 font-medium">
            Elegí tus features ({selectedOptions.length} seleccionadas)
          </div>

          {/* Grid 2 columnas en PC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {categories.map((category, index) => (
              <CategorySection
                key={category.id}
                category={category}
                selectedOptions={selectedOptions}
                onToggle={toggleOption}
                defaultExpanded={index < 4}
              />
            ))}
          </div>

          {/* Advertencia - ancho completo */}
          <div className="mt-4 bg-orange-900/30 border border-orange-600/50 p-3 md:p-4 rounded-lg">
            <p className="text-orange-300 text-xs md:text-sm font-bold mb-1">
              ⚠️ Cuidado
            </p>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              Las opciones en rojo son muy costosas. ¡En una Game Jam es mejor
              evitarlas!
            </p>
          </div>
        </div>
      </section>

      {/* Barra inferior fija */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/98 border-t-2 border-indigo-600 p-3 z-40 backdrop-blur-sm">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-xs text-gray-500 font-medium">Total</div>
            <div
              className={`text-lg font-bold ${
                isOverBudget ? "text-red-400" : "text-green-400"
              }`}
            >
              ${totalSpent.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleInvest}
            disabled={selectedOptions.length === 0}
            className={`
              flex items-center gap-2 px-6 py-3 font-bold text-sm
              border-2 transition-all active:translate-y-0.5 rounded-lg
              ${
                selectedOptions.length === 0
                  ? "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
                  : isOverBudget
                  ? "bg-red-600 border-red-400 text-white hover:bg-red-500"
                  : "bg-green-600 border-green-400 text-white hover:bg-green-500"
              }
            `}
          >
            <DollarSign size={18} />
            {isOverBudget ? "¡Invertir!" : "Invertir"}
          </button>
        </div>
      </div>

      {/* Modal de resultado */}
      <ResultModal
        isOpen={showResult}
        success={!isOverBudget && selectedOptions.length > 0}
        spent={totalSpent}
        onClose={() => setShowResult(false)}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default InvestmentSimulator;
