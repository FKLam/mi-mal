<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser () {
      this.axios.get('/user').then((res = {}) => {
        console.log(res)
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res = {}) => {
        console.log(res)
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style>
@import './assets/scss/reset.scss';
</style>
