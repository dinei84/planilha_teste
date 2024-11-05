// firebaseConfig.js

const firebaseConfig = {
  apiKey: "AIzaSyDcpggR7jf2BEPNLqRj1Iz368F0dDtD1-4",
  authDomain: "planilha-8938f.firebaseapp.com",
  projectId: "planilha-8938f",
  storageBucket: "planilha-8938f.appspot.com",
  messagingSenderId: "211015132743",
  appId: "1:211015132743:web:45f443dc9e65b72fe37362",
};
firebase.initializeApp(firebaseConfig);

// Exporta a instância do Firestore
const fretes = firebase.firestore();
