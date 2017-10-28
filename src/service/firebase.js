import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyClaDqoXpLOl0bCpl56QqkLkWd542KMlDM',
  authDomain: 'vue-pwa-a240a.firebaseapp.com',
  databaseURL: 'https://vue-pwa-a240a.firebaseio.com',
  storageBucket: 'vue-pwa-a240a.appspot.com',
  messagingSenderId: '4034683402'
}

firebase.initializeApp(config)

export default {
  database: firebase.database()
}
