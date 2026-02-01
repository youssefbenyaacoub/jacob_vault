import React from 'react';
import { motion } from 'motion/react';
import { Package, Heart, Settings, LogOut, ExternalLink, Clock, ChevronRight, User } from 'lucide-react';
import { SectionHeading, Badge } from './UI';

export const ClientPanel = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const orders = [
    { id: 'ARC-9921', date: 'FEB 01, 2026', status: 'In Transit', total: '$445.00', items: 1 },
    { id: 'ARC-8402', date: 'JAN 12, 2026', status: 'Delivered', total: '$280.00', items: 1 },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="px-6 lg:px-24 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-gray-100 pb-12">
          <div className="space-y-4">
            <SectionHeading subtitle="Studio Profile" className="mb-0">
              Welcome Back,<br />{user?.name || 'Curator'}
            </SectionHeading>
            <div className="flex gap-4">
              <Badge className="bg-[#0047FF]">Tier: Archiver</Badge>
              <Badge className="bg-black">ID: 0x22F1...A4</Badge>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Navigation / Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'orders', label: 'Archive Records', icon: Package, active: true },
              { id: 'wishlist', label: 'Saved Objects', icon: Heart, active: false },
              { id: 'profile', label: 'Identity Settings', icon: User, active: false },
              { id: 'security', label: 'Privacy Protocol', icon: Settings, active: false },
            ].map(item => (
              <button 
                key={item.id}
                className={`w-full flex items-center justify-between p-4 text-[11px] font-black uppercase tracking-widest transition-all ${item.active ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.active && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#0047FF]" /> Recent Records
                </h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">View All Logs</button>
              </div>

              <div className="border border-gray-100 divide-y divide-gray-100">
                {orders.map(order => (
                  <div key={order.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50 transition-colors group">
                    <div className="flex gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Record ID</p>
                        <p className="text-xs font-black">{order.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</p>
                        <p className="text-xs font-bold">{order.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-12">
                      <div className="space-y-1 text-right md:text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Settlement</p>
                        <p className="text-xs font-mono font-black text-[#0047FF]">{order.total}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</p>
                        <Badge className={order.status === 'Delivered' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-blue-50 text-[#0047FF] border border-blue-100'}>
                          {order.status}
                        </Badge>
                      </div>
                      <button className="p-2 border border-gray-200 hover:border-black transition-colors opacity-0 group-hover:opacity-100">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter / Profile Call to Action */}
            <div className="bg-gray-50 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-black uppercase tracking-tighter">Identity Authentication</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-relaxed max-w-md">
                  Enable two-factor authentication to secure your archival data and exclusive purchase history.
                </p>
              </div>
              <button className="bg-black text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-[#0047FF] transition-colors">
                Configure Protocol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
