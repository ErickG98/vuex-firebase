<template>
    <div class="col-12">
        <div class="card text-white bg-dark border-dark shadow">
            <div class="card-body">
            <h1 class="card-title text-center">Products</h1>
                <div class="d-flex justify-content-center">
                    <button type="button" @click="adding = !adding" class="btn btn-success">
                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <add-product v-show="adding" class="mt-3" @adding-e="addingE"/>
        <products-list class="mt-3"/>
        <edit-product v-show="editing" class="mt-3" @editing-e="editingE"/>
    </div>
</template>

<script>
import AddProduct from './../components/AddProduct'
import ProductsList from './../components/ProductsList'
import EditProduct from './../components/EditProduct'
import {bus} from './../main'

export default {
  name: 'Products',
  components: {
    AddProduct,
    ProductsList,
    EditProduct
  },
  data(){
      return({
          adding: false,
          editing: false
      })
  },
  methods:{
      addingE(){
        this.adding = !this.adding
      },
      editingE(){
          this.editing = !this.editing
      }
  },
  created(){
      bus.$on('chargeData', json => {
          this.editing = true;
      })
  }
}
</script>
