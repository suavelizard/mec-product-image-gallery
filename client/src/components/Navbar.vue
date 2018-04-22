<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" aria-labelledby="mec-logo-title" role="img">
                <title id="mec-logo-title">MEC</title>
                <path d="M0 0v60h60V0H0z M24.6 40.8H21V24.7l-0.9 4.9l-2.3 11.2h-3.5l-2.2-11.3l-0.7-4.8v16.1H7.2V18.6h5.9 l2.3 11.3l0.7 4.1l0.7-4.1l2.3-11.3h5.5V40.8z M38.4 22.2h-6.6v5.4h5.4v3.6h-5.4v6h6.6v3.6H27.6V18.6h10.8V22.2z M52.8 26.4h-3.6 v-2.5c0-1.3-0.6-2.2-2.1-2.2S45 22.6 45 23.9v11.7c0 1.3 0.6 2.2 2.1 2.2s2.1-0.9 2.1-2.2V33h3.6v2.5c0 3.4-1.9 5.8-5.8 5.8 s-6.2-2.6-6.2-6.1v-11c0-3.4 2.2-6.1 6.2-6.1s5.8 2.5 5.8 5.8V26.4z"></path>
            </svg>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <input class="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" type="text" v-model="keywords" v-on:input="search(keywords)" v-bind:class="{loading: loading}">
        <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
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
    }, 300)
  },
  mounted () {
    this.$root.$on('search-done', () => {
      this.loading = false
      this.$router.push({path: '/', query: {keywords: this.keywords}})
    })
    this.search(this.keywords)
  }
}
</script>

<style lang="scss">
.navbar {
    padding: 0;
}
.navbar-dark.bg-dark {
    background: #303030;
}
.navbar-brand {
    padding-top: 0;
    padding-bottom: 0;
    line-height: 0;
    svg {
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
