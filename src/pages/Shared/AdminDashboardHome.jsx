import { useEffect, useState } from 'react';
import axios from 'axios';

const COLORS = ["#3B82F6", "#F59E42", "#EF4444", "#10B981"];

const PieChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  return (
    <svg width="220" height="220" viewBox="0 0 42 42" className="mx-auto">
      {data.map((d, i) => {
        const start = cumulative / total;
        const end = (cumulative + d.value) / total;
        const large = end - start > 0.5 ? 1 : 0;
        const a = 21 + 20 * Math.sin(2 * Math.PI * start);
        const b = 21 - 20 * Math.cos(2 * Math.PI * start);
        const x = 21 + 20 * Math.sin(2 * Math.PI * end);
        const y = 21 - 20 * Math.cos(2 * Math.PI * end);
        const path = `M21,21 L${a},${b} A20,20 0 ${large} 1 ${x},${y} Z`;
        cumulative += d.value;
        return <path key={i} d={path} fill={d.color} />;
      })}
    </svg>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 border-t-4`} style={{ borderColor: color }}>
    <div className="text-4xl font-bold mb-2" style={{ color }}>{value}</div>
    <div className="text-lg font-semibold text-gray-700">{label}</div>
  </div>
);

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    premium: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://match-finder-server.vercel.app/admin-dashboard/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats({ total: 0, male: 0, female: 0, premium: 0, revenue: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-10 text-center text-gray-500">Loading dashboard stats...</div>;

  const pieData = [
    { label: 'Total', value: stats.total, color: COLORS[0] },
    { label: 'Male', value: stats.male, color: COLORS[1] },
    { label: 'Female', value: stats.female, color: COLORS[2] },
    { label: 'Premium', value: stats.premium, color: COLORS[3] },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Pie Chart Card */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 flex flex-col items-center col-span-1 md:col-span-2">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Biodata Distribution</h3>
        <PieChart data={pieData} />
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {pieData.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: d.color }}></span>
              <span className="text-base text-gray-700">{d.label}: <b>{d.value}</b></span>
            </div>
          ))}
        </div>
      </div>
      {/* Stat Cards */}
      <div className="flex flex-col gap-8">
        <StatCard label="Total Biodatas" value={stats.total} color={COLORS[0]} />
        <StatCard label="Male Biodatas" value={stats.male} color={COLORS[1]} />
        <StatCard label="Female Biodatas" value={stats.female} color={COLORS[2]} />
        <StatCard label="Premium Members" value={stats.premium} color={COLORS[3]} />
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-400 flex flex-col items-center">
          <div className="text-4xl font-bold mb-2 text-green-500">${stats.revenue}</div>
          <div className="text-lg font-semibold text-gray-700">Total Revenue (Contact Purchases)</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;