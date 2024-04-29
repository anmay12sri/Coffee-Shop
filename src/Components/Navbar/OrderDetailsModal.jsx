import React, { useState, useEffect, useRef } from "react";

const OrderDetailsModal = ({ orderDetails, onClose }) => {
  const [showPaymentPage, setShowPaymentPage] = useState(false); // State to control rendering of PaymentPage

  const paymentPageRef = useRef(null);

  const displayOrderDetails = orderDetails.map((item, index) => (
    <div key={index} className="flex items-center gap-4 py-2">
      <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div>
        <h4 className="text-xl font-semibold">{item.name}</h4>
        <p className="text-gray-600">{item.desc}</p>
        <p className="text-primary font-semibold">Price: Rs {item.price}</p>
      </div>
    </div>
  ));

  const totalAmount = orderDetails.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    setShowPaymentPage(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentPage(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentPageRef.current && !paymentPageRef.current.contains(event.target)) {
        setShowPaymentPage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#f5d9c6] p-8 rounded-lg shadow-lg w-[400px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div>
          {displayOrderDetails}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-black">Total: Rs {totalAmount}</p>
          <button
            className="bg-primary text-white px-6 py-2 rounded cursor-pointer hover:bg-primary-dark"
            onClick={handleCheckout} // Trigger checkout
          >
            Checkout
          </button>
        </div>
      </div>
      {/* Conditionally render PaymentPage */}
      {showPaymentPage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={paymentPageRef} className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handlePaymentClose}
            >
              &#10005;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Options</h2>
            <div className="flex flex-col gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Debit Card
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Credit Card
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Paytm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;

/*import React, { useState } from "react";
import { auth } from "../../firebase";
import { getDatabase, ref, remove } from "firebase/database";

const OrderDetailsModal = ({ orderDetails, onClose }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [details, setDetails] = useState(orderDetails); // Define orderDetails state

    const itemsPerPage = 4;

    const handleClickNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < details.length) {
            setStartIndex(nextIndex);
        }
    };

    const handleClickPrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0) {
            setStartIndex(prevIndex);
        }
    };

    const handleRemoveItem = (itemId) => {
        // Remove item from Firebase database
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const db = getDatabase();
            const itemRef = ref(db, `Carts/${uid}/${itemId}`);
            remove(itemRef)
                .then(() => {
                    console.log("Item removed successfully");
                    // Update the orderDetails state to remove the item from the list
                    const updatedDetails = details.filter(item => item.itemId !== itemId);
                    setDetails(updatedDetails);
                })
                .catch((error) => {
                    console.error("Error removing item:", error);
                });
        }
    };

    const displayOrderDetails = details
        .slice(startIndex, startIndex + itemsPerPage)
        .map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                        <h4 className="text-xl font-semibold">{item.name}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                        <p className="text-primary font-semibold">Price: ${item.price}</p>
                    </div>
                </div>
                <button className="text-red-500" onClick={() => handleRemoveItem(item.itemId)}>
                    &#8722;
                </button>
            </div>
        ));

    const totalAmount = details.reduce((total, item) => total + item.price, 0);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#f5d9c6] p-8 rounded shadow-lg w-96 relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
                    &#10005;
                </button>
                <div>{displayOrderDetails}</div>
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
                        onClick={handleClickPrev}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
                        onClick={handleClickNext}
                    >
                        Next
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-lg font-semibold">Total: ${totalAmount}</p>
                    <button
                        className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-dark mt-2"
                        onClick={() => {
                            console.log("Checkout clicked");
                        }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
*/
