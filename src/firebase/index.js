import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_Hv8FdER8BIrrT5xIX5ggJtTBtIPXfZY",
  authDomain: "fir-react-upload-aee04.firebaseapp.com",
  projectId: "fir-react-upload-aee04",
  storageBucket: "fir-react-upload-aee04.appspot.com",
  messagingSenderId: "234490214883",
  appId: "1:234490214883:web:203e752e94583ac10a08d6",
  measurementId: "G-2EF1D4L315",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
