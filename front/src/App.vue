<template>
  <div id="app">
    
    <Header v-if="loginSessionId" />
    <div id="content" class="content row h-100 ">
      <div style="width:100%; margin:0 auto; position:relative;">
        <router-view></router-view>
      </div>
    </div>
    <!-- <FooBar v-if="loginSessionId" /> -->

  </div>
</template>

<script>

import Header from './shared-components/Header.vue'
// import FooBar from './shared-components/FooBar.vue'

export default {
  name: 'App',
  components: {
    Header,
    // FooBar,
  },
  data() {
    return {
      loginSessionId: false,
    };
  }
}
</script>

<style>
a:hover {
  text-decoration: none!important;
  color: none!important;
}

li {
  list-style: none;
}

#app {

  width: 360px;
  height: 100vh;
  margin: 0 auto;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

#content {
  width: 100%;
  margin: 0;
}

</style>
