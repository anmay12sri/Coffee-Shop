import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Services from "./Components/Services/Services";
import Banner from "./Components/Banner/Banner";
import AppStore from "./Components/AppStore/AppStore";
import Testimonial from "./Components/Testimonial/Testimonial";
import Footer from "./Components/Footer/Footer";

const App = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 700,
            easing: "ease-in-sine",
            delay: 100,
        });
    }, []);

    // Cart state
    const [cart, setCart] = useState([]);

    // Function to add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Calculate the cart count (number of items in the cart)
    const cartCount = cart.length;

    return (
        <div className="overflow-x-hidden">
            <Navbar cartCount={cartCount} />
            <Home />
            <Services addToCart={addToCart} />
            <Banner />
            <AppStore />
            <Testimonial />
            <Footer />
        </div>
    );
};

export default App;
