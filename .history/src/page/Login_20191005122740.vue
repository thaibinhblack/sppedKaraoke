<template>
    <div id="page-login-resignter">
        
        <header-tool-bar />
        <v-container grid-list-xs>
            <v-row class="bg-header-top">
                <v-col cols="12" md=6 class="form-login">
                    <div class="form-group-login">
                        <v-btn class="btn-social btn-facebook" @click="loginFacebook()"><v-icon class="icon-social">mdi-facebook</v-icon> Đăng nhập bằng Facebook</v-btn>
                        <v-btn class="btn-social btn-google" @click="loginGoogle()"><v-icon class="icon-social">mdi-google-plus</v-icon> Đăng nhập bằng Google</v-btn>
                        <div class="or">
                            <span>Hoặc</span>
                            {{token}}
                        </div>
                        <v-form @submit.prevent="Login()">
                            <div class="group-login">
                                 <input type="text" class="input-login" placeholder="Email" v-model="user.EMAIL" />
                            </div>
                            <div class="group-login">
                                 <input type="password" class="input-login" placeholder="Password"  v-model="user.PASSWORD" />
                            </div>
                            <div class="group-login row">
                                <v-col cols="12" sm="6"> 
                                </v-col>
                                <v-col cols="12" sm="6" style="text-align:right">
                                    <a class="forget-password" href="#"><small>Quên mật khẩu?</small></a>
                                </v-col>
                            </div>
                            <div class="group-login">
                                <button class="btn-login" type="submit"><v-icon class="icon-login">mdi-login</v-icon> Đăng nhập</button>
                            </div>
                            <div class="group-login">
                                <span style="font-size:13px;">Bạn chưa có tài khoản?</span> <span class="resigter" style="font-size:13px; margin-left:15px;"><a href="#">Đăng ký</a></span>
                            </div>
                        </v-form>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-overlay :value="$store.state.loading" style="color:#fff;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import * as firebase from 'firebase'
import Vue from 'vue'
import { async } from 'q';
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue')
    },
    data()
    {
        return {
            token: null,
            user: {}
        }
    },
    methods: {
        async loginFacebook()
        {
            var provider = await new firebase.auth.FacebookAuthProvider();
            await provider.addScope('user_birthday');
            firebase.auth().languageCode = await 'fr_FR';
            await provider.setCustomParameters({
            'display': 'popup'
            });
            var token = await ''
            var user = await ''
            await firebase.auth().signInWithPopup(provider).then( async (result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                token = await result.credential.accessToken;
                
                user = await result.user;
                console.log(token)

                // ...
                }).catch(function(error) {
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
            });
            await this.$session.start()
            await console.log('token',token)
            await this.$session.start()
            if(token != '' && user != '')
            {
                this.$session.set('token_social',token)
                this.$session.set('user_social',user)
                this.$router.push('manager-karaoke/dashboard')
            }
            
        },
        async loginGoogle()
        {
            var provider_google = await new firebase.auth.GoogleAuthProvider();
            await provider_google.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().languageCode = await 'pt';
            var token = await ''
            var user = await ''
            await provider_google.setCustomParameters({
            'login_hint': 'thaibinhblack@gmail.com'
            });
            await firebase.auth().signInWithPopup(provider_google).then( async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            token = await result.credential.accessToken;
            // The signed-in user info.
            user = await result.user;
            await console.log('google 1',user)
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
            });
           
            await console.log('google',user)
            if(token != '' && user != '')
            {
                this.$session.set('token_social',token)
                this.$session.set('user_social',user)
                this.$router.push('./manager-karaoke/dashboard')
            } 
        },
        Login()
        {
            this.$http.post(this.$store.state.API_URL + 'user/login',this.user)
            .then((response) => {
                if(response.data != false)
                {   
                     this.$session.set('token', response.data)
                    console.log(response.data)
                    this.$router.push('/manager-karaoke/dashboard')
                }
               
            })
        }
        
    },
    created()
    {
        
        console.log(this.$session.get('token'))
        if(this.$session.has('token_social') || this.$session.has('user_social'))
        {
            console.log(this.$session.get('toen_facebook'))
            this.$router.push('manager-karaoke/dashboard')
        }
    }
}
</script>
<style  scoped>
#page-login-resignter {background: #fff;}
.form-login {margin: auto}
.text-logo {color: #333;}
.form-group-login {padding: 50px;background: #fff;border: 1px solid #e2e2e2;}
.form-group-login .btn-social {width: 100%;}
.btn-facebook {background-color: #3d5a98 !important;border: 1px solid #3d5a98;color: #fff;}
.btn-google {background-color: #ea4335 !important;border: 1px solid #ea4335;}
.btn-facebook:hover,.btn-google:hover {background-color: #fff !important;color: #3d5a98 !important;}
.btn-google:hover {color: #ea4335 !important}
.btn-social {height: 45px;margin: 10px 0;color: #fff !important;}
.icon-social {float: left;}
.or {    border-bottom: 1px solid #dedede;width: 90%;margin: 0 auto 30px; text-align: center}
.or span {    position: relative;top: 12px; padding: 0 25px;background: #fff;}
.input-login {padding: 10px 15px; border: 1px solid #e2e2e2;width: 100%;border-radius: 5px;font-size: 14px;}
.group-login {margin: 15px 0;}
.input-login:focus {outline: none}
.checkbox-login {margin-top: 0;}
.checkbox-login input[type="checkbox"] {width: 12px;}
.checkbox-login *,.checkbox-login label{font-size: 12px !important;}
.checkbox-login i {font-size: 16px !important;}
a.forget-password small:hover {color: #f65e39;}
.btn-login {width: 100%;background: #f65e39;text-align: center;font-size: 13px;color: #fff;padding: 12px 15px;}
.group-login.row {margin-top: -12px;}
.icon-login {font-size: 12px;color: #fff;}
.resigter>a {color: #333;}
.resigter>a:hover {color: #f65e39}
</style>