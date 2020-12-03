<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" to="/">Home <span class="sr-only">(current)</span></router-link>
            <router-link class="navbar-brand" to="/login">Login <span class="sr-only">(current)</span></router-link>
            <router-link class="navbar-brand" to="/products" v-show="$store.getters.auth">CRUD <span class="sr-only">(current)</span></router-link>
        <a class="navbar-brand" style="cursor: pointer;" v-show="$store.getters.auth" @click="logOut">LogOut <span class="sr-only">(current)</span></a>    

        </div>    
    </nav>
</template>

<script>
import {auth} from './../services/firebase'

export default {
    name: 'Navbar',
    methods: {
        logOut(){
            auth.signOut();
            if(sessionStorage.getItem('token')){
                sessionStorage.removeItem('token');
                this.$store.dispatch('logOut');
            }
            this.$router.push('/login');

        }
    }
}
</script>