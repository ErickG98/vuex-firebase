<template>
        <div class="col-12">
            <sign-in v-show="signup" @changeSign="changeSign"/>
            <sign-up v-show="signin" @changeSign="changeSign" />
        </div>
</template>

<script>
import SignIn from './../components/SignIn';
import SignUp from './../components/SignUp';

export default {
  name: 'Login',
  components: {
      SignIn,
      SignUp
  },
  data(){
      return(
          {
            signin: false,
            signup: true 
          }
      )
  },
  methods:{
      changeSign(){
          this.signin = !this.signin;
          this.signup = !this.signup;

      }
  }
}
</script>