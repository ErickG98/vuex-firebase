<template>
  <div class="col-md-6 offset-md-3">
      <div class="card shadow border-dark">
          <div class="card-header bg-dark text-white">
              <h3 class="card-title">Sign In</h3>
          </div>
          <div class="card-body">
              <form @submit="signIn">
                  <div class="form-group">
                      <label for="email">Email:</label>
                      <input id="email" v-model="email" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                      <label for="password">Password:</label>
                      <input id="password" v-model="password" type="password" class="form-control">
                  </div>
                  <div class="form-group">
                      <button type="submit" class="btn btn-dark">Sign In</button>
                  </div>
                  <div class="form-group">
                      <p @click="changeToSignUp" style="color: blue; cursor: pointer;">I do not have an account yet</p>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import { auth } from '../services/firebase';
export default {
    name: 'SignIn',
    data() {
        return({
            email: null,
            password: null
        });
    },
    methods:{
        async signIn(e){
            e.preventDefault();
            if(this.email && this.password){
                const user = await auth.signInWithEmailAndPassword(this.email, this.password);
                sessionStorage.setItem('token', user.user.uid);
                this.$store.dispatch('verifyAuth');
                this.$router.push('/products');
            }
        },
        changeToSignUp(){
            this.$emit('changeSign');
        }
    }
}
</script>