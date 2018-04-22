<template>
  <div class="container">
    <div class="row" v-if="total_products">
      <div class="col">
        <div class="meta">
          Found {{total_products}} products
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2 col-md-3 col-4 d-flex" v-for="product in products" v-bind:key="product.code">
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
      products: [],
      total_products: null
    }
  },
  mounted () {
    this.$root.$on('search-start', keywords => {
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
</style>
