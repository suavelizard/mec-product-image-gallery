<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" aria-labelledby="mec-logo-title" role="img">
                <title id="mec-logo-title">MEC</title>
                <path d="M0 0v60h60V0H0z M24.6 40.8H21V24.7l-0.9 4.9l-2.3 11.2h-3.5l-2.2-11.3l-0.7-4.8v16.1H7.2V18.6h5.9 l2.3 11.3l0.7 4.1l0.7-4.1l2.3-11.3h5.5V40.8z M38.4 22.2h-6.6v5.4h5.4v3.6h-5.4v6h6.6v3.6H27.6V18.6h10.8V22.2z M52.8 26.4h-3.6 v-2.5c0-1.3-0.6-2.2-2.1-2.2S45 22.6 45 23.9v11.7c0 1.3 0.6 2.2 2.1 2.2s2.1-0.9 2.1-2.2V33h3.6v2.5c0 3.4-1.9 5.8-5.8 5.8 s-6.2-2.6-6.2-6.1v-11c0-3.4 2.2-6.1 6.2-6.1s5.8 2.5 5.8 5.8V26.4z"></path>
            </svg>
        </a>
        <div class="input-group mr-4">
            <input class="form-control form-control-dark" placeholder="I'm looking for" aria-label="Search" type="text" v-model="keywords" v-on:input="search(keywords)" v-bind:class="{loading: loading}">
            <div class="input-group-append">
                <button type="button" class="btn btn-outline-primary" v-on:click="search(keywords)">Search</button>
            </div>
        </div>
  </div>
</nav>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'Navbar',
  data () {
    return {
      keywords: '',
      loading: false
    }
  },
  methods: {
    search: _.debounce(function (keywords) {
      this.loading = true
      this.$root.$emit('search-start', keywords)
    }, 175)
  },
  mounted () {
    this.$root.$on('search-done', () => {
      this.loading = false
      if (this.$route.query.keywords !== this.keywords) {
        this.$router.push({name: 'Home', query: {keywords: this.keywords}})
      }
    })
    if (!_.isEmpty(this.$route.query.keywords) && this.$route.query.keywords !== this.keywords) {
      this.keywords = this.$route.query.keywords
      this.search(this.keywords)
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.keywords !== this.keywords) {
        this.keywords = to.query.keywords
        this.search(this.keywords)
      }
    }
  }
}
</script>

<style lang="scss">
/**
* The use of !important here is not normal. In the interests of keeping this simple I did it to override a couple of things.
**/
.navbar {
    padding: 0!important;
    .btn-outline-primary {
        color: #0ca948!important;
        border-color: #0ca948!important;
        &:active, &:hover{
            background:#0ca948!important;
            color: #fff!important;
        }
    }
    .input-group {
       @media (max-width: 991.98px){
        flex: 1;
       }
    }
}
.navbar-dark.bg-dark {
    background: #303030;
}
.navbar-brand {
    padding-top: 0!important;
    padding-bottom: 0!important;
    line-height: 0!important;
    svg {
        width: 75px;
        max-width: 75px;
        fill: #0ca948;
        background: #fff;
    }
}
.loading {
    background-color: #fff;
    background-image: url('../assets/spinner.gif');
    background-size: 25px 25px;
    background-position: right center;
    background-repeat: no-repeat;
}
</style>
