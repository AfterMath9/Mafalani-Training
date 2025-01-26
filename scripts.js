import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCfjPISsTh-Wa7oVdQNNv0SiDHiOcItOE8",
    authDomain: "mafalani-courses.firebaseapp.com", // Replace with your actual authDomain
    projectId: "mafalani-courses", // Replace with your actual projectId
    storageBucket: "mafalani-courses.firebasestorage.app", // Replace with your actual storageBucket
    messagingSenderId: "126669098322", // Replace with your actual messagingSenderId
    appId: "1:126669098322:web:0e8cee2d53c2f695983e8b", // Replace with your actual appId
    measurementId: "G-LJVKBLHXDW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Apply dark mode on page load
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
}

// Profile Picture Upload
const profilePic = document.getElementById("profile-pic");
const profileUpload = document.createElement("input");
profileUpload.type = "file";
profileUpload.accept = "image/*";
profileUpload.style.display = "none";

profileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("profile-upload-btn").addEventListener("click", () => {
    profileUpload.click();
});

// Profile Dropdown
const profile = document.getElementById("profile");
const dropdownContent = document.getElementById("dropdown-content");

profile.addEventListener("click", () => {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!profile.contains(event.target)) {
        dropdownContent.style.display = "none";
    }
});

// Check Authentication State
onAuthStateChanged(auth, (user) => {
    const googleLoginButton = document.getElementById("google-login");
    const signOutButton = document.getElementById("sign-out");

    if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        if (googleLoginButton) googleLoginButton.style.display = "none";
        if (signOutButton) signOutButton.style.display = "block";
    } else {
        // No user is signed in
        console.log("No user is signed in.");
        if (googleLoginButton) googleLoginButton.style.display = "block";
        if (signOutButton) signOutButton.style.display = "none";
    }
});

// Handle Google Sign-In
const googleLoginButton = document.getElementById("google-login");
if (googleLoginButton) {
    googleLoginButton.addEventListener("click", async() => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Logged in user:", user);
            // Redirect to the home page after sign-in
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error during login:", error);
            alert("Error during login. Please check the console for details.");
        }
    });
}

// Handle Sign-Out
const signOutButton = document.getElementById("sign-out");
if (signOutButton) {
    signOutButton.addEventListener("click", async() => {
        try {
            await signOut(auth);
            console.log("User signed out");
            // Redirect to the home page after sign-out
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    });
}