
import React from 'react';


const PRODUCTS = [
  {
    id: 'RG_CIRC_BRACE',
    name: 'Rose Gold Circular Grace Bracelet',
    price: '₹2,999',
    category: 'Bracelet',
  },
  {
    id: 'SV_DAZE_RING',
    name: 'Silver Daze Ring',
    price: '₹2,299',
    category: 'Ring',
  },
  {
    id: 'RG_CIRC_NECK',
    name: 'Rose Gold Circular Grace Necklace',
    price: '₹3,099',
    category: 'Necklace',
  },
  {
    id: 'SV_BELLIS_EAR',
    name: 'Silver Bellis Ear Piercings',
    price: '₹2,099',
    category: 'Earrings',
  },
  {
    id: 'RG_CLASSIC_PENDANT',
    name: 'Rose Gold Classic Pendant With Links',
    price: '₹2,899',
    category: 'Pendant',
  },
  {
    id: 'SV_FLORAL_NECK',
    name: 'Silver Floral Necklace',
    price: '₹2,399',
    category: 'Necklace',
  },
  {
    id: 'SV_GLOW_OVAL_RING',
    name: 'Silver Glowing Oval Ring',
    price: '₹2,499',
    category: 'Ring',
  },
  {
    id: 'SV_CELESTIAL_STAR',
    name: 'Silver Celestial Star Necklace',
    price: '₹2,599',
    category: 'Necklace',
  },
  {
    id: 'ANUSHKA_SOLITAIRE',
    name: 'Anushka Sharma Rose Gold Solitaire Ring',
    price: '₹3,699',
    category: 'Ring',
  },
  {
    id: 'SV_HEARTBEAT_COUPLE',
    name: 'Silver Heartbeat Couple Rings',
    price: '₹4,199',
    category: 'Rings',
  },
  {
    id: 'RG_HUG_ME_MORE',
    name: 'Rose Gold Hug Me More Ring',
    price: '₹2,499',
    category: 'Ring',
  },
  {
    id: 'SV_ZIRCON_BLISS',
    name: 'Silver Zircon Bliss Ring',
    price: '₹2,399',
    category: 'Ring',
  },
];

function ProductSelector({ productId, onChange }) {
  const handleSelect = (id) => {
    if (onChange) onChange(id);
  };

  return (
    <div className="card">
      <h2 className="card-title">GIVA Products</h2>
      <p className="subtext">Tap a product to rate / view its feedback.</p>
      <div className="product-strip">
        {PRODUCTS.map((product) => {
          const selected = product.id === productId;
          return (
            <button
              key={product.id}
              type="button"
              className={`product-card ${selected ? 'selected' : ''}`}
              onClick={() => handleSelect(product.id)}
            >
              <div className="product-image-placeholder">
                {/* You can later replace with real images via <img src="..."/> */}
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-meta">
                  <span className="product-price">{product.price}</span>
                  <span className="product-category">{product.category}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSelector;
