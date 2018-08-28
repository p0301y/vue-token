<template>
  <div>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      content: ''
    }
  },
  created () {
    let self = this
    this.$http.get('/home').then(function (res) {
      self.content = res.data.content
    })
  }
}
</script>

<style scoped>
</style>
