<template>
    <v-btn class="btn-social btn-google" @click="loginGoogle()"><v-icon class="icon-social">mdi-google-plus</v-icon> Đăng nhập bằng Google</v-btn>
</template>

<script>
import * as firebase from 'firebase'

export default {
    methods: {
        loginGoogle()
        {
            var provider_google = new firebase.auth.GoogleAuthProvider();
            provider_google.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().languageCode = 'pt';
            provider_google.setCustomParameters({
            'login_hint': 'thaibinhblack@gmail.com'
            });
            firebase.auth().signInWithPopup(provider_google).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token,user)
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
            firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                console.log(token)
            }
            // The signed-in user info.
            var user = result.user;
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
        }
    }
}
</script>