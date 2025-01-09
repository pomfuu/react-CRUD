import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [editingOrderIndex, setEditingOrderIndex] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Orders'));
        const orderData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const handleEditOrder = (index) => {
    setEditingOrderIndex(index);
    setEditedStatus(orders[index].status);
  };

  const handleSaveOrderStatus = async (id) => {
    try {
      const orderRef = doc(db, 'Orders', id);
      await updateDoc(orderRef, { status: editedStatus });
      const updatedOrders = orders.map((order, idx) =>
        idx === editingOrderIndex ? { ...order, status: editedStatus } : order
      );
      setOrders(updatedOrders);
      setEditingOrderIndex(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelOrderEdit = () => {
    setEditingOrderIndex(null);
    setEditedStatus("");
  };

  return (
    <div style={{ marginLeft: "20%", marginTop: "2%", maxWidth: "60%", fontFamily: 'afacad' }}>
      <h2 style={{ marginBottom: "1vw", color: "#1A47BC", fontFamily: 'afacad' }}>Orders</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Total Price</th>
            <th>Status</th>
            <th>Product Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>Rp {order.totalPrice}</td>
              <td>
                {editingOrderIndex === index ? (
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="Packed">Packed</option>
                    <option value="Sent">Sent</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                {order.product.map((product, idx) => (
                  <div key={idx} style={{ display: 'flex', marginBottom: '10px' }}>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{
                        width: '100px',
                        height: '100px',
                        marginRight: '1vw',
                        borderRadius: '5px',
                      }}
                    />
                    <div>
                      <strong>{product.productName}</strong>
                      <div>Quantity: {product.quantity}</div>
                      <div>Color: {product.selectedColor || '-'}</div>
                      <div>Size: {product.selectedSize || '-'}</div>
                      <div>Variant: {product.selectedVariant || '-'}</div>
                    </div>
                  </div>
                ))}
              </td>
              <td>
                {editingOrderIndex === index ? (
                  <>
                    <button onClick={() => handleSaveOrderStatus(order.id)} className="btn btn-primary me-2">Save</button>
                    <button onClick={handleCancelOrderEdit} className="btn btn-secondary">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditOrder(index)} className="btn btn-primary">Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
