// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const initialize = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDuHffOAScisS7rP3TvtIDK4IzE0gX-cCc",
    authDomain: "shop-exam-1209.firebaseapp.com",
    projectId: "shop-exam-1209",
    storageBucket: "shop-exam-1209.appspot.com",
    messagingSenderId: "921916323426",
    appId: "1:921916323426:web:965fd2638ade994832833b",
    measurementId: "${config.measurementId}",
  };

  // Initialize Firebase
  try {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  } catch (e) {
    console.log(e);
  }
};
