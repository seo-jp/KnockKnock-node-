<template>
    <h1>Home</h1>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loginSessionId: null,
    };
  },
  created() {
      this.loginSessionId = false
      this.loginSessionId ? console.log('login success') : this.$router.replace('login')
  }
}
</script>