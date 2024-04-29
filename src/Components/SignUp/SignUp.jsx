// import React, { useState } from "react";

// const SignUp = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSignUpSubmit = (e) => {
//         e.preventDefault();
//         // Add your sign-up logic here (e.g., send data to a server)
//         console.log("Signing up with", { username, email, password });
//         // Clear form fields after submission
//         setUsername("");
//         setEmail("");
//         setPassword("");
//     };

//     return (
//         <div className="container mx-auto p-8">
//             <h3 className="text-2xl font-semibold mb-4 text-center">Sign Up</h3>
//             <form onSubmit={handleSignUpSubmit}>
//                 {/* Username input */}
//                 <div className="mb-4">
//                     <label className="block mb-2" htmlFor="username">
//                         Username:
//                     </label>
//                     <input
//                         type="text"
//                         id="username"
//                         className="border w-full p-2 rounded"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 {/* Email input */}
//                 <div className="mb-4">
//                     <label className="block mb-2" htmlFor="email">
//                         Email:
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         className="border w-full p-2 rounded"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 {/* Password input */}
//                 <div className="mb-4">
//                     <label className="block mb-2" htmlFor="password">
//                         Password:
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="border w-full p-2 rounded"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 {/* Sign Up button */}
//                 <div className="flex justify-center mt-4">
//                     <button
//                         type="submit"
//                         className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
//                     >
//                         Sign Up
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default SignUp;


import React, { useState } from "react";
import { signupHandler } from "../../authFunctions"; // Import the signupHandler function

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await signupHandler(email, password, username);
      if (success) {
        // Clear form fields after successful sign-up
        setUsername("");
        setEmail("");
        setPassword("");
        // Show success message
        setShowSuccessMessage(true);
      } else {
        // Handle sign-up failure
        console.error("Sign-up failed");
      }
    } catch (error) {
      // Handle sign-up errors (e.g., show error message)
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h3 className="text-2xl font-semibold mb-4 text-center">Sign Up</h3>
      <form onSubmit={handleSignUpSubmit}>
        {/* Username input */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="border w-full p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* Email input */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border w-full p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password input */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border w-full p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Sign Up button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
