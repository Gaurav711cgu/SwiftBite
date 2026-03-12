import React from 'react'
import './Offers.css'
import { useNavigate } from 'react-router-dom'

const offers = [
  { code: "SWIFTBITE", title: "50% OFF your first order", desc: "Use on orders above ₹200. Max discount ₹150.", color: "#FF6B35", emoji: "🎉", expiry: "Limited time" },
  { code: "FREESHIP", title: "Free Delivery", desc: "Free delivery on all orders today only!", color: "#4CAF50", emoji: "🚚", expiry: "Today only" },
  { code: "BOGO50", title: "Buy 1 Get 1 Free", desc: "On selected items from partner restaurants.", color: "#9C27B0", emoji: "🎁", expiry: "Weekends" },
  { code: "UPIBONUS", title: "10% cashback on UPI", desc: "Pay with any UPI app and get 10% cashback.", color: "#00BCD4", emoji: "💳", expiry: "All month" },
  { code: "LUNCH20", title: "20% off on Lunch", desc: "Order between 12PM - 3PM for 20% off.", color: "#FF9800", emoji: "☀️", expiry: "Daily 12–3PM" },
  { code: "NIGHT30", title: "30% off Late Night", desc: "Order after 10PM for 30% discount.", color: "#3F51B5", emoji: "🌙", expiry: "Daily 10PM+" },
]

const Offers = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className='offers'>
      <div className='offers-hero'>
        <h1>🔥 Exclusive Offers</h1>
        <p>Grab the best deals before they expire!</p>
      </div>

      <div className='offers-grid'>
        {offers.map((offer, i) => (
          <div key={i} className='offer-card' style={{ borderColor: offer.color + '44' }}>
            <div className='offer-card-left' style={{ background: offer.color + '22' }}>
              <span className='offer-emoji'>{offer.emoji}</span>
              <span className='offer-expiry'>{offer.expiry}</span>
            </div>
            <div className='offer-card-right'>
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
              <div className='offer-code-row'>
                <div className='offer-code' style={{ borderColor: offer.color, color: offer.color }}>
                  {offer.code}
                </div>
                <button className='copy-btn' onClick={() => copyCode(offer.code)} style={{ background: offer.color }}>
                  {copied === offer.code ? '✅ Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='offers-cta'>
        <h2>Ready to order?</h2>
        <p>Apply your coupon at checkout</p>
        <button onClick={() => navigate('/')}>Order Now 🚀</button>
      </div>
    </div>
  )
}

export default Offers
