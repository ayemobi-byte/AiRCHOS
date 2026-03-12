import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Calculator } from 'lucide-react';

interface MatrixAppProps {
  onClose: () => void;
}

const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const PLANETS = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

const ELEMENT_MAP: Record<string, string> = {
  "Aries": "Fire", "Taurus": "Earth", "Gemini": "Metal", "Cancer": "Water",
  "Leo": "Fire", "Virgo": "Earth", "Libra": "Metal", "Scorpio": "Water",
  "Sagittarius": "Fire", "Capricorn": "Earth", "Aquarius": "Metal", "Pisces": "Water"
};

interface Placement {
  degree: number;
}

interface Matrix {
  name: string;
  weight: number;
  placements: Record<string, Placement>;
}

export default function RelationalMatrixApp({ onClose }: MatrixAppProps) {
  const [matrices, setMatrices] = useState<Matrix[]>([
    {
      name: 'Person A',
      weight: 1.0,
      placements: {
        Sun: { degree: 116.5 },
        Moon: { degree: 0 },
        Mercury: { degree: 0 },
        Venus: { degree: 0 },
        Mars: { degree: 0 },
        Jupiter: { degree: 0 },
        Saturn: { degree: 0 },
      }
    },
    {
      name: 'Person B',
      weight: 1.0,
      placements: {
        Sun: { degree: 58.2 },
        Moon: { degree: 0 },
        Mercury: { degree: 0 },
        Venus: { degree: 0 },
        Mars: { degree: 0 },
        Jupiter: { degree: 0 },
        Saturn: { degree: 0 },
      }
    }
  ]);

  const [result, setResult] = useState<any>(null);

  const addMatrix = () => {
    setMatrices([...matrices, {
      name: `Person ${String.fromCharCode(65 + matrices.length)}`,
      weight: 1.0,
      placements: PLANETS.reduce((acc, p) => ({ ...acc, [p]: { degree: 0 } }), {})
    }]);
  };

  const updatePlacement = (matrixIndex: number, planet: string, degree: number) => {
    const newMatrices = [...matrices];
    newMatrices[matrixIndex].placements[planet].degree = degree;
    setMatrices(newMatrices);
  };

  const calculate = () => {
    const totalWeight = matrices.reduce((sum, m) => sum + m.weight, 0);
    const composite: any = { placements: {}, metadata: { total_gravity: totalWeight } };

    PLANETS.forEach(planet => {
      let xSum = 0;
      let ySum = 0;

      matrices.forEach(matrix => {
        const degree = matrix.placements[planet].degree;
        const rad = degree * (Math.PI / 180);
        xSum += Math.cos(rad) * matrix.weight;
        ySum += Math.sin(rad) * matrix.weight;
      });

      const avgRad = Math.atan2(ySum, xSum);
      let avgDegree = (avgRad * (180 / Math.PI) + 360) % 360;
      
      const signIndex = Math.floor(avgDegree / 30);
      const sign = SIGNS[signIndex];
      const element = ELEMENT_MAP[sign];
      const vectorStrength = Math.sqrt(xSum * xSum + ySum * ySum) / totalWeight;

      composite.placements[planet] = {
        degree: Number(avgDegree.toFixed(2)),
        sign,
        element,
        vector_strength: Number(vectorStrength.toFixed(3))
      };
    });

    setResult(composite);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-black text-white flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-900/50 bg-black/90 backdrop-blur-md z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-cyan-900/30 transition-colors">
          <ArrowLeft className="w-5 h-5 text-cyan-400" />
        </button>
        <h2 className="text-sm font-semibold tracking-wide text-cyan-50">Relational Matrix</h2>
        <button onClick={calculate} className="p-2 -mr-2 rounded-full hover:bg-cyan-900/30 transition-colors text-cyan-400">
          <Calculator className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {matrices.map((matrix, i) => (
          <div key={i} className="bg-zinc-900 border border-cyan-900/30 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <input 
                type="text" 
                value={matrix.name}
                onChange={(e) => {
                  const newM = [...matrices];
                  newM[i].name = e.target.value;
                  setMatrices(newM);
                }}
                className="bg-transparent text-sm font-bold text-cyan-400 focus:outline-none"
              />
              <div className="flex items-center space-x-2 text-xs text-zinc-500">
                <span>Weight:</span>
                <input 
                  type="number" 
                  step="0.1"
                  value={matrix.weight}
                  onChange={(e) => {
                    const newM = [...matrices];
                    newM[i].weight = parseFloat(e.target.value) || 0;
                    setMatrices(newM);
                  }}
                  className="bg-black border border-zinc-800 rounded px-2 py-1 w-16 text-right focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PLANETS.map(planet => (
                <div key={planet} className="flex items-center justify-between bg-black rounded-lg p-2 border border-zinc-800/50">
                  <span className="text-xs text-zinc-400">{planet}</span>
                  <input 
                    type="number" 
                    value={matrix.placements[planet].degree}
                    onChange={(e) => updatePlacement(i, planet, parseFloat(e.target.value) || 0)}
                    className="bg-transparent text-xs text-right w-16 focus:outline-none text-zinc-200"
                    placeholder="Deg"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={addMatrix}
          className="w-full py-3 border border-dashed border-cyan-900/50 rounded-xl text-cyan-600 hover:text-cyan-400 hover:border-cyan-700 transition-colors flex items-center justify-center text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Matrix
        </button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-4 space-y-4"
          >
            <h3 className="text-sm font-bold text-cyan-400 border-b border-cyan-500/20 pb-2">Barycenter Composite</h3>
            <div className="space-y-3">
              {PLANETS.map(planet => {
                const p = result.placements[planet];
                return (
                  <div key={planet} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-300">{planet}</span>
                    <div className="flex items-center space-x-3 text-right">
                      <span className="text-cyan-200 w-12">{p.degree}°</span>
                      <span className="text-zinc-400 w-16">{p.sign}</span>
                      <span className="text-zinc-500 w-12">{p.element}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
