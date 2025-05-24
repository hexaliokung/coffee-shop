import React, { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5001/api/products', {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        });
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error('รูปแบบข้อมูลไม่ถูกต้อง');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        if (err.code === 'ECONNREFUSED') {
          setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์กำลังทำงานอยู่');
        } else if (err.code === 'ETIMEDOUT') {
          setError('การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง');
        } else if (err.response) {
          setError(`เกิดข้อผิดพลาด: ${err.response.data.message || 'ไม่สามารถโหลดข้อมูลสินค้าได้'}`);
        } else {
          setError('เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า กรุณาลองใหม่อีกครั้ง');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 0) return true;
    return product.category_id === activeFilter;
  });

  const handleAddToCart = (product) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('ไม่สามารถเพิ่มสินค้าลงตะกร้าได้');
    }
  };

  if (loading) {
    return (
      <div className="shop-loading">
        <div>กำลังโหลดข้อมูลสินค้า...</div>
        <div className="shop-loading-sub">กรุณารอสักครู่</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-container">
        <div className="shop-error">
          <div>{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="shop-error-btn"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className="shop-filter-container">
        <button
          className={`shop-filter-btn${activeFilter === 0 ? " active" : ""}`}
          onClick={() => setActiveFilter(0)}
        >
          ทั้งหมด
        </button>
        <button
          className={`shop-filter-btn${activeFilter === 1 ? " active" : ""}`}
          onClick={() => setActiveFilter(1)}
        >
          กาแฟร้อน
        </button>
        <button
          className={`shop-filter-btn${activeFilter === 2 ? " active" : ""}`}
          onClick={() => setActiveFilter(2)}
        >
          กาแฟเย็น
        </button>
        <button
          className={`shop-filter-btn${activeFilter === 3 ? " active" : ""}`}
          onClick={() => setActiveFilter(3)}
        >
          เครื่องดื่มพิเศษ
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="shop-no-product">
          ไม่พบสินค้าในหมวดหมู่นี้
        </div>
      ) : (
        <div className="shop-product-grid">
          {filteredProducts.map((product) => (
            <div className="shop-product-card" key={product.id}>
              <img className="shop-product-image" src={product.image} alt={product.name} />
              <div className="shop-product-info">
                <h3 className="shop-product-name">{product.name}</h3>
                <p className="shop-product-description">{product.description}</p>
                <p className="shop-product-price">{product.price} บาท</p>
                <button className="shop-add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
