import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, set } from 'firebase/database';
import { auth } from "../../firebase";
import { checkLoggedInUser } from "../../authFunctions";
import coffee from "../../assets/coffee.png";
import coffee2 from "../../assets/white-coffee.png";
import sandwich from "../../assets/suea-sivilaisith-VsaXdUF-fnE-unsplash (1).jpg"
import tea from "../../assets/pexels-chiecharon-1187317-removebg-preview (1).png";
import burger from "../../assets/cheeseburger-removebg-preview.png";



const ServicesData = [
  {
    id: 1,
    img: coffee,
    name: "Espresso",
    desc: "Strong coffee made with 7-8 grams of coffee powder and the pouring time is 20-21 sec. Also, its volume is 30 ml",
    aosDelay: "100",
    price: 100,
  },
  {
    id: 2,
    img: coffee2,
    name: "Americano",
    desc: "Mild coffee with more water and smooth taste.",
    aosDelay: "300",
    price: 120,
  },
  {
    id: 3,
    img: sandwich,
    name: "Sandwich",
    desc: "A perfect breakfast like sandwich never exist",
    aosDelay: "500",
    price: 90,
  },
  {
    id: 4,
    img: tea,
    name: "Tea",
    desc: "Tea with steamed milk and ginger.",
    aosDelay: "500",
    price: 30,
  }, {
    id: 5,
    img: coffee,
    name: "Cappuccino", 
    desc: "Coffee with steamed milk and foam.",
    aosDelay: "500",
    price: 170,
  }, {
    id: 6,
    img: burger,
    name: "Cheese Burger",
    desc: "A special burger to make your mouth say more and more...",
    aosDelay: "500",
    price: 80,
  },
];



const Services = ({ addToCart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);


  const handleBuyNow = (service) => {
    const user = checkLoggedInUser();
    if (!user) return alert("Please login first!");

    addToCart(service);
    addToFirebase(service);
    alert(`${service.name} added to order!`);
  };


  const addToFirebase = (service) => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const db = getDatabase();
      const userCartRef = ref(db, `Carts/${uid}`);
      const newCartItemRef = push(userCartRef);
      const newCartItem = {
        id: service.id,
        name: service.name,
        price: service.price,
        img: service.img,
        desc: service.desc,
      };
      set(newCartItemRef, newCartItem)
        .then(() => {
          console.log('Cart item added to Firebase Realtime Database successfully!', auth.currentUser);
        })
        .catch((error) => {
          console.error('Error adding cart item to Firebase Realtime Database:', error);
        });
    } else {
      console.error('User not logged in');
      alert('User not logged in');
    }
  };

  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          {/* Header title */}
          <div data-aos="fade-up" className="text-center mb-20">
            <h1 className="text-4xl font-bold font-cursive text-gray-800">
              Menu
            </h1>
          </div>
          {/* Services Card Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-10 place-items-center row-gap-10">
            {ServicesData.map((service) => {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-delay={service.aosDelay}
                  key={service.id}
                  className="rounded-2xl bg-white hover:bg-primary hover:text-white shadow-xl duration-200 max-w-[300px] group relative hover:transition-transform"
                >
                  {/* Image Section */}
                  <div className="h-[122px]">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-110 group-hover:rotate-6 duration-300"
                    />
                  </div>
                  {/* Text Content */}
                  <div className="p-4 text-center">
                    <h1 className="text-xl font-bold">{service.name}</h1>
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                      {service.desc}
                    </p>
                    {/* Display price */}
                    <p className={`mt-2 ${service.hover ? 'text-white' : 'text-black-700'}`}>
                      Rs. {service.price}
                    </p>
                    {/* Buy Now button */}
                    {isLoggedIn && (
                      <button className="mt-3 bg-primary text-white py-1 px-4 rounded hover:bg-secondary" onClick={() => handleBuyNow(service)}>
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;