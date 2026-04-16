import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, MousePointer2, TrendingUp, DollarSign, Users, Eye, 
  Target, UserCircle, Coffee, Pizza, LayoutDashboard, BarChart3
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

// Datos de las marcas
const DATA = {
  autor: [
    { name: "Campaña Interacción Feb", result: 4491, type: "Interacción", cost: 33.39, spend: 149969, reach: 37561 },
    { name: "Sushi WhatsApp", result: 34, type: "Mensaje WhatsApp", cost: 4411.76, spend: 150000, reach: 14998 },
    { name: "Feb Autor Promo", result: 1016, type: "Interacción", cost: 147.64, spend: 150000, reach: 42876 },
    { name: "Cumpleaños WhatsApp", result: 64, type: "Mensaje WhatsApp", cost: 2319.41, spend: 148442, reach: 9494 },
    { name: "Cócteles Interacción", result: 302, type: "Interacción", cost: 331.13, spend: 100000, reach: 38892 },
    { name: "Tarta Queso Promo", result: 2162, type: "Interacción", cost: 69.01, spend: 149190, reach: 50000 }
  ],
  memos: [
    { name: "Promo Pizza 2x1", result: 45, type: "Mensaje WhatsApp", cost: 3333.33, spend: 150000, reach: 15600 },
    { name: "Interacción Borde Queso", result: 3115, type: "Interacción", cost: 48.15, spend: 150000, reach: 31343 },
    { name: "Tráfico Visita Perfil", result: 1240, type: "Visita Perfil", cost: 120.96, spend: 150000, reach: 32400 },
    { name: "Pizza Diferente Ads", result: 2828, type: "Interacción", cost: 53.04, spend: 150000, reach: 29882 }
  ],
  coffee: [
    { name: "Momentos Café Ads", result: 4491, type: "Interacción", cost: 33.39, spend: 149969, reach: 37561 },
    { name: "WhatsApp Origen", result: 34, type: "Mensaje WhatsApp", cost: 4411.76, spend: 150000, reach: 14998 },
    { name: "Promo Febrero Coffee", result: 1016, type: "Interacción", cost: 147.64, spend: 150000, reach: 42876 },
    { name: "Tráfico Local Perfil", result: 1240, type: "Visita Perfil", cost: 120.96, spend: 150000, reach: 32400 }
  ]
};

const BRANDS = {
  autor: { id: 'autor', name: 'Autor', color: 'bg-blue-600', icon: LayoutDashboard, theme: 'blue' },
  memos: { id: 'memos', name: 'Memos Pizza', color: 'bg-red-600', icon: Pizza, theme: 'red' },
  coffee: { id: 'coffee', name: 'Gutierrez Coffee', color: 'bg-[#4a3728]', icon: Coffee, theme: 'stone' }
};

const MetricCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black mt-1 text-slate-800">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-2xl ${color}`}>
        <Icon className="text-white" size={18} />
      </div>
    </div>
    {subtext && <p className="text-slate-400 text-[10px] mt-4 font-bold">{subtext}</p>}
  </div>
);

const App = () => {
  const [activeBrand, setActiveBrand] = useState('autor');
  const brand = BRANDS[activeBrand];
  const data = DATA[activeBrand];

  const totals = useMemo(() => {
    const spend = data.reduce((acc, curr) => acc + curr.spend, 0);
    const messages = data.filter(d => d.type === "Mensaje WhatsApp").reduce((acc, curr) => acc + curr.result, 0);
    const interactions = data.filter(d => d.type === "Interacción").reduce((acc, curr) => acc + curr.result, 0);
    const visits = data.filter(d => d.type === "Visita Perfil").reduce((acc, curr) => acc + curr.result, 0);
    const reach = data.reduce((acc, curr) => acc + curr.reach, 0);
    const avgCost = messages > 0 ? (data.filter(d => d.type === "Mensaje WhatsApp").reduce((acc, curr) => acc + curr.spend, 0) / messages) : 0;
    return { spend, messages, interactions, visits, reach, avgCost };
  }, [activeBrand]);

  const chartColors = {
    'Mensaje WhatsApp': brand.theme === 'red' ? '#dc2626' : brand.theme === 'stone' ? '#4a3728' : '#10b981',
    'Interacción': brand.theme === 'red' ? '#f97316' : brand.theme === 'stone' ? '#8c7355' : '#3b82f6',
    'Visita Perfil': brand.theme === 'red' ? '#f59e0b' : brand.theme === 'stone' ? '#bf9b7a' : '#8b5cf6'
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans">
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-xl">
            <TrendingUp className="text-white" size={20} />
          </div>
          <span className="font-black text-slate-900 hidden md:block">TRAFFIC DASH</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {Object.values(BRANDS).map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBrand(b.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeBrand === b.id ? `${b.color} text-white shadow-lg` : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <b.icon size={20} />
              <span className="font-bold text-sm hidden md:block">{b.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900">{brand.name}</h2>
              <p className="text-slate-400 font-bold text-xs mt-1 tracking-widest uppercase">Reporte General de Resultados</p>
            </div>
            <div className={`${brand.color} px-6 py-4 rounded-3xl text-white shadow-xl`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Inversión Total</p>
              <p className="text-2xl font-black">${totals.spend.toLocaleString()} COP</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="WhatsApp" value={totals.messages} icon={MessageCircle} color={brand.color} subtext={`CPA: $${totals.avgCost.toFixed(0)}`} />
            <MetricCard title="Interacción" value={totals.interactions.toLocaleString()} icon={MousePointer2} color="bg-orange-500" subtext="Engagement" />
            <MetricCard title="Visitas Perfil" value={totals.visits.toLocaleString()} icon={UserCircle} color="bg-indigo-500" subtext="Tráfico" />
            <MetricCard title="Alcance" value={totals.reach.toLocaleString()} icon={Users} color="bg-slate-800" subtext="Personas" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100">
              <h3 className="text-xs font-black text-slate-800 mb-6 uppercase flex items-center gap-2"><BarChart3 size={16} /> Eficiencia</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 9, fontWeight: 700}} axisLine={false} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                    <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={20}>
                      {data.map((entry, index) => <Cell key={index} fill={chartColors[entry.type]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center">
              <h3 className="text-xs font-black text-slate-800 mb-6 uppercase">Mix de Objetivos</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Mensajes', value: totals.messages },
                        { name: 'Interacciones', value: totals.interactions },
                        { name: 'Visitas', value: totals.visits }
                      ]}
                      innerRadius={50} outerRadius={70} paddingAngle={8} dataKey="value"
                    >
                      <Cell fill={chartColors['Mensaje WhatsApp']} />
                      <Cell fill={chartColors['Interacción']} />
                      <Cell fill={chartColors['Visita Perfil']} />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                  <th className="px-6 py-4 text-center">Campaña</th>
                  <th className="px-6 py-4 text-center">Resultados</th>
                  <th className="px-6 py-4 text-center">Inversión</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t border-slate-50 hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{item.name}</td>
                    <td className="px-6 py-4 text-xs font-black text-slate-900 text-center">{item.result.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-400 text-center">${item.spend.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
