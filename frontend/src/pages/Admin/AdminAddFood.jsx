import React, { useContext, useState } from 'react'
import './AdminPages.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const categories = ["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"]

const AdminAddFood = () => {
  const { url } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const [data, setData]   = useState({ name:"", description:"", price:"", category:"Salad" });
  const [loading, setLoading] = useState(false);

  const onChange = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) { toast.error('Please select an image'); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append("name",        data.name);
    formData.append("description", data.description);
    formData.append("price",       Number(data.price));
    formData.append("category",    data.category);
    formData.append("image",       image);
    try {
      const res = await axios.post(`${url}/api/food/add`, formData);
      if (res.data.success) {
        toast.success("✅ Food item added!");
        setData({ name:"", description:"", price:"", category:"Salad" });
        setImage(null);
      } else {
        toast.error(res.data.message);
      }
    } catch { toast.error("Failed to add item"); }
    finally { setLoading(false); }
  };

  return (
    <div className='admin-page'>
      <div className='admin-page-header'>
        <h1>➕ Add Food Item</h1>
        <p>Add a new dish to the SwiftBite menu</p>
      </div>

      <form className='admin-add-form' onSubmit={onSubmit}>
        {/* Image Upload */}
        <div className='admin-form-group'>
          <label>Food Image</label>
          <div className='img-upload-area' onClick={() => document.getElementById('food-img').click()}>
            {image
              ? <img src={URL.createObjectURL(image)} alt='preview' className='img-preview' />
              : <div className='img-placeholder'><span>📷</span><p>Click to upload image</p></div>
            }
            <input id='food-img' type='file' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
          </div>
        </div>

        <div className='admin-form-group'>
          <label>Food Name</label>
          <input name='name' type='text' placeholder='e.g. Grilled Chicken Salad' value={data.name} onChange={onChange} required />
        </div>

        <div className='admin-form-group'>
          <label>Description</label>
          <textarea name='description' rows={4} placeholder='Describe the dish...' value={data.description} onChange={onChange} required />
        </div>

        <div className='admin-form-row'>
          <div className='admin-form-group'>
            <label>Category</label>
            <select name='category' value={data.category} onChange={onChange}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className='admin-form-group'>
            <label>Price ($)</label>
            <input name='price' type='number' placeholder='12.99' value={data.price} onChange={onChange} required min="1" />
          </div>
        </div>

        <button type='submit' className='admin-submit-btn' disabled={loading}>
          {loading ? '⏳ Adding...' : '➕ Add to Menu'}
        </button>
      </form>
    </div>
  )
}

export default AdminAddFood
