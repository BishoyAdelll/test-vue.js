app.component('product-display',{
    props:{
      premuim:{
        required:true,
        type:Boolean,
      }
    },
    template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image"  alt="" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock> 10">In Stock</p>
        <!-- <p v-else-if="inventory<=10&&inventory>0">almost Sold Out</p> -->
        <p v-else="inStock=0">Out of Stock</p>
        <p >shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div
          v-for="(variant, index) in variants"
          class="color-circle"
          :style="{background: variant.color }"
          :key="variant.id"
          @mouseover="updateVariant(index)"
        ></div>
        <button class="button" 
        @click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton:!inStock}"
        >Add To Cart</button>
        
        <button 
        class="button" 
        :class="{ disabledButton: !inStock }" 
        :disabled="!inStock" 
        @click="removeFromCart">
        Remove Item
      </button>
      </div>
      <h2 v-if="onSale">{{ data }}</h2>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data(){
    return{
        
        brand:'Vue Mastery',
        product:'Socks',
        selectedVariant:0,
        // inventory:0,
        onSale:true,
        details:['50% cotton','30% wool','20% polyster'],
        variants:[
            {id:2232,color:'green',image:'./assets/images/socks_green.jpg',quantity:50},
            {id:2233,color:'blue',image:'./assets/images/socks_blue.jpg',quantity:0},
        ],
        reviews:[],

    }
    
},
methods:{
    addToCart(){
        this.$emit('add-to-cart',this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index){
        this.selectedVariant=index
        
    },
    addReview(review){
      this.reviews.push(review)
    }
    
},
computed:{
    title(){
        return this.brand+''+this.product
    },
    image(){
        return this.variants[this.selectedVariant].image
    },
    inStock(){
        return this.variants[this.selectedVariant].quantity
    },
    // data(){
    //     return this.brand+""+this.product
    // }
  shipping(){
    if(this.premuim){
      return 'free'
    }
    return 2,88
  }
}
})