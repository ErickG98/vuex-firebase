<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card shadow border-dark">
                    <div class="card-header bg-dark text-white">
                        <h1 class="text-center card-title">Producto</h1>
                    </div>
                </div>

                <div class="card shadow border-dark mt-3">
                    <div class="card-header bg-dark text-white">
                        <h3 class="text-center card-title">{{name}}</h3>
                    </div>
                    <img class="card-img-top" v-bind:src="img" ref="showIMG" alt="Card image cap">
                    <div class="list-group-item">
                        {{stock >= 0 ? `Diponibles ${stock}` : `Agotado :(`}}
                    </div>
                    <div class="list-group-item">${{parseFloat(price).toFixed(2)}}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {db} from './../services/firebase'

export default {
    name: 'Product',
    data(){
        return({
            name: null,
            stock: null,
            img: null,
            price: null,
            test: 'asd'
        })
    },
    created(){
        db.collection('products').doc(this.$route.params.id).get().
        then(doc => {
            this.name = doc.data().name
            this.stock = doc.data().stock
            this.img = doc.data().img
            this.price = doc.data().price
        })
    }
}
</script>