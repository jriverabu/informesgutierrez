import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  MessageCircle, MousePointer2, TrendingUp, Users, Eye, Target, UserCircle, Coffee
} from 'lucide-react';

/**
 * Componente Principal para el Dashboard de Gutierrez Coffee.
 * Este archivo se encarga de procesar los datos y renderizar la interfaz
 * utilizando Tailwind CSS para los estilos y Recharts para la visualización.
 */
const App = () => {
  // Datos consolidados de las campañas de Gutierrez Coffee
  const rawData = [
    { name: "Gutierrez Coffee - Trafico Perfil", result: 1240, type: "Visita Perfil", cost: 120.96, spend: 150000, reach: 32400 },
    { name: "Guttierez Coffee - Interacción", result: 4016, type: "Interacción", cost: 37.35, spend: 150000, reach: 42876 },
    { name: "Café de Origen - Especial", result: 34, type: "Mensaje WhatsApp", cost: 4411.76, spend: 150000, reach: 14998 },
    { name: "Si vienes a Gutierrez...", result: 1016, type: "Interacción", cost: 147.64, spend: 150000, reach: 42876 }
  ];

  // Cálculo de métricas globales mediante useMemo para optimización
  const totals = useMemo(() => {
    const totalSpend = rawData.reduce((acc, curr) => acc + curr.spend, 0);
    const totalMessages = rawData.filter(d => d.type === "Mensaje WhatsApp").reduce((acc, curr) => acc + curr.result, 0);
    const totalInteractions = rawData.filter(d => d.type === "Interacción").reduce((acc, curr) => acc + curr.result, 0);
    const totalProfileVisits = rawData.filter(d => d.type === "Visita Perfil").reduce((acc, curr) => acc + curr.result, 0);
    const totalReach = rawData.reduce((acc, curr) => acc + curr.reach, 0);
    
    return {
      spend: totalSpend,
      messages: totalMessages,
      interactions: totalInteractions,
      profileVisits: totalProfileVisits,
      reach: totalReach,
      avgCostResult: totalMessages > 0 ? (rawData.filter(d => d.type === "Mensaje WhatsApp").reduce((acc, curr) => acc + curr.spend, 0) / totalMessages) : 0,
    };
  }, []);

  // Componente de tarjeta de métrica reutilizable
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
      {/* Encabezado Principal */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#4a3728] p-4 rounded-2xl shadow-lg">
            <Coffee className="text-[#d9b99b]" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#2c1e14] leading-none uppercase">GUTIERREZ COFFEE</h1>
            <p className="text-[#8c7355] font-bold mt-1 uppercase text-xs tracking-widest text-center md:text-left">Dashboard de Resultados</p>
          </div>
        </div>
        <div className="bg-[#4a3728] px-8 py-5 rounded-3xl shadow-2xl shadow-stone-200 border-t border-[#5d4634]">
          <p className="text-[10px] text-[#d9b99b] font-black uppercase tracking-widest mb-1 text-center md:text-left">Inversión Total</p>
          <p className="font-black text-white text-2xl">${totals.spend.toLocaleString()} COP</p>
        </div>
      </div>

      {/* Grid de KPIs principales */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Mensajes WhatsApp" 
          value={totals.messages} 
          icon={MessageCircle} 
          color="bg-[#4a3728]"
          subtext={`CPA: $${totals.avgCostResult.toFixed(0)}`}
        />
        <MetricCard 
          title="Interacciones" 
          value={totals.interactions.toLocaleString()} 
          icon={MousePointer2} 
          color="bg-[#8c7355]"
          subtext="Engagement total"
        />
        <MetricCard 
          title="Visitas al Perfil" 
          value={totals.profileVisits.toLocaleString()} 
          icon={UserCircle} 
          color="bg-[#bf9b7a]"
          subtext="Tráfico directo"
        />
        <MetricCard 
          title="Alcance Único" 
          value={totals.reach.toLocaleString()} 
          icon={Users} 
          color="bg-stone-800"
          subtext="Impacto total"
        />
      </div>

      {/* Área de Visualización Gráfica */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h3 className="text-xs font-black text-stone-900 mb-8 uppercase flex items-center gap-2 tracking-widest">
            <TrendingUp size={18} className="text-[#4a3728]" />
            Eficiencia por Campaña (Costo)
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
                  tick={{fontSize: 9, fontWeight: 700, fill: '#57534e'}}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{fill: '#fcfaf7'}}
                  contentStyle={{borderRadius: '20px', border: 'none'}}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Costo unitario']}
                />
                <Bar dataKey="cost" radius={[0, 10, 10, 0]} barSize={32}>
                  {rawData.map((entry, index) => {
                    let color = '#8c7355';
                    if (entry.type === "Mensaje WhatsApp") color = '#4a3728';
                    if (entry.type === "Visita Perfil") color = '#bf9b7a';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center">
          <h3 className="text-xs font-black text-stone-900 mb-6 uppercase flex items-center gap-2 tracking-widest">
            <Eye size={18} className="text-[#4a3728]" />
            Mix de Objetivos
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Mensajes', value: totals.messages },
                    { name: 'Interacciones', value: totals.interactions },
                    { name: 'Visitas', value: totals.profileVisits }
                  ]}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={10}
                  dataKey="value"
                >
                  <Cell fill="#4a3728" />
                  <Cell fill="#8c7355" />
                  <Cell fill="#bf9b7a" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla de Detalle Final */}
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#4a3728] text-[#d9b99b] text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-6">Campaña Activa</th>
                <th className="px-8 py-6">Tipo</th>
                <th className="px-8 py-6 text-right">Resultados</th>
                <th className="px-8 py-6 text-right">Costo unitario</th>
                <th className="px-8 py-6 text-right">Inversión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rawData.map((item, index) => (
                <tr key={index} className="hover:bg-stone-50 transition-all">
                  <td className="px-8 py-5 text-xs font-bold text-stone-800">{item.name}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase ${
                      item.type === 'Mensaje WhatsApp' ? 'bg-[#4a3728] text-white' : 
                      item.type === 'Visita Perfil' ? 'bg-[#bf9b7a] text-white' : 
                      'bg-[#8c7355] text-white'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right text-xs font-black text-stone-700">{item.result.toLocaleString()}</td>
                  <td className="px-8 py-5 text-right font-black text-stone-900 text-xs">${item.cost.toLocaleString()}</td>
                  <td className="px-8 py-5 text-right text-xs font-bold text-stone-400">${item.spend.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
