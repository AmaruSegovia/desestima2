import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const BUDGET = 70000;

const WorkshopSummary = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Cargar datos del localStorage
    const savedData = localStorage.getItem("workshopData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setData(parsed);

      // Disparar confeti final
      window.dispatchEvent(new CustomEvent("workshop-confetti"));

      // Disparar logros finales si corresponde
      const achievements = [
        {
          id: "budget",
          cond: parsed.totalSpent < 70000 * 0.7,
          icon: "💰",
          title: "Billetera de Hierro",
          desc: "Ahorraste más del 30% del presupuesto.",
        },
        {
          id: "theme",
          cond: parsed.themeDetected,
          icon: "🔮",
          title: "Visionario del Tema",
          desc: "Cumpliste el destino de la ruleta.",
        },
      ];

      achievements.forEach((ach, index) => {
        if (ach.cond && !localStorage.getItem(`achievement_${ach.id}`)) {
          localStorage.setItem(`achievement_${ach.id}`, "true");
          setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("workshop-achievement", { detail: ach })
            );
          }, 1000 + index * 4500);
        }
      });
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="text-xl font-bold mb-2">No hay datos del taller</h2>
          <p className="text-gray-400 mb-4">
            Parece que no completaste las actividades aún.
          </p>
          <Link
            to="/taller"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg no-underline hover:bg-purple-500"
          >
            <Sparkles size={18} />
            Empezar el Taller
          </Link>
        </div>
      </div>
    );
  }

  const isOverBudget = data.totalSpent > BUDGET;
  const budgetPercentage = Math.min((data.totalSpent / BUDGET) * 100, 100);

  // Calcular puntaje general
  const calculateScore = () => {
    let score = 100;

    // Penalizar por exceder presupuesto
    if (isOverBudget) score -= 30;

    // Penalizar por scope alto
    if (data.scopeScore > 60) score -= 25;
    else if (data.scopeScore > 40) score -= 10;

    return Math.max(0, Math.min(100, score));
  };

  const finalScore = calculateScore();

  const getScoreEmoji = (score) => {
    if (score >= 90) return "🏆";
    if (score >= 70) return "⭐";
    if (score >= 50) return "👍";
    return "💪";
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "¡Excelente! Estás listo para una Game Jam";
    if (score >= 70) return "¡Muy bien! Tenés buenas chances de terminar";
    if (score >= 50) return "Aceptable, pero cuidado con el scope";
    return "Necesitás simplificar más. ¡Menos es más!";
  };

  const getBadIdeaMessage = (score) => {
    if (score >= 120)
      return "Nivel: Delirios de Grandeza. Ubisoft te está llamando para que dirijas su Next-Gen MMO.";
    if (score >= 100)
      return "Eres bueno pensando ideas ambiciosas. ¿Seguro que no trabajás en un AAA?";
    if (score >= 81)
      return "Sos un maestro del Scope Creep. Esa idea no la terminás ni en tres vidas.";
    if (score >= 61)
      return "Esa idea era realmente mala. Directo al cementerio de proyectos olvidados.";
    return "¡Eso es ser ambicioso! Tu editor de niveles y el multijugador online ya están en camino (mentira).";
  };

  const getBadges = () => {
    const badges = [];
    if (data.scopeScore < 25)
      badges.push({
        icon: "🎯",
        title: "Maestro de la Síntesis",
        desc: "Scope perfecto para una Jam.",
      });
    if (data.badIdeaScore > 140)
      badges.push({
        icon: "👹",
        title: "Monstruo de la Ambición",
        desc: "Tu mala idea fue legendaria.",
      });
    if (data.totalSpent < BUDGET * 0.7)
      badges.push({
        icon: "💰",
        title: "Billetera de Hierro",
        desc: "Ahorraste más del 30%.",
      });
    if (data.totalSpent >= BUDGET)
      badges.push({
        icon: "🎢",
        title: "Viviendo al Límite",
        desc: "Gastaste hasta el último centavo.",
      });
    badges.push({
      icon: "✨",
      title: "Visionario del Tema",
      desc: "Usaste el tema correctamente.",
    });
    return badges;
  };

  const badges = getBadges();

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
            to="/simulador-inversion"
            className="text-gray-400 hover:text-white transition-colors no-underline text-sm flex items-center gap-1"
          >
            ← Volver
          </Link>

          <div className="text-yellow-300 flex items-center gap-1.5 text-sm font-medium">
            <Trophy size={16} />
            Paso 3 de 3
          </div>

          <div />
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-lg mx-auto px-3 py-6">
        {/* Puntaje general */}
        <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600 rounded-xl p-5 mb-6 text-center">
          <div className="text-5xl mb-2">{getScoreEmoji(finalScore)}</div>
          <div className="text-4xl font-bold text-yellow-400 mb-1">
            {finalScore}%
          </div>
          <div className="text-yellow-200 text-sm font-medium mb-3">
            Preparación para Game Jam
          </div>
          <p className="text-gray-300 text-sm">{getScoreMessage(finalScore)}</p>
        </div>

        {/* Sección: Medallas */}
        <div className="mb-6">
          <h3 className="text-yellow-500 font-black text-xs uppercase tracking-widest mb-3 text-center">
            🏆 Medallas Obtenidas
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 p-2 rounded-xl flex items-center gap-2 animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <div className="text-[10px] font-black text-yellow-500 leading-tight uppercase">
                    {badge.title}
                  </div>
                  <div className="text-[9px] text-gray-400 leading-tight">
                    {badge.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Tema */}
        <div className="bg-gray-800 border-2 border-purple-600 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-purple-400" />
            <h3 className="font-bold text-purple-300">Tu Tema</h3>
          </div>
          <p className="text-2xl font-bold text-white">"{data.theme}"</p>
        </div>

        {/* Sección: Mala Idea (Monstruo de la Ambición) */}
        {data.badIdea && (
          <div className="bg-red-900/20 border-2 border-red-900 rounded-xl p-4 mb-4 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-red-900/20 group-hover:scale-110 transition-transform duration-700">
              <AlertTriangle size={120} />
            </div>

            <div className="relative z-10 flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-red-500" />
              <h3 className="font-bold text-red-400">
                El Monstruo de la Ambición
              </h3>
              <span className="ml-auto text-[10px] bg-red-900 text-red-200 px-2 py-0.5 rounded font-bold uppercase">
                Evitado
              </span>
            </div>

            <p className="relative z-10 text-gray-400 text-sm leading-relaxed italic mb-3">
              "{data.badIdea}"
            </p>

            <div className="relative z-10 p-3 bg-red-900/40 rounded-lg border border-red-700/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-red-200 uppercase tracking-wider">
                  Nivel de locura
                </span>
                <span className="text-sm font-black text-red-400">
                  {data.badIdeaScore}%
                </span>
              </div>
              <p className="text-xs text-red-200 leading-tight">
                {getBadIdeaMessage(data.badIdeaScore)}
              </p>
            </div>
          </div>
        )}

        {/* Sección: Idea */}
        <div className="bg-gray-800 border-2 border-indigo-600 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={18} className="text-indigo-400" />
            <h3 className="font-bold text-indigo-300">Tu Idea</h3>
            <span
              className={`ml-auto text-xs px-2 py-0.5 rounded ${
                data.scopeScore < 40
                  ? "bg-green-800 text-green-200"
                  : data.scopeScore < 70
                  ? "bg-yellow-800 text-yellow-200"
                  : "bg-red-800 text-red-200"
              }`}
            >
              Ambición: {data.scopeScore}%
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed italic">
            "{data.idea}"
          </p>
          {data.warningZone && (
            <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold uppercase">
                  Zona de Advertencia
                </span>
              </div>
              <p className="text-yellow-200 text-xs leading-relaxed">
                Tu idea está en el límite de lo manejable (Score{" "}
                {data.scopeScore}). Aunque técnicamente es posible, podría ser
                arriesgado para una Game Jam. Considerá simplificar algunas
                mecánicas si el tiempo se complica.
              </p>
            </div>
          )}
          {data.scopeScore >= 40 && !data.warningZone && (
            <div className="mt-2 flex items-center gap-1 text-orange-400 text-xs">
              <AlertTriangle size={12} /> Idea algo ambiciosa
            </div>
          )}
        </div>

        {/* Sección: Presupuesto */}
        <div
          className={`bg-gray-800 border-2 rounded-xl p-4 mb-4 ${
            isOverBudget ? "border-red-600" : "border-green-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign
              size={18}
              className={isOverBudget ? "text-red-400" : "text-green-400"}
            />
            <h3
              className={`font-bold ${
                isOverBudget ? "text-red-300" : "text-green-300"
              }`}
            >
              Presupuesto
            </h3>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Gastado:</span>
            <span
              className={`font-bold text-lg ${
                isOverBudget ? "text-red-400" : "text-green-400"
              }`}
            >
              ${data.totalSpent?.toLocaleString() || 0}
            </span>
          </div>

          <div className="relative h-4 bg-gray-900 rounded overflow-hidden mb-2">
            <div
              className={`absolute inset-y-0 left-0 transition-all duration-300 ${
                isOverBudget
                  ? "bg-red-500"
                  : budgetPercentage > 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${budgetPercentage}%` }}
            />
            <div className="absolute inset-0 flex justify-end items-center pr-2">
              <span className="text-xs text-white/70">
                ${BUDGET.toLocaleString()}
              </span>
            </div>
          </div>

          {data.selectedFeatures && data.selectedFeatures.length > 0 && (
            <div className="mt-3">
              <div className="text-gray-400 text-xs mb-1">
                Features seleccionadas:
              </div>
              <div className="flex flex-wrap gap-1">
                {data.selectedFeatures.map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isOverBudget ? (
            <div className="mt-2 flex items-center gap-1 text-red-400 text-xs">
              <AlertTriangle size={12} /> ¡Excediste el presupuesto!
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-1 text-green-400 text-xs">
              <CheckCircle size={12} /> Dentro del presupuesto
            </div>
          )}
        </div>

        {/* Consejo final */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/50 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-2">
            <Lightbulb
              size={18}
              className="text-yellow-400 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-indigo-200 text-xs font-bold mb-1">
                💡 Consejo Final
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {finalScore >= 70
                  ? "¡Vas muy bien! Recordá que en la Game Jam real es mejor terminar algo simple que dejar algo ambicioso a medias."
                  : "Tratá de simplificar más tu idea. Los juegos más exitosos de Game Jam suelen ser los más simples pero pulidos."}
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 mb-4">
          <Link
            to="/taller"
            onClick={() => localStorage.removeItem("workshopData")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 no-underline"
          >
            <RefreshCw size={16} />
            Reiniciar Todo
          </Link>

          <Link
            to="/galeria-mvp"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 border-2 border-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500 no-underline"
          >
            Ver Galería
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default WorkshopSummary;
