// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, auth, updateProfile } from "./firebase";

// const signupHandler = async (emailVal, passVal, nameVal) => {
//     try {
//         await createUserWithEmailAndPassword(auth, emailVal, passVal);
//         await updateProfile(auth.currentUser, {
//             displayName: nameVal
//         });
//         return { success: true, message: `Welcome, ${nameVal}! You have successfully registered. \n Redirecting... ` };
//     } catch (error) {
//         return { success: false, message: error.message };
//     }
// };

// const loginHandler = async (emailVal, passVal) => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, emailVal, passVal);
//         const user = userCredential.user;
//         if (user) {
//             if (user.displayName) {
//                 return { success: true, user: user,message: `Welcome, ${user.displayName}! You have successfully logged in.` };
//             } else {
//                 return { success: true, user: user,message: `Welcome! You have successfully logged in.` };
//             }
//         } else {
//             return { success: false, message: 'Login failed: User information not available.' };
//         }
//     } catch (error) {
//         return { success: false,  message: error.message };
//     }
// };




// const loginWithGoogle = async () => {

//     const provider = new GoogleAuthProvider();
//     try {
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         if (user) {
//             const displayName = user.displayName || user.email||'User';
//             return { success: true, user: { displayName } };
//         } else {
//             return { success: false, message: 'Google login failed: User information not available.' };
//         }
//     } catch (error) {
//         return { success: false, message: `Google login failed: ${error.message}` };
//     }
// };


// export { signupHandler, loginHandler, loginWithGoogle };


// import { useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, auth, updateProfile } from "./firebase";

const signupHandler = async (emailVal, passVal, nameVal) => {
    try {
        await createUserWithEmailAndPassword(auth, emailVal, passVal);
        await updateProfile(auth.currentUser, {
            displayName: nameVal
        });
        return { success: true, message: `Welcome, ${nameVal}! You have successfully registered. \n Redirecting... ` };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const loginHandler = async (emailVal, passVal) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailVal, passVal);
        const user = userCredential.user;
        if (user) {
            // Store user's authentication state in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            if (user.displayName) {
                return { success: true, user: user,message: `Welcome, ${user.displayName}! You have successfully logged in.` };
            } else {
                return { success: true, user: user,message: `Welcome! You have successfully logged in.` };
            }
        } else {
            return { success: false, message: 'Login failed: User information not available.' };
        }
    } catch (error) {
        return { success: false,  message: error.message };
    }
};

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
            // Store user's authentication state in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            const displayName = user.displayName || user.email||'User';
            return { success: true, user: { displayName } };
        } else {
            return { success: false, message: 'Google login failed: User information not available.' };
        }
    } catch (error) {
        return { success: false, message: `Google login failed: ${error.message}` };
    }
};

// Function to check if user is already logged in
const checkLoggedInUser = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        // Parse the user data from localStorage and return it
        return JSON.parse(loggedInUser);
    }
    return null;
};

export { signupHandler, loginHandler, loginWithGoogle, checkLoggedInUser };
