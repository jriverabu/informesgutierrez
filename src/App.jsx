import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  MessageCircle, MousePointer2, TrendingUp, Users, Eye, Target, UserCircle, Coffee
} from 'lucide-react';

const App = () => {
  // Gutierrez Coffee tembiapo kuéra (datos)
  const rawData = [
    { name: "Gutierrez Coffee - Perfil jeguata", result: 1240, type: "Visita Perfil", cost: 120.96, spend: 150000, reach: 32400 },
    { name: "Guttierez Coffee - Ñomongeta", result: 4016, type: "Interacción", cost: 37.35, spend: 150000, reach: 42876 }
  ];

  const totals = useMemo(() => {
    const totalSpend = rawData.reduce((acc, curr) => acc + curr.spend, 0);
    const totalInteractions = rawData.filter(d => d.type === "Interacción").reduce((acc, curr) => acc + curr.result, 0);
    const totalProfileVisits = rawData.filter(d => d.type === "Visita Perfil").reduce((acc, curr) => acc + curr.result, 0);
    const totalReach = rawData.reduce((acc, curr) => acc + curr.reach, 0);
    
    return {
      spend: totalSpend,
      interactions: totalInteractions,
      profileVisits: totalProfileVisits,
      reach: totalReach,
      avgCostResult: totalSpend / (totalInteractions + totalProfileVisits)
    };
  }, []);

  const MetricCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-black mt-2 text-stone-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
      {subtext && <p className="text-stone-400 text-[11px] mt-4 font-bold italic">{subtext}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfaf7] p-4 md:p-8 font-sans text-stone-900">
      {/* Akã (Encabezado) */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#4a3728] p-4 rounded-2xl shadow-lg">
            <Coffee className="text-[#d9b99b]" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#2c1e14] leading-none uppercase">Gutierrez Coffee</h1>
            <p className="text-[#8c7355] font-bold mt-1 uppercase text-xs tracking-widest">Tembiapo Rendimiento rehegua</p>
          </div>
        </div>
        <div className="bg-[#4a3728] px-8 py-5 rounded-3xl shadow-2xl shadow-stone-200 border-t border-[#5d4634]">
          <p className="text-[10px] text-[#d9b99b] font-black uppercase tracking-widest mb-1">Pirapire jeporuite</p>
          <p className="font-black text-white text-2xl">${totals.spend.toLocaleString()} COP</p>
        </div>
      </div>

      {/* KPI Tenda (Sección de métricas clave) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Ñomongeta kuéra" 
          value={totals.interactions.toLocaleString()} 
          icon={MousePointer2} 
          color="bg-[#8c7355]"
          subtext="Ojejapóva tembiapóre"
        />
        <MetricCard 
          title="Perfil jeguata" 
          value={totals.profileVisits.toLocaleString()} 
          icon={UserCircle} 
          color="bg-[#bf9b7a]"
          subtext="Tapicha oikéva perfil-pe"
        />
        <MetricCard 
          title="Huvy" 
          value={totals.reach.toLocaleString()} 
          icon={Users} 
          color="bg-stone-800"
          subtext="Tapicha ohecháva"
        />
        <MetricCard 
          title="Repy mbyte" 
          value={`$${totals.avgCostResult.toFixed(2)}`} 
          icon={Target} 
          color="bg-[#4a3728]"
          subtext="Repy ojehupytývare"
        />
      </div>

      {/* Gráficos Tenda */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h3 className="text-xs font-black text-stone-900 mb-8 uppercase flex items-center gap-2 tracking-widest">
            <TrendingUp size={18} className="text-[#4a3728]" />
            Repy jeporu tembiapo rupive
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rawData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f1f1" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#57534e'}}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{fill: '#fcfaf7'}}
                  contentStyle={{borderRadius: '20px', border: 'none'}}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Repy']}
                />
                <Bar dataKey="cost" radius={[0, 10, 10, 0]} barSize={40}>
                  {rawData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.type === "Interacción" ? '#8c7355' : '#bf9b7a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center">
          <h3 className="text-xs font-black text-stone-900 mb-6 uppercase flex items-center gap-2 tracking-widest">
            <Eye size={18} className="text-[#4a3728]" />
            Mba'éichapa oñemboja'o
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Ñomongeta', value: totals.interactions },
                    { name: 'Jeguata', value: totals.profileVisits }
                  ]}
                  innerRadius={70} outerRadius={95} paddingAngle={10} dataKey="value"
                >
                  <Cell fill="#8c7355" />
                  <Cell fill="#bf9b7a" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla Detallada */}
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#4a3728] text-[#d9b99b] font-black uppercase tracking-widest">
                <th className="px-8 py-6">Tembiapo</th>
                <th className="px-8 py-6">Mba'eichagua</th>
                <th className="px-8 py-6 text-right">Ojehupytýva</th>
                <th className="px-8 py-6 text-right">Repy peteĩre</th>
                <th className="px-8 py-6 text-right">Jeporu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-bold">
              {rawData.map((item, index) => (
                <tr key={index} className="hover:bg-stone-50">
                  <td className="px-8 py-5 text-stone-800">{item.name}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-xl text-[9px] font-black uppercase bg-[#bf9b7a] text-white">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right text-stone-700">{item.result.toLocaleString()}</td>
                  <td className="px-8 py-5 text-right text-stone-900">${item.cost.toLocaleString()}</td>
                  <td className="px-8 py-5 text-right text-stone-400">${item.spend.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Ápe oñepyrũ opaite mba'e
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
