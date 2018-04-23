<template>
  <div class="container">
    <div class="row" v-if="total_products && keywords !== ''">
      <div class="col">
        <div class="meta">
          Found {{total_products}} products for "{{keywords}}"
        </div>
      </div>
    </div>
    <div class="row" v-if="total_products === 0">
      <div class="col">
        <div class="jumbotron">
          <h1 class="display-4">Sorry, No results for: {{keywords}}</h1>
          <p class="lead">Please try again. </p>

        </div>
      </div>
    </div>
    <div class="row" v-if="keywords === ''">
      <div class="col">
        <div class="jumbotron">
          <h1 class="display-4">MEC Product Gallery</h1>
          <p class="lead">This application allows a user to search for products via a keyword and returns 5 images and their associated main colors.</p>
          <hr class="my-4">
          <p>Enter a search term in the search box above. Searches are automatically submitted.</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="keywords !== '' && total_products > 0">
      <div class="col-sm-2 col-md-2 col-lg-3 d-flex" v-for="product in products" v-bind:key="product.code">
        <ProductTile :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/product.service'
import ProductTile from '@/components/ProductTile'
export default {
  name: 'Home',
  components: {
    ProductTile
  },
  data () {
    return {
      keywords: '',
      products: [],
      total_products: null
    }
  },
  mounted () {
    this.$root.$on('search-start', keywords => {
      this.keywords = keywords
      ProductService.search(keywords)
        .then(response => {
          this.products = response.products
          this.total_products = response.total_product_count
          this.$root.$emit('search-done')
        })
    })
  }
}
</script>

<style lang="scss">
.meta {
  margin: 1rem 0;
}
.jumbotron {
  background: #fff;
}
</style>
