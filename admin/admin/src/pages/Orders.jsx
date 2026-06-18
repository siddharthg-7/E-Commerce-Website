import React from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from "react-toastify"
import { assets } from '../assets/assets'

const Orders = ({ token, setToken }) => {
  const [orderdata, setorderdata] = React.useState([]);

  const fetchdata = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, { headers: { token } })
      if (response.data.success) {
        setorderdata(response.data.orders);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  }

  const statushandler = async (event, orderId) => {
    try {
      const response = await axios.put(`${backendUrl}/api/order/updateorder`, { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchdata()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  }

  React.useEffect(() => {
    fetchdata();
  }, [token])

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>
      <div className="space-y-4">
        {orderdata.map((order, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm bg-white p-4 sm:p-5 lg:p-6"
          >
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6">

              {/* Icon */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={assets.parcel_icon}
                  alt="parcel"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">

                {/* Products */}
                <div className="space-y-1">
                  {order.items?.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm text-gray-700"
                    >
                      <span className="font-medium">{item.name}</span> ×{" "}
                      {item.quantity}
                      <span className="text-gray-500">
                        ({item.size})
                      </span>
                    </p>
                  ))}
                </div>

                {/* Customer */}
                <p className="mt-3 text-sm sm:text-base lg:text-lg font-semibold">
                  {order.address.firstname} {order.address.lastname}
                </p>

                {/* Address */}
                <div className="mt-2 text-xs sm:text-sm text-gray-600">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>

                <p className="mt-2 text-xs sm:text-sm">
                  {order.address.phone}
                </p>

                <p className="mt-3 font-semibold text-green-600 text-sm sm:text-base">
                  Total: {currency}
                  {order.amount}
                </p>
              </div>

              {/* Status Section */}
              <div className="w-full md:w-56 lg:w-64 flex flex-col gap-3">
                <select onChange={(event)=>statushandler(event,order._id)}
                  className="border rounded px-3 py-2 text-sm w-full" value={order.status}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                </select>

                <div className="text-xs sm:text-sm space-y-1">
                  <p>
                    <span className="font-medium">Items:</span>{" "}
                    {order.items.length}
                  </p>

                  <p>
                    <span className="font-medium">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>

                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    {order.status}
                  </p>

                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders