<template>
  <div id="app">
    <navbar/>
    <div class="container p-4">
      <div class="row">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>