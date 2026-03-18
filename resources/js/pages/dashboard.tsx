import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

// --- Mock Data ---
const salesData = [
    { month: 'Jan', revenue: 18400, orders: 95 },
    { month: 'Feb', revenue: 21200, orders: 110 },
    { month: 'Mar', revenue: 19800, orders: 102 },
    { month: 'Apr', revenue: 24600, orders: 130 },
    { month: 'May', revenue: 22100, orders: 118 },
    { month: 'Jun', revenue: 27300, orders: 145 },
    { month: 'Jul', revenue: 25000, orders: 150 },
];

const topProducts = [
    { name: 'Product A', sales: 4200 },
    { name: 'Product B', sales: 3800 },
    { name: 'Product C', sales: 3100 },
    { name: 'Product D', sales: 2700 },
    { name: 'Product E', sales: 2100 },
];

const categoryData = [
    { name: 'Electronics', value: 38 },
    { name: 'Clothing', value: 25 },
    { name: 'Food', value: 20 },
    { name: 'Others', value: 17 },
];

const PIE_COLORS = ['#6366f1', '#22d3ee', '#f59e0b', '#10b981'];

const recentOrders = [
    { id: '#ORD-1041', customer: 'Alice Monroe', amount: '$320.00', status: 'Completed', date: 'Jul 15' },
    { id: '#ORD-1040', customer: 'James Park',   amount: '$184.50', status: 'Pending',   date: 'Jul 15' },
    { id: '#ORD-1039', customer: 'Sara Chen',    amount: '$99.00',  status: 'Completed', date: 'Jul 14' },
    { id: '#ORD-1038', customer: 'Mike Torres',  amount: '$540.00', status: 'Shipped',   date: 'Jul 14' },
    { id: '#ORD-1037', customer: 'Lena Müller',  amount: '$212.75', status: 'Pending',   date: 'Jul 13' },
];

const statusColor: Record<string, string> = {
    Completed: 'bg-emerald-100 text-emerald-700',
    Pending:   'bg-amber-100 text-amber-700',
    Shipped:   'bg-indigo-100 text-indigo-700',
};

// --- Stat Card ---
function StatCard({
    label, value, sub, accent,
}: { label: string; value: string; sub: string; accent: string }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white p-5 shadow-sm`}>
            <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 ${accent}`} />
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-800">{value}</p>
            <p className="mt-1 text-xs text-slate-400">{sub}</p>
        </div>
    );
}

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg text-sm">
                <p className="font-semibold text-slate-700 mb-1">{label}</p>
                {payload.map((p: any) => (
                    <p key={p.dataKey} style={{ color: p.color }}>
                        {p.name}: <span className="font-bold">{p.value.toLocaleString()}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50 p-6 font-[system-ui]">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
                        <p className="text-sm text-slate-400 mt-0.5">July 2025 · All stores</p>
                    </div>
                    <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors">
                        Export Report
                    </button>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
                    <StatCard label="Total Revenue"  value="P25,000" sub="↑ 12% vs last month" accent="bg-indigo-500" />
                    <StatCard label="New Orders"     value="150"     sub="↑ 8% vs last month"  accent="bg-cyan-500" />
                    <StatCard label="Active Users"   value="500"     sub="↑ 5% vs last month"  accent="bg-amber-400" />
                    <StatCard label="Avg. Order Value" value="P166"  sub="↓ 2% vs last month"  accent="bg-rose-400" />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-4">

                    {/* Revenue Area Chart (2/3 width) */}
                    <div className="col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-slate-700">Revenue Over Time</h2>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                                Last 7 months
                            </span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={salesData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={{ r: 3, fill: '#6366f1' }} activeDot={{ r: 5 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Pie Chart (1/3 width) */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-700 mb-4">Sales by Category</h2>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%" cy="50%"
                                    innerRadius={52} outerRadius={75}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {categoryData.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(val) => `${val}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-2 grid grid-cols-2 gap-1">
                            {categoryData.map((c, i) => (
                                <div key={c.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                                    {c.name} <span className="font-semibold text-slate-700">{c.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">

                    {/* Orders Bar Chart */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-slate-700">Monthly Orders</h2>
                            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-600">2025</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={salesData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="orders" name="Orders" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top Products Bar */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-slate-700">Top Selling Products</h2>
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">Units sold</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={topProducts} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={72} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="sales" name="Sales" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-700">Recent Orders</h2>
                        <a href="#" className="text-xs font-medium text-indigo-500 hover:underline">View all</a>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                            <tr>
                                {['Order', 'Customer', 'Amount', 'Status', 'Date'].map(h => (
                                    <th key={h} className="px-6 py-3 text-left font-medium tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recentOrders.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3 font-mono text-xs text-indigo-500">{order.id}</td>
                                    <td className="px-6 py-3 font-medium text-slate-700">{order.customer}</td>
                                    <td className="px-6 py-3 text-slate-600">{order.amount}</td>
                                    <td className="px-6 py-3">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-400">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}