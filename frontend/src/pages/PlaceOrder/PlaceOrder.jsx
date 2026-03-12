import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [payment, setPayment] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [wallet, setWallet] = useState("")
  const [processing, setProcessing] = useState(false)

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "", zipcode: "", country: "", phone: ""
  })

  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => setData(d => ({ ...d, [e.target.name]: e.target.value }))

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)

  const placeOrder = async (e) => {
    e.preventDefault();
    setProcessing(true);
    let orderItems = [];
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    let orderData = { address: data, items: orderItems, amount: getTotalCartAmount() + deliveryCharge };

    try {
      if (payment === "stripe") {
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) window.location.replace(response.data.session_url);
        else toast.error("Something went wrong");
      } else {
        // Simulate payment processing for UPI/Card/Wallet
        await new Promise(r => setTimeout(r, 1500));
        let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
        if (response.data.success) {
          setCartItems({});
          navigate("/myorders");
          toast.success("🎉 Order placed successfully!");
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (err) {
      toast.error("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => {
    if (!token) { toast.error("Sign in to place an order"); navigate('/cart'); }
    else if (getTotalCartAmount() === 0) navigate('/cart');
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>📦 Delivery Information</p>
        <div className="multi-field">
          <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
          <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street address' required />
        <div className="multi-field">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
          <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
        </div>
        <div className="multi-field">
          <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
          <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
        </div>
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone number' required />
      </div>

      <div className="place-order-right">
        {/* Order Summary */}
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
            <div className="cart-total-details discount"><p>🎁 Discount</p><p className='green'>-{currency}0</p></div>
            <hr />
            <div className="cart-total-details total-row"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
          </div>
        </div>

        {/* Payment */}
        <div className="payment">
          <h2>💳 Payment Method</h2>

          {/* UPI */}
          <div className={`payment-option ${payment === 'upi' ? 'selected' : ''}`} onClick={() => setPayment("upi")}>
            <div className='payment-option-header'>
              <span className='payment-radio'>{payment === 'upi' ? '🔵' : '⚪'}</span>
              <div className='payment-option-title'>
                <p>UPI Payment</p>
                <span>Google Pay, PhonePe, Paytm, BHIM</span>
              </div>
              <div className='payment-icons'>
                <span title="Google Pay">GPay</span>
                <span title="PhonePe">PhPe</span>
                <span title="Paytm">Paytm</span>
              </div>
            </div>
            {payment === 'upi' && (
              <div className='payment-detail'>
                <input type='text' placeholder='Enter UPI ID (e.g. name@upi)' value={upiId} onChange={e => setUpiId(e.target.value)} />
                <div className='upi-apps'>
                  {['📱 GPay', '💜 PhonePe', '🔵 Paytm', '🟠 BHIM'].map(app => (
                    <button type='button' key={app} className='upi-app-btn' onClick={() => setUpiId('')}>{app}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Credit/Debit Card */}
          <div className={`payment-option ${payment === 'card' ? 'selected' : ''}`} onClick={() => setPayment("card")}>
            <div className='payment-option-header'>
              <span className='payment-radio'>{payment === 'card' ? '🔵' : '⚪'}</span>
              <div className='payment-option-title'>
                <p>Credit / Debit Card</p>
                <span>Visa, Mastercard, RuPay</span>
              </div>
              <div className='payment-icons'>
                <span>VISA</span><span>MC</span>
              </div>
            </div>
            {payment === 'card' && (
              <div className='payment-detail card-form'>
                <div className='card-preview'>
                  <div className='card-chip'>💳</div>
                  <div className='card-number-display'>{cardData.number || '•••• •••• •••• ••••'}</div>
                  <div className='card-bottom-row'>
                    <span>{cardData.name || 'CARD HOLDER'}</span>
                    <span>{cardData.expiry || 'MM/YY'}</span>
                  </div>
                </div>
                <input type='text' placeholder='Card Number' value={cardData.number} onChange={e => setCardData(d => ({ ...d, number: formatCard(e.target.value) }))} maxLength={19} />
                <input type='text' placeholder='Cardholder Name' value={cardData.name} onChange={e => setCardData(d => ({ ...d, name: e.target.value.toUpperCase() }))} />
                <div className='multi-field'>
                  <input type='text' placeholder='MM/YY' value={cardData.expiry} onChange={e => setCardData(d => ({ ...d, expiry: formatExpiry(e.target.value) }))} />
                  <input type='text' placeholder='CVV' value={cardData.cvv} onChange={e => setCardData(d => ({ ...d, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))} maxLength={3} />
                </div>
              </div>
            )}
          </div>

          {/* Wallets */}
          <div className={`payment-option ${payment === 'wallet' ? 'selected' : ''}`} onClick={() => setPayment("wallet")}>
            <div className='payment-option-header'>
              <span className='payment-radio'>{payment === 'wallet' ? '🔵' : '⚪'}</span>
              <div className='payment-option-title'>
                <p>Mobile Wallets</p>
                <span>Amazon Pay, MobiKwik, Freecharge</span>
              </div>
            </div>
            {payment === 'wallet' && (
              <div className='payment-detail'>
                <div className='wallet-options'>
                  {['🛒 Amazon Pay', '💙 MobiKwik', '🟢 Freecharge', '🔴 Airtel Money'].map(w => (
                    <div key={w} className={`wallet-option ${wallet === w ? 'selected' : ''}`} onClick={e => { e.stopPropagation(); setWallet(w); }}>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COD */}
          <div className={`payment-option ${payment === 'cod' ? 'selected' : ''}`} onClick={() => setPayment("cod")}>
            <div className='payment-option-header'>
              <span className='payment-radio'>{payment === 'cod' ? '🔵' : '⚪'}</span>
              <div className='payment-option-title'>
                <p>Cash on Delivery</p>
                <span>Pay when your order arrives</span>
              </div>
              <span className='payment-badge'>No charges</span>
            </div>
          </div>

          {/* Stripe */}
          <div className={`payment-option ${payment === 'stripe' ? 'selected' : ''}`} onClick={() => setPayment("stripe")}>
            <div className='payment-option-header'>
              <span className='payment-radio'>{payment === 'stripe' ? '🔵' : '⚪'}</span>
              <div className='payment-option-title'>
                <p>Stripe (International Cards)</p>
                <span>Secure payment via Stripe</span>
              </div>
            </div>
          </div>
        </div>

        <button className='place-order-submit' type='submit' disabled={processing}>
          {processing ? <span className='btn-spinner'>⏳ Processing...</span> : `🚀 Place Order · ${currency}${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}`}
        </button>

        <p className='payment-secure'>🔒 100% secure & encrypted payment</p>
      </div>
    </form>
  )
}

export default PlaceOrder
