import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5001/api/orders/history', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('ไม่สามารถโหลดประวัติการสั่งซื้อได้');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  if (loading) {
    return (
      <div className="order-history-loading">
        <div>กำลังโหลดประวัติการสั่งซื้อ...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-error">
        <div>{error}</div>
        <button onClick={() => window.location.reload()} className="retry-button">
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">ประวัติการสั่งซื้อ</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">ยังไม่มีประวัติการสั่งซื้อ</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">คำสั่งซื้อ #{order.id}</div>
                <div className="order-date">{formatDate(order.createdAt)}</div>
              </div>
              
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-quantity">จำนวน: {item.quantity}</div>
                      <div className="item-price">{item.price} บาท</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-status" data-status={order.status}>
                  {order.status === 'completed' ? 'เสร็จสมบูรณ์' :
                   order.status === 'pending' ? 'รอการยืนยัน' :
                   order.status === 'cancelled' ? 'ยกเลิก' : order.status}
                </div>
                <div className="order-total">
                  รวมทั้งหมด: {order.total} บาท
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 