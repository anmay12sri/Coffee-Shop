import React, { useState, useEffect } from "react";
import { checkLoggedInUser } from "../../authFunctions";
import Logo from "../../assets/coffee-logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { getDatabase, ref, onValue, get } from "firebase/database";
import OrderDetailsModal from "./OrderDetailsModal";
import "../../App.css";
import {
    signupHandler,
    loginHandler,
    loginWithGoogle,
} from "../../authFunctions";

const Menus = [
    {
        id: 1,
        name: "Home",
        link: "/#",
    },
    {
        id: 2,
        name: "Menu",
        link: "/#services",
    },
    {
        id: 3,
        name: "About",
        link: "/#about",
    },
];

const Navbar = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [orderCount, setOrderCount] = useState(null); 
    const [orderDetails, setOrderDetails] = useState(null);


    useEffect(() => {
        const user = checkLoggedInUser();
        if (user) {
            setLoggedInUser(user.displayName);
            const db = getDatabase();
            const cartRef = ref(db, `Carts/${user.uid}`);
            onValue(cartRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const productIds = Object.keys(data);
                    const totalCount = productIds.length;
                    setOrderCount(totalCount);
                    console.log(totalCount);
                } else {
                    setOrderCount(0);
                }
            });
        }
    }, []);





    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const { success, user, message } = await loginHandler(email, password);
            if (success) {
                setUsername("");
                setEmail("");
                setPassword("");
                setSuccessMessage(message);
                setTimeout(() => {
                    setSuccessMessage("");
                    setLoginModalOpen(false);
                    setLoggedInUser(user.displayName);
                    const db = getDatabase();
                    const cartRef = ref(db, `Carts/${user.uid}`);
                    onValue(cartRef, (snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            const productIds = Object.keys(data);
                            const totalCount = productIds.length;
                            setOrderCount(totalCount);
                        } else {
                            setOrderCount(0);
                        }
                    });
                }, 1000);
            } else {
                setSuccessMessage("");
                setErrorMessage(message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 1000);
            }
        } catch (error) {
            console.error("Login error:", error.message);
            setSuccessMessage("");
            setErrorMessage(`Login failed: ${error.message}`);
            setTimeout(() => {
                setErrorMessage("");
            }, 1000);
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            const { success, user, message } = await loginWithGoogle();

            if (success) {
                setLoggedInUser(user.displayName);
                setSuccessMessage(`Welcome, ${user.displayName}! You have successfully logged in with Google.`);
                setTimeout(() => {
                    setSuccessMessage("");
                    setLoginModalOpen(false);
                }, 2000);
            } else {
                setErrorMessage(message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error("Google login error:", error.message);
            setErrorMessage(`Google login failed: ${error.message}`);
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = await signupHandler(email, password, username);
            if (success) {
                setUsername("");
                setEmail("");
                setPassword("");
                setSuccessMessage(message);
                setTimeout(() => {
                    setSuccessMessage("");
                }, 2000);

                setTimeout(() => {
                    setIsSignUp(false);
                }, 1500);
            } else {
                setSuccessMessage("");
                setErrorMessage(message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error("Sign-up error:", error.message);
            setSuccessMessage("");
            setErrorMessage(`Sign-up failed: ${error.message}`);
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
        setOrderCount(null);
    };

    const handleLoginClick = () => {
        setIsSignUp(false);
        setLoginModalOpen(true);
    };

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleModalClose = () => {
        setLoginModalOpen(false);
    };

    const handleShowOrder = async () => {
        const user = checkLoggedInUser();
        try {
            const db = getDatabase();
            const cartRef = ref(db, `Carts/${user.uid}`);
            const snapshot = await get(cartRef);

            if (snapshot.exists()) {
                const cartData = snapshot.val();
                const itemIds = Object.keys(cartData); 
                const itemsArray = []; 

                // Iterate through each item ID
                for (const itemId of itemIds) {
                    const orderRef = ref(db, `Carts/${user.uid}/${itemId}`);
                    const orderSnapshot = await get(orderRef);
                    const orderDetails = orderSnapshot.val();
                    itemsArray.push(orderDetails);
                }
                setOrderDetails(itemsArray);
            } else {
                console.log('No items found in the cart.');
            }
        } catch (error) {
            console.error('Error fetching item IDs:', error);
        }
    };




    const handleOrderModalClose = () => {
        setOrderDetails(null);
    };

    return (
        <div className="bg-gradient-to-r from-secondary to-secondary/90 text-white">
            <div className="container py-2">
                <div className="flex justify-between items-center gap-4">
                    {/* Logo section */}
                    <div>
                        <a href="#"
                            className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive">
                            <img src={Logo} alt="Logo" className="w-16 text-white" />
                            Café Nirvana
                        </a>
                    </div>
                    {/* Link section */}
                    <div className="flex justify-between items-center gap-4">
                        <ul className="hidden sm:flex items-center gap-4">
                            {Menus.map((menu, index) => (
                                <li key={index}>
                                    <a
                                        href={menu.link}
                                        className="inline-block text-xl py-4 px-4 text-white/70 hover:text-white hover:underline duration-200"
                                    >
                                        {menu.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-4">
                            {/* Login Button */}
                            {loggedInUser ? (
                                <div className="flex items-center gap-4">
                                    <span>Welcome, {loggedInUser}!</span>
                                    <button
                                        className="bg-primary/70 py-2 px-4 rounded-full hover:scale-105 duration-200"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="bg-primary/70 py-2 px-4 rounded-full hover:scale-105 duration-200"
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </button>
                            )}

                            {/* Order Button */}
                            <div className="relative">
                                <button
                                    className="bg-primary/70 py-2 px-4 rounded-full hover:scale-105 duration-200 flex items-center gap-2"
                                    onClick={() => handleShowOrder({ name: 'Coffee' })}
                                >
                                    Order
                                    <FaShoppingCart className="text-xl cursor-pointer" />
                                </button>
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-sm px-2">
                                    {orderCount !== null && orderCount} {/* Render order count only when it's not null */}
                                </span>

                                {orderDetails && (
                                    <OrderDetailsModal orderDetails={orderDetails} onClose={handleOrderModalClose} />
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isLoginModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#f5d9c6] p-8 rounded shadow-lg w-96 relative">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={handleModalClose}
                        >
                            &#10005; {/* Cross mark */}
                        </button>

                        {isSignUp ? (
                            // Sign-Up form
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-center text-brown">Sign Up</h3>
                                <form onSubmit={handleSignUpSubmit}>
                                    {/* Username input */}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-gray-700 font-bold" htmlFor="username">
                                            Username:
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            className="border w-full p-2 rounded text-black"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    {/* Email ID input */}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-gray-700 font-bold" htmlFor="email">
                                            Email ID:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="border w-full p-2 rounded text-black"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {/* Password input */}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-gray-700 font-bold" htmlFor="password">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="border w-full p-2 rounded text-black"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    {/* Sign-Up button */}
                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="submit"
                                            className="bg-primary text-brown px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
                                        >
                                            Sign Up
                                        </button>
                                    </div>

                                    {successMessage && (
                                        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded">
                                            {successMessage}
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="fixed bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded">
                                            {errorMessage}
                                        </div>
                                    )}
                                </form>
                            </div>
                        ) : (
                            // Login form
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-center text-brown">Login</h3>
                                <form onSubmit={handleLoginSubmit}>
                                    {/* Username input */}
                                    <div className="mb-4 text-brown">
                                        <label className="block mb-2 text-gray-700 font-bold" htmlFor="email">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="border w-full p-2 rounded text-black"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {/* Password input */}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-gray-700 font-bold" htmlFor="password">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="border w-full p-2 rounded text-black"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {/* Sign in with Google */}
                                    <div className="flex justify-center">
                               <button
                                     type="button"
                               className="login-with-google-btn right"
                               onClick={handleLoginWithGoogle}
                                 >
                         Sign in with Google
                             </button>
                            </div>

                                    {/* Login button */}
                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="submit"
                                            className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
                                        >
                                            Login
                                        </button>
                                    </div>

                                    {/* Sign up link */}
                                    <div className="mt-4 text-center text-sm text-gray-700">
                                        <span>New here?</span>
                                        <button
                                            type="button"
                                            className="text-primary hover:underline ml-1 cursor-pointer"
                                            onClick={handleSignUpClick}
                                        >
                                            Sign up here
                                        </button>
                                    </div>

                                    {successMessage && (
                                        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded">
                                            {successMessage}
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="fixed bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded">
                                            {errorMessage}
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Navbar;
