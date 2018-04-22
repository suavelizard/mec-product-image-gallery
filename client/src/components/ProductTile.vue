<template>
  <div class="card">
    <img class="card-img-top" v-bind:src="product.default_image_urls.main_image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{product.full_name}}</h5>
    </div>
    <div class="card-footer">
      <!-- <small class="text-muted">${{product.list_price.amount}} {{product.list_price.currency}}</small> -->
      <ul class="list-inline">
          <li class="list-inline-item" v-for="(color, index) in product.colors_data.colors" v-bind:key="index">
              <Swatch v-bind:color="color.hex" />
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Swatch from '@/components/Swatch'
export default {
  name: 'ProductTile',
  components: {
    Swatch
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          list_price: null
        }
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.product)
  }
}
</script>

<style lang="scss">
.card {
    margin-bottom: 2rem;
}
</style>
