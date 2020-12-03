<template>
    <div class="card border-dark shadow">
        <div class="card-header bg-dark text-white">
            <h3>
              <svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg> Editing Product
            </h3>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <form @submit="check">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" ref="name" v-model="productToEdit.name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Precio:</label>
                    <input type="number" ref="price" v-model="productToEdit.price" class="form-control">
                </div>
                <div class="form-group">
                    <label>Stock:</label>
                    <input type="number" ref="stock" v-model="productToEdit.stock" class="form-control">
                </div>
                <div class="form-group">
                    <label>Imagen:</label>
                    <input type="text" @change="updateIMG" ref="img" v-model="productToEdit.img" class="form-control">
                </div>
                <div class="alert alert-danger" v-show="errors.length > 0">
                    <ul v-for="e in errors" :key='e.id'>
                        <li>{{e}}</li>
                    </ul>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success">Edit Product</button>
                    <button type="button" class="btn btn-danger ml-2" @click="$emit('editing-e')">Cancel</button>
                </div>
            </form>
                </div>
                <div class="col-md-4">
                    <div class="card border-info ">
                        <div class="card-header bg-info text-white">
                            <h3 class="card-title text-center">{{ productToEdit.name==null||productToEdit.name==''?'Vista Previa':productToEdit.name }}</h3>
                        </div>
                        <img class="card-img-top" v-bind:src="productToEdit.img" ref="showIMG" alt="Card image cap">
                        <div class="card-body">
                            <p id="price" class="text-center">${{ productToEdit.price==null||productToEdit.price==''?'100':productToEdit.price }}</p>
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
import {bus} from './../main'

export default {
  name: 'AddProduct',
  data () {
    return ({
      id: this.idProduct,
      errors: [],
      productToEdit: {}
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
      
      if (!this.productToEdit.name) {
        this.errors.push('Name is required')
        this.$refs.name.classList = 'is-invalid form-control'  
      }else{
        this.$refs.name.classList = 'is-valid form-control'
      }

      if (!this.productToEdit.price) {
        this.errors.push('Price is required')
        this.$refs.price.classList = 'is-invalid form-control'  
      }else{
        this.$refs.price.classList = 'is-valid form-control'
      }

      if (!this.productToEdit.stock) {
        this.errors.push('Stock is required')
        this.$refs.stock.classList = 'is-invalid form-control'  
      }else{
        this.$refs.stock.classList = 'is-valid form-control'
      }

      
      if (!this.productToEdit.img) {
        this.errors.push('Image is required')
        this.$refs.img.classList = 'is-invalid form-control'  
      }else{
        this.$refs.img.classList = 'is-valid form-control'
      }


    if (this.errors.length === 0) {
        this.editProduct()
      }

    },
    async editProduct () {
      try {
        await db.collection('products').doc(this.productToEdit.id).set ({
          name: this.productToEdit.name,
          price: parseFloat(this.productToEdit.price),
          stock: parseInt(this.productToEdit.stock),
          img: this.productToEdit.img
        })
        Swal.fire ({
          position: 'center',
          icon: 'success',
          title: 'Product updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.$emit('editing-e')
      } catch (error) {
          console.log(error)
      }
    }
  },
  created(){
    bus.$on('chargeData', json => {
      this.productToEdit = json
    }); 
  }
}
</script>
