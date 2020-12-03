<template>
  <div class="container-fluid">
    <div class="row">
    <div class="col-md-4 col-sm-6 mt-3" v-for="p in products" :key="p.id">
      <div class="card border-info ">
      <div class="card-header bg-info text-white">
        <h3 class="card-title text-center">{{ p.name }}</h3>
      </div>
      <img class="card-img-top" style="max-height: 220px;"  v-bind:src='p.img' ref="showIMG" alt="Card image cap">
      <div class="card-body">
        <p id="price" class="text-center">${{ parseFloat(p.price).toFixed(2) }}</p>
        <router-link class="btn btn-info btn-block" :to="{name: 'Product', params: {id: p.id}}">Màs</router-link>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import {db} from './../services/firebase'

export default {
  name: 'HelloWorld',
  data(){
    return({
      products: []
    })
  },
  created(){
    db.collection('products').onSnapshot(r => {
      this.products=[]
      r.forEach( doc => {
        this.products.push({
          id: doc.id,
          name: doc.data().name,
          stock: doc.data().stock,
          price: doc.data().price,
          img: doc.data().img
        });
      });
    });
  }
}
</script>