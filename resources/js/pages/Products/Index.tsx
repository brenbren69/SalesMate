import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Management',
        href: '/productmanagement',
    },
];

const initialProducts = [
    { id: 'P001',  name: 'MORINGA Tea',                    category: 'Beverage',  price: 476.00,  status: 'Active'    },
    { id: 'P002',  name: 'HERO Blue Raspberry Jam',         category: 'Food',      price: 168.00,  status: 'Low Stock' },
    { id: 'P003',  name: 'HEINZ Berry & Vanilla Custard',   category: 'Food',      price: 55.00,   status: 'Active'    },
    { id: 'P004',  name: 'KENKO AA Premium Drip Facemask',  category: 'Non-Food',  price: 267.00,  status: 'Low Stock' },
    { id: 'P005',  name: "Australia's Own Full Dairy Milk",  category: 'Beverage',  price: 96.00,   status: 'Low Stock' },
    { id: 'P006',  name: 'BADOT Sparkling Mineral Water',   category: 'Beverage',  price: 45.00,   status: 'Active'    },
    { id: 'P007',  name: 'Hunter Chips Black Truffle',      category: 'Food',      price: 206.00,  status: 'Low Stock' },
    { id: 'P008',  name: 'Barilla Spaghettini',             category: 'Food',      price: 104.91,  status: 'Active'    },
    { id: 'P009',  name: 'KENKO Bio Disposable FaceMask',   category: 'Non-Food',  price: 135.00,  status: 'Active'    },
    { id: 'P010',  name: 'Barilla Pesto Genovese',          category: 'Food',      price: 308.64,  status: 'Low Stock' },
    { id: 'P011',  name: 'KENKO Disposable FaceMask',       category: 'Non-Food',  price: 33.00,   status: 'Active'    },
];

const CATEGORIES = ['All Categories', 'Beverage', 'Food', 'Non-Food'];

const statusStyle: Record<string, string> = {
    'Active':    'text-emerald-500 font-semibold',
    'Low Stock': 'text-amber-500 font-semibold',
    'Inactive':  'text-red-400 font-semibold',
};

export default function ProductManagement() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', category: 'Food', price: '', status: 'Active' });

    const filtered = products.filter(p => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'All Categories' || p.category === category;
        return matchSearch && matchCat;
    });

    const handleAdd = () => {
        if (!form.name || !form.price) return;
        const newId = `P${String(products.length + 1).padStart(3, '0')}`;
        setProducts(prev => [...prev, {
            id: newId,
            name: form.name,
            category: form.category,
            price: parseFloat(form.price),
            status: form.status,
        }]);
        setForm({ name: '', category: 'Food', price: '', status: 'Active' });
        setShowModal(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />

            <div className="min-h-screen bg-sky-50 p-6">

                {/* Toolbar */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded-lg bg-sky-400 hover:bg-sky-500 transition-colors px-5 py-2.5 text-sm font-semibold text-white shadow"
                    >
                        + Add Product
                    </button>

                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name, ID, or category"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-sky-300 w-72"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-sky-300"
                        >
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100">
                                {['Product ID', 'Product Name', 'Category', 'Price Per Unit', 'Availability'].map(h => (
                                    <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                                        No products found.
                                    </td>
                                </tr>
                            ) : filtered.map(product => (
                                <tr key={product.id} className="hover:bg-sky-50/40 transition-colors">
                                    <td className="px-6 py-4 text-slate-500">{product.id}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">{product.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{product.category}</td>
                                    <td className="px-6 py-4 text-slate-700">
                                        P {product.price.toFixed(2)}
                                    </td>
                                    <td className={`px-6 py-4 ${statusStyle[product.status]}`}>
                                        {product.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Footer count */}
                    <div className="border-t border-slate-50 px-6 py-3 text-xs text-slate-400">
                        Showing {filtered.length} of {products.length} products
                    </div>
                </div>

                {/* Add Product Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-slate-800 mb-5">Add New Product</h2>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        placeholder="e.g. MORINGA Tea"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                                    >
                                        {['Beverage', 'Food', 'Non-Food'].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Price Per Unit (₱)</label>
                                    <input
                                        type="number"
                                        value={form.price}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                        placeholder="e.g. 99.00"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Availability</label>
                                    <select
                                        value={form.status}
                                        onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                                    >
                                        {['Active', 'Low Stock', 'Inactive'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="rounded-lg bg-sky-400 hover:bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}