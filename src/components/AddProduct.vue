<template>
    <div class="card border-dark shadow">
        <div class="card-header bg-dark text-white">
            <h3>
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> Adding Product
            </h3>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <form @submit="check" ref="formAdd">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" ref="name" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Precio:</label>
                    <input type="number" ref="price" v-model="price" class="form-control">
                </div>
                <div class="form-group">
                    <label>Stock:</label>
                    <input type="number" ref="stock" v-model="stock" class="form-control">
                </div>
                <div class="form-group">
                    <label>Imagen:</label>
                    <input type="text" @change="updateIMG" ref="img" v-model="img" class="form-control">
                </div>
                <div class="alert alert-danger" v-show="errors.length > 0">
                    <ul v-for="e in errors" :key='e.id'>
                        <li>{{e}}</li>
                    </ul>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success">Add Product</button>
                    <button type="button" class="btn btn-danger ml-2" @click="$emit('adding-e'), reset()">Cancel</button>
                </div>
            </form>
                </div>
                <div class="col-md-4">
                    <div class="card border-info ">
                        <div class="card-header bg-info text-white">
                            <h3 class="card-title text-center">{{ name==null||name==''?'Vista Previa':name }}</h3>
                        </div>
                        <img class="card-img-top" src="./../assets/logo.png" ref="showIMG" alt="Card image cap">
                        <div class="card-body">
                            <p id="price" class="text-center">${{ price==null||price==''?'100':price }}</p>
                            <button class="btn btn-info btn-block">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import {db} from './../services/firebase'

export default {
  name: 'AddProduct',
  data () {
    return ({
      name: null,
      price: null,
      img: null,
      stock: null,
      errors: []
    })
  },
  methods: {
    updateIMG () {
      this.$refs.showIMG.src = this.img === null || this.img === '' ? './../assets/logo.png' : this.img
      console.log(this.img)
      console.log(this.$refs.showIMG.src)
    },
    check (e) {
      e.preventDefault()
      this.errors = []
      
      if (!this.name) {
        this.errors.push('Name is required')
        this.$refs.name.classList = 'is-invalid form-control'  
      }else{
        this.$refs.name.classList = 'is-valid form-control'
      }

      if (!this.price) {
        this.errors.push('Price is required')
        this.$refs.price.classList = 'is-invalid form-control'  
      }else{
        this.$refs.price.classList = 'is-valid form-control'
      }

      if (!this.stock) {
        this.errors.push('Stock is required')
        this.$refs.stock.classList = 'is-invalid form-control'  
      }else{
        this.$refs.stock.classList = 'is-valid form-control'
      }

      
      if (!this.img) {
        this.errors.push('Image is required')
        this.$refs.img.classList = 'is-invalid form-control'  
      }else{
        this.$refs.img.classList = 'is-valid form-control'
      }


    if (this.errors.length === 0) {
        this.addProduct()
      }

    },
    async addProduct () {
      try {
        await db.collection('products').add ({
          name: this.name,
          price: parseFloat(this.price),
          stock: parseInt(this.stock),
          img: this.img
        })
        Swal.fire ({
          position: 'center',
          icon: 'success',
          title: 'Product saved successully',
          showConfirmButton: false,
          timer: 1500
        })
        this.reset()
        this.$emit('adding-e')
      } catch (error) {
          console.log(error)
      }
    },
    reset(){
      this.name = null
      this.price = null
      this.img = null
      this.stock = null
      this.$refs.name.classList = 'form-control'  
      this.$refs.price.classList = 'form-control'  
      this.$refs.stock.classList = 'form-control'  
      this.$refs.img.classList = 'form-control'  
    }
  }
}
</script>
