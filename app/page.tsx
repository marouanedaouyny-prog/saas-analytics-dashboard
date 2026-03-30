"use client";

import { useEffect, useState } from "react";
import { fetchSaaSMetrics } from "../lib/stripe-mock";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight } from "lucide-react";

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchSaaSMetrics().then(setData);
  }, []);

  if (!data) return <div className="p-20 text-center text-gray-400">Loading metrics...</div>;

  return (
    <main className="min-h-screen bg-[#F9FAFB] p-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-end border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SaaS Command Center</h1>
            <p className="text-gray-500 mt-1 text-sm font-medium">Real-time subscription & churn analytics.</p>
          </div>
          <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>Stripe Integrated</span>
            <span className="text-green-500">• Live Analytics</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Monthly Revenue" value={`$${data.mrr.toLocaleString()}`} change={`+${data.mrrGrowth}%`} icon={<DollarSign size={20}/>} />
          <StatCard title="Active Users" value={data.activeCustomers} change="+4.2%" icon={<Users size={20}/>} />
          <StatCard title="Net Churn" value={`${data.churn}%`} change="-0.5%" icon={<Activity size={20}/>} isNegative={true} />
          <StatCard title="Avg. LTV" value={`$${data.ltv}`} change="+2.1%" icon={<TrendingUp size={20}/>} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6">Revenue Growth (MRR)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6">User Acquisition</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="users" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, change, icon, isNegative = false }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between text-gray-400 mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
          {change}
          <ArrowUpRight size={14}/>
        </div>
      </div>
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
