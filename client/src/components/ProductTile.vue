<template>
  <div class="card">
    <a v-bind:href="product.web_url" v-bind:title="product.name + ' on MEC.ca'"><img class="card-img-top" v-lazy="product.default_image_urls.main_image_url" v-bind:alt="product.full_name"></a>
    <div class="card-body">
      <h5 class="card-title"><a v-bind:href="product.web_url" v-bind:title="product.name + ' on MEC.ca'">{{product.full_name}}</a></h5>
    </div>
    <div class="card-body">
      <small class="text-muted" v-if="product.list_price.amount">${{product.list_price.amount}} {{product.list_price.currency}}</small><br>
      <star-rating v-bind:rating="product.review_rating" v-bind:star-size="15" v-bind:max-rating="5" v-bind:read-only="true" v-bind:show-rating="false" v-bind:inline="true"></star-rating>({{product.review_count}})
    </div>
    <div class="card-footer">
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
import StarRating from 'vue-star-rating'
export default {
  name: 'ProductTile',
  components: {
    Swatch,
    StarRating
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
  }
}
</script>

<style lang="scss">
.card {
    margin-bottom: 2rem;
}
</style>
