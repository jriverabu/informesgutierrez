import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  MessageCircle, 
  MousePointer2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye,
  Target,
  UserCircle,
  Coffee
} from 'lucide-react';

const App = () => {
  // Datos extraídos de las 4 campañas de Gutierrez Coffee
  const rawData = [
    { name: "Hay momentos que se disfrutan con un buen café...", result: 4491, type: "Interacción", cost: 33.39, spend: 149969, reach: 37561 },
    { name: "¿Ya probaste nuestro café de origen?", result: 34, type: "Mensaje WhatsApp", cost: 4411.76, spend: 150000, reach: 14998 },
    { name: "Si vienes a Gutierrez Coffee este febrero...", result: 1016, type: "Interacción", cost: 147.64, spend: 150000, reach: 42876 },
    { name: "Visitas al Perfil - Tráfico Local", result: 1240, type: "Visita Perfil", cost: 120.96, spend: 150000, reach: 32400 }
  ];

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
      avgCostMsg: totalMessages > 0 ? (rawData.filter(d => d.type === "Mensaje WhatsApp").reduce((acc, curr) => acc + curr.spend, 0) / totalMessages) : 0,
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
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#4a3728] p-4 rounded-2xl shadow-lg">
            <Coffee className="text-[#d9b99b]" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#2c1e14] leading-none">GUTIERREZ COFFEE</h1>
            <p className="text-[#8c7355] font-bold mt-1 uppercase text-xs tracking-widest">Reporte de Resultados de Campaña</p>
          </div>
        </div>
        <div className="bg-[#4a3728] px-8 py-5 rounded-3xl shadow-2xl shadow-stone-200 border-t border-[#5d4634]">
          <p className="text-[10px] text-[#d9b99b] font-black uppercase tracking-widest mb-1">Inversión Publicitaria</p>
          <p className="font-black text-white text-2xl">${totals.spend.toLocaleString()} COP</p>
        </div>
      </div>

      {/* KPI Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Inicios de Chat" 
          value={totals.messages} 
          icon={MessageCircle} 
          color="bg-[#4a3728]"
          subtext={`Costo x Chat: $${totals.avgCostMsg.toFixed(0)}`}
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
          subtext="Tráfico a la marca"
        />
        <MetricCard 
          title="Alcance Único" 
          value={totals.reach.toLocaleString()} 
          icon={Users} 
          color="bg-stone-800"
          subtext="Personas impactadas"
        />
      </div>

      {/* Main Charts Area */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Cost Efficiency Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h3 className="text-xs font-black text-stone-900 mb-8 uppercase flex items-center gap-2 tracking-widest">
            <Target size={18} className="text-[#4a3728]" />
            Costo por Resultado (Por Campaña)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rawData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f1f1" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{fontSize: 10, fontWeight: 700, fill: '#57534e'}}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: '#fcfaf7'}}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Costo unitario']}
                />
                <Bar dataKey="cost" radius={[0, 10, 10, 0]} barSize={32}>
                  {rawData.map((entry, index) => {
                    let color = '#8c7355'; // Interacción
                    if (entry.type === "Mensaje WhatsApp") color = '#4a3728'; // Mensajes
                    if (entry.type === "Visita Perfil") color = '#bf9b7a'; // Visitas
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Results Mix Pie Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center">
          <h3 className="text-xs font-black text-stone-900 mb-6 uppercase flex items-center gap-2 tracking-widest text-center w-full">
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
          <div className="mt-6 w-full space-y-3">
            <div className="flex justify-between items-center bg-[#fcfaf7] p-3 rounded-2xl">
              <span className="text-xs font-black text-[#4a3728]">Mensajes</span>
              <span className="text-xs font-black px-2 py-0.5 bg-[#4a3728] text-white rounded-lg">{totals.messages}</span>
            </div>
            <div className="flex justify-between items-center bg-[#fcfaf7] p-3 rounded-2xl">
              <span className="text-xs font-black text-[#8c7355]">Interacciones</span>
              <span className="text-xs font-black px-2 py-0.5 bg-[#8c7355] text-white rounded-lg">{totals.interactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-[#fcfaf7] p-3 rounded-2xl">
              <span className="text-xs font-black text-[#bf9b7a]">Visitas Perfil</span>
              <span className="text-xs font-black px-2 py-0.5 bg-[#bf9b7a] text-white rounded-lg">{totals.profileVisits.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#4a3728] text-[#d9b99b] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Campaña Consolidada</th>
                <th className="px-8 py-6">Tipo</th>
                <th className="px-8 py-6 text-right">Resultados</th>
                <th className="px-8 py-6 text-right">Costo unitario</th>
                <th className="px-8 py-6 text-right">Inversión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rawData.map((item, index) => (
                <tr key={index} className="hover:bg-stone-50 transition-all duration-150">
                  <td className="px-8 py-5 text-xs font-bold text-stone-800">{item.name}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase ${
                      item.type === 'Mensaje WhatsApp' ? 'bg-stone-900 text-stone-100' : 
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
      
      {/* Branding Footer */}
      <div className="max-w-6xl mx-auto mt-12 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.4em]">Gutierrez Coffee Trafficker Dashboard</p>
        <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#4a3728] animate-pulse" />
            <span className="text-[10px] font-black text-stone-600 uppercase">Datos en tiempo real</span>
        </div>
      </div>
    </div>
  );
};

export default App;
