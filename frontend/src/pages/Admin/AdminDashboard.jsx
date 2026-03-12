import React, { useContext, useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const AdminDashboard = () => {
  const { url, food_list } = useContext(StoreContext);
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/order/list`);
        if (res.data.success) setOrders(res.data.data);
      } catch(e) {}
      finally { setLoading(false); }
    };
    fetchOrders();
  }, []);

  const totalRevenue  = orders.reduce((s, o) => s + o.amount, 0);
  const pending       = orders.filter(o => o.status === "Food Processing").length;
  const delivered     = orders.filter(o => o.status === "Delivered").length;
  const outForDel     = orders.filter(o => o.status === "Out for delivery").length;

  const stats = [
    { label: "Total Orders",   value: orders.length,      icon: "📦", color: "#FF6B35" },
    { label: "Total Revenue",  value: `$${totalRevenue}`, icon: "💰", color: "#4CAF50" },
    { label: "Menu Items",     value: food_list.length,   icon: "🍽️", color: "#9C27B0" },
    { label: "Pending",        value: pending,            icon: "⏳", color: "#FF9800" },
    { label: "Out for Del.",   value: outForDel,          icon: "🚚", color: "#00BCD4" },
    { label: "Delivered",      value: delivered,          icon: "✅", color: "#8BC34A" },
  ];

  const quickLinks = [
    { to: "/admin/add",    label: "Add Food Item",  icon: "➕", desc: "Upload a new dish to the menu" },
    { to: "/admin/list",   label: "Manage Menu",    icon: "📋", desc: "View and delete food items" },
    { to: "/admin/orders", label: "Manage Orders",  icon: "📦", desc: "Update order statuses" },
  ];

  return (
    <div className='admin-dashboard'>
      <div className='admin-dashboard-header'>
        <div>
          <h1>👋 Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening with SwiftBite today.</p>
        </div>
        <div className='admin-badge'>🛡️ Admin Mode Active</div>
      </div>

      {/* Stats */}
      <div className='admin-stats-grid'>
        {stats.map((stat, i) => (
          <div key={i} className='admin-stat-card' style={{ '--stat-color': stat.color }}>
            <div className='stat-icon'>{stat.icon}</div>
            <div className='stat-info'>
              <div className='stat-value'>{loading ? '—' : stat.value}</div>
              <div className='stat-label'>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className='admin-section-title'>Quick Actions</h2>
      <div className='admin-quick-links'>
        {quickLinks.map(l => (
          <Link key={l.to} to={l.to} className='admin-quick-card'>
            <div className='quick-icon'>{l.icon}</div>
            <div>
              <h3>{l.label}</h3>
              <p>{l.desc}</p>
            </div>
            <span className='quick-arrow'>→</span>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className='admin-section-title'>Recent Orders</h2>
      <div className='admin-recent-orders'>
        {loading ? (
          [...Array(3)].map((_, i) => <div key={i} className='order-row-skeleton'></div>)
        ) : orders.slice(0, 5).map((order, i) => (
          <div key={i} className='recent-order-row'>
            <span className='order-icon'>📦</span>
            <div className='order-row-info'>
              <span className='order-row-name'>{order.address.firstName} {order.address.lastName}</span>
              <span className='order-row-items'>{order.items.length} item{order.items.length>1?'s':''}</span>
            </div>
            <span className='order-row-amount'>${order.amount}</span>
            <span className={`order-status-badge status-${order.status.toLowerCase().replace(/ /g,'-')}`}>
              {order.status}
            </span>
          </div>
        ))}
        {!loading && orders.length === 0 && <p className='no-data'>No orders yet.</p>}
      </div>
    </div>
  )
}

export default AdminDashboard
