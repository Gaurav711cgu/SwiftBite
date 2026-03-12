import React, { useState } from 'react'
import './Restaurants.css'

const restaurants = [
  { id: 1, name: "Burger Kingdom", cuisine: "Burgers, Fast Food", rating: 4.5, time: "20-30 min", price: "₹200 for two", offer: "50% off up to ₹100", tag: "Bestseller", emoji: "🍔", color: "#FF6B35" },
  { id: 2, name: "Pasta Paradise", cuisine: "Italian, Pasta, Pizza", rating: 4.3, time: "25-35 min", price: "₹350 for two", offer: "Free delivery", tag: "Trending", emoji: "🍝", color: "#4CAF50" },
  { id: 3, name: "Spice Garden", cuisine: "Indian, Biryani, Curry", rating: 4.6, time: "30-40 min", price: "₹300 for two", offer: "20% off", tag: "Top Rated", emoji: "🍛", color: "#FF9800" },
  { id: 4, name: "Sushi World", cuisine: "Japanese, Sushi, Asian", rating: 4.4, time: "35-45 min", price: "₹500 for two", offer: "Flat ₹150 off", tag: "Premium", emoji: "🍱", color: "#9C27B0" },
  { id: 5, name: "Pizza Hub", cuisine: "Pizza, Italian, Snacks", rating: 4.2, time: "20-25 min", price: "₹250 for two", offer: "Buy 1 Get 1", tag: "Deal", emoji: "🍕", color: "#F44336" },
  { id: 6, name: "The Sandwich Co.", cuisine: "Sandwiches, Wraps, Healthy", rating: 4.1, time: "15-20 min", price: "₹180 for two", offer: "Free dessert", tag: "Healthy", emoji: "🥪", color: "#00BCD4" },
  { id: 7, name: "Noodle House", cuisine: "Chinese, Noodles, Dim Sum", rating: 4.3, time: "25-30 min", price: "₹220 for two", offer: "30% off", tag: "Popular", emoji: "🍜", color: "#FF5722" },
  { id: 8, name: "The Cake Shop", cuisine: "Desserts, Cakes, Beverages", rating: 4.7, time: "20-30 min", price: "₹150 for two", offer: "Free drink", tag: "Sweet Spot", emoji: "🎂", color: "#E91E63" },
]

const filters = ["All", "Pure Veg", "Offers", "Top Rated", "Fast Delivery", "New"]

const Restaurants = () => {
  const [active, setActive] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = restaurants.filter(r =>
    (active === "All" || r.tag === active || (active === "Offers" && r.offer) || (active === "Top Rated" && r.rating >= 4.5) || (active === "Fast Delivery" && r.time.startsWith("15")))
    && (r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className='restaurants'>
      <div className='restaurants-hero'>
        <h1>Order from <span>top restaurants</span> near you</h1>
        <div className='restaurants-search'>
          <span>🔍</span>
          <input type='text' placeholder='Search restaurants or cuisines...' value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className='restaurants-filters'>
        {filters.map(f => (
          <button key={f} className={`filter-btn ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>

      <p className='restaurants-count'>{filtered.length} restaurants found</p>

      <div className='restaurants-grid'>
        {filtered.map(r => (
          <div key={r.id} className='restaurant-card'>
            <div className='restaurant-card-img' style={{ background: `linear-gradient(135deg, ${r.color}22, ${r.color}44)` }}>
              <span className='restaurant-emoji'>{r.emoji}</span>
              {r.offer && <div className='restaurant-offer'>{r.offer}</div>}
            </div>
            <div className='restaurant-card-info'>
              <div className='restaurant-card-top'>
                <h3>{r.name}</h3>
                <div className='restaurant-rating'>⭐ {r.rating}</div>
              </div>
              <p className='restaurant-cuisine'>{r.cuisine}</p>
              <div className='restaurant-meta'>
                <span>🕐 {r.time}</span>
                <span>•</span>
                <span>{r.price}</span>
              </div>
              <div className='restaurant-tag' style={{ background: `${r.color}22`, color: r.color }}>{r.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Restaurants
