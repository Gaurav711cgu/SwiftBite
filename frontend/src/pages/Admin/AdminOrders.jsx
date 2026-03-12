import React, { useContext, useEffect, useState } from 'react'
import './AdminPages.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const statusOptions = ["Food Processing", "Out for delivery", "Delivered"];

const statusColors = {
  "Food Processing":  { bg:"rgba(255,152,0,0.12)",  color:"#FF9800" },
  "Out for delivery": { bg:"rgba(0,188,212,0.12)",  color:"#00BCD4" },
  "Delivered":        { bg:"rgba(76,175,80,0.12)",  color:"#4CAF50" },
};

const AdminOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) setOrders(res.data.data.reverse());
    } catch { toast.error("Fetch error"); }
    finally { setLoading(false); }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, { orderId, status });
      if (res.data.success) { toast.success(`Status → ${status}`); fetchOrders(); }
    } catch { toast.error("Update error"); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className='admin-page'>
      <div className='admin-page-header'>
        <div>
          <h1>📦 Manage Orders</h1>
          <p>{orders.length} total orders</p>
        </div>
        <div className='order-filters'>
          {["All", ...statusOptions].map(s => (
            <button key={s} className={`filter-pill ${filter===s?'active':''}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      {loading ? (
        [...Array(4)].map((_,i) => <div key={i} className='order-skeleton'></div>)
      ) : (
        <div className='admin-orders-list'>
          {filtered.map((order, i) => {
            const sc = statusColors[order.status] || {};
            return (
              <div key={i} className='admin-order-card'>
                <div className='aoc-left'>
                  <span className='aoc-num'>#{i+1}</span>
                  <div className='aoc-items'>
                    {order.items.map((item, idx) => (
                      <span key={idx} className='aoc-item'>{item.name} ×{item.quantity}</span>
                    ))}
                  </div>
                </div>

                <div className='aoc-address'>
                  <p className='aoc-name'>👤 {order.address.firstName} {order.address.lastName}</p>
                  <p className='aoc-addr'>📍 {order.address.city}, {order.address.state}</p>
                  <p className='aoc-phone'>📞 {order.address.phone}</p>
                </div>

                <div className='aoc-right'>
                  <span className='aoc-amount'>${order.amount}</span>
                  <span className='aoc-count'>{order.items.length} item{order.items.length>1?'s':''}</span>
                  <select
                    className='status-select'
                    value={order.status}
                    style={{ background: sc.bg, color: sc.color, borderColor: sc.color+'44' }}
                    onChange={e => updateStatus(order._id, e.target.value)}
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className='no-data'>No orders for this filter.</p>}
        </div>
      )}
    </div>
  )
}

export default AdminOrders
