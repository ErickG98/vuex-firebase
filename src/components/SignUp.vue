<template>
  <div class="col-md-6 offset-md-3">
      <div class="card shadow border-dark">
          <div class="card-header bg-dark text-white">
              <h3 class="card-title">Sign Up</h3>
          </div>
          <div class="card-body">
              <form @submit="createUser">
                  <div class="form-group">
                      <label for="email">Email:</label>
                      <input id="email" v-model="email" ref="email" type="email" class="form-control">
                  </div>
                  <div class="form-group">
                      <label for="password">Password:</label>
                      <input id="password" v-model="password" ref="password" type="password" class="form-control">
                  </div>
                  <div class="alert alert-danger" role="alert" v-show="errors.length > 0">
                    <ul v-for="e in errors" :key="e.id">
                        <li>{{e}}</li>
                    </ul>
                  </div>
                  <div class="form-group">
                      <button type="submit" class="btn btn-dark">Sign Up</button>
                  </div>
                  <div class="form-group">
                      <p @click="changeToSignIn" style="color: blue; cursor: pointer;">I already have an account</p>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import {auth} from './../services/firebase';

export default {
    name: 'SignIn',
    data(){
        return({
            email: null,
            password: null,
            errors: [],
            auth: null
        });
    },
    methods: {
        async createUser(e){
            e.preventDefault();

            if(this.email && this.password){
                try {
                    const user = await auth.createUserWithEmailAndPassword(this.email, this.password);
                    sessionStorage.setItem('token', user.user.uid);
                    this.$store.dispatch('verifyAuth');
                    this.$router.push('/products');
                } catch (error) {
                    console.log(error);
                }
            }

            this.errors = [];

            if(!this.email){
                this.errors.push('Type a valid email');
                this.$refs.email.classList = 'form-control is-invalid';
            }else{
                this.$refs.email.classList = 'form-control is-valid';
            }

            if(!this.password){
                this.errors.push('Type a valid password');
                this.$refs.password.classList = 'form-control is-invalid';

            }else{
                this.$refs.password.classList = 'form-control is-valid';
            }

        },
        changeToSignIn(){
                this.$emit('changeSign');
            },
    }

}
</script>