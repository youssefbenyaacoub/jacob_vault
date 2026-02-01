import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Search,
  TrendingUp,
  DollarSign,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Loader2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Badge, Button } from './UI';
import { Logo } from './Logo';
import { projectId } from '../utils/supabase/info';

export const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'customers'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [invRes, ordRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4138cd39/inventory`),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4138cd39/orders`)
      ]);

      const invData = await invRes.json();
      const ordData = await ordRes.json();

      // Convert inventory object to array
      const invArray = Object.entries(invData).map(([id, details]: [string, any]) => ({
        id,
        ...details,
        sku: `JV-OBJ-${id.padStart(3, '0')}`
      }));

      setInventory(invArray);
      setOrders(ordData);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateStock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4138cd39/inventory/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: editingItem.id,
          stock: editingItem.stock
        }),
      });

      if (response.ok) {
        await fetchAdminData();
        setEditingItem(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const totalRevenue = orders.reduce((acc, ord) => acc + ord.total, 0);
  const inventoryValue = inventory.reduce((acc, item) => acc + (item.stock * item.price), 0);

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+100%', icon: DollarSign, positive: true },
    { label: 'Total Orders', value: orders.length.toString(), change: `+${orders.length}`, icon: ShoppingBag, positive: true },
    { label: 'Inventory Value', value: `$${inventoryValue.toLocaleString()}`, change: 'Live', icon: Package, positive: true },
    { label: 'Vault Members', value: '1,240', change: '+124', icon: Users, positive: true },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-foreground" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-text">Establishing Secure Connection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-card-border z-50 p-8 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <h1 className="text-xl font-black uppercase tracking-tighter text-foreground">JACOB VAULT <span className="text-[10px] text-muted-text font-bold block tracking-widest">COMMAND CENTER</span></h1>
          </div>

          <nav className="space-y-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'customers', label: 'Customers', icon: Users },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 p-3 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-foreground text-background' : 'text-muted-text hover:text-foreground'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <button onClick={onBack} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-text hover:text-foreground transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> Exit to Store
          </button>
          <div className="pt-6 border-t border-card-border flex items-center gap-4">
            <div className="w-10 h-10 bg-foreground/10 flex items-center justify-center font-black">AD</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Admin User</p>
              <p className="text-[9px] text-muted-text font-bold uppercase tracking-widest">Root Entity</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-12">
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
            <input
              type="text"
              placeholder="SEARCH VAULT DATA..."
              className="w-full bg-card border border-card-border p-4 pl-12 text-[10px] font-black uppercase tracking-widest outline-none focus:border-foreground transition-colors text-foreground"
            />
          </div>
          <div className="flex gap-4">
            <Button className="h-12 px-6 flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Object
            </Button>
            <div className="w-12 h-12 bg-card border border-card-border flex items-center justify-center cursor-pointer hover:border-foreground transition-colors">
              <Settings className="w-5 h-5 text-muted-text" />
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-card p-8 border border-card-border space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-background flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-black ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-text">{stat.label}</p>
                    <p className="text-2xl font-black uppercase tracking-tighter mt-1 text-foreground">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-8 bg-card border border-card-border">
                <div className="p-8 border-b border-card-border flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Recent Log Entries</h3>
                  <button className="text-[10px] font-black uppercase tracking-widest text-foreground hover:underline">View All Records</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-card-border text-[10px] font-black uppercase tracking-widest text-muted-text">
                        <th className="px-8 py-6">Record ID</th>
                        <th className="px-8 py-6">Identity</th>
                        <th className="px-8 py-6">Settlement</th>
                        <th className="px-8 py-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-background/50 transition-colors group">
                          <td className="px-8 py-6 text-xs font-black text-foreground">{order.id}</td>
                          <td className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-foreground">{order.customerEmail}</td>
                          <td className="px-8 py-6 text-xs font-mono font-black text-foreground">${order.total}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Confirmed' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{order.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="lg:col-span-4 bg-card border border-card-border">
                <div className="p-8 border-b border-card-border">
                  <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Stock Alerts</h3>
                </div>
                <div className="p-4 space-y-4">
                  {inventory.filter(item => item.stock < 10).map((alert, i) => (
                    <div key={i} className="p-6 bg-red-500/5 border border-red-500/10 flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-widest text-red-500">{alert.name}</p>
                        <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Supply Low — Only {alert.stock} left</p>
                      </div>
                    </div>
                  ))}
                  {inventory.filter(item => item.stock < 10).length === 0 && (
                    <p className="text-center py-12 text-[10px] font-black uppercase tracking-widest text-muted-text">Inventory Supplies Stable</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'inventory' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border"
          >
            <div className="p-8 border-b border-card-border flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Object Manifest</h3>
              <div className="flex gap-4">
                <button onClick={fetchAdminData} className="p-2 border border-card-border text-muted-text hover:text-foreground transition-colors"><TrendingUp className="w-4 h-4" /></button>
                <button className="p-2 border border-card-border text-muted-text hover:text-foreground transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-card-border text-[10px] font-black uppercase tracking-widest text-muted-text">
                    <th className="px-8 py-6">Object</th>
                    <th className="px-8 py-6">SKU</th>
                    <th className="px-8 py-6">Supply Status</th>
                    <th className="px-8 py-6">Settlement</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {inventory.map((item, i) => (
                    <tr key={i} className="hover:bg-background/50 transition-colors group">
                      <td className="px-8 py-6 flex items-center gap-4">
                        <div className="w-10 h-10 bg-background border border-card-border grayscale shrink-0"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-foreground">{item.name}</span>
                      </td>
                      <td className="px-8 py-6 text-xs font-mono text-muted-text">{item.sku}</td>
                      <td className="px-8 py-6">
                        <div className="w-full max-w-[150px] flex items-center gap-4">
                          <div className="flex-1 h-1 bg-background border border-card-border overflow-hidden">
                            <div
                              className={`h-full ${item.stock > 10 ? 'bg-foreground' : item.stock > 0 ? 'bg-orange-400' : 'bg-red-500'}`}
                              style={{ width: `${Math.min(item.stock * 4, 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{item.stock}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs font-mono font-black text-foreground">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 border border-card-border hover:border-foreground transition-colors text-muted-text hover:text-foreground"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-card-border text-muted-text hover:text-red-500 hover:border-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border"
          >
            <div className="p-8 border-b border-card-border">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Full Transmission Record</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-card-border text-[10px] font-black uppercase tracking-widest text-muted-text">
                    <th className="px-8 py-6">Record ID</th>
                    <th className="px-8 py-6">Date</th>
                    <th className="px-8 py-6">Entity</th>
                    <th className="px-8 py-6">Items</th>
                    <th className="px-8 py-6">Total</th>
                    <th className="px-8 py-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-background/50 transition-colors">
                      <td className="px-8 py-6 text-xs font-black text-foreground">{order.id}</td>
                      <td className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted-text">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-foreground">{order.customerEmail}</td>
                      <td className="px-8 py-6 text-[10px] font-bold text-muted-text">
                        {order.items.length} Object(s)
                      </td>
                      <td className="px-8 py-6 text-xs font-mono font-black text-foreground">${order.total}</td>
                      <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-foreground">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>

      {/* Modifier Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-[300] flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-background border-l border-card-border shadow-2xl p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-foreground">Supply Modification</h2>
                <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-card text-foreground transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleUpdateStock} className="flex-1 space-y-8 overflow-y-auto no-scrollbar pr-4">
                <div className="space-y-4">
                  <div className="p-6 bg-card border border-card-border flex items-center gap-4">
                    <div className="w-16 h-16 bg-background border border-card-border grayscale shrink-0"></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-text">{editingItem.sku}</p>
                      <h3 className="text-lg font-black uppercase tracking-tighter text-foreground">{editingItem.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Adjust Supply Levels (Units)</label>
                  <input
                    type="number"
                    value={editingItem.stock}
                    onChange={(e) => setEditingItem({ ...editingItem, stock: parseInt(e.target.value) })}
                    className="w-full bg-card border border-card-border p-6 text-2xl font-black outline-none focus:border-foreground text-foreground font-mono"
                  />
                </div>

                <div className="pt-8 border-t border-card-border">
                  <div className="flex items-start gap-4 mb-8">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <p className="text-[10px] text-muted-text uppercase tracking-widest font-bold leading-relaxed">
                      Supply adjustments will sync with the global vault record immediately upon validation.
                    </p>
                  </div>
                  <Button type="submit" className="w-full h-16">
                    Validate Supply Update
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
