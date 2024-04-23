import { useLocation } from "react-router-dom";
import "./transaction.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateOrder, getUsers, getProducts } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const users = useSelector((state) => state.client.users);
  const products = useSelector((state) => state.product.products);
  const [sta, setStatus] = useState("");
  const dispatch = useDispatch();

  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  const user = users.find((user) => user._id === order.userId);

  useEffect(() => {
    getUsers(dispatch);
    getProducts(dispatch);
    // Set the initial status value when the order is loaded
    setStatus(order.status);
  }, [dispatch, order.status]);

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const orders = {
      status: sta,
    };
    updateOrder(order._id, orders, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Transaction</h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Customer Name</label>
            <input type="text" placeholder={user.full_name} id="Full Name" />
            <label>Product Desc</label>
            {order.products.map((product, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={
                    products.find((p) => p._id === product.productId)?.title
                  }
                  id={`productId_${index}`}
                />
                <input
                  type="text"
                  placeholder={product.quantity}
                  id={`quantity_${index}`}
                />
              </div>
            ))}
            <label>Amount</label>
            <input type="text" placeholder={order.amount} id="amount" />
            <label>Address</label>
            <input
              type="text"
              placeholder={order.address.address_line_1}
              id="address"
            />
            <label htmlFor="status">Status</label>
            <select id="status" onChange={handleStatus} value={sta}>
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              <option value="uncompleted">uncompleted</option>
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
