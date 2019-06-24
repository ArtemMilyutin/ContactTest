<template>
  <div id="app">
    <Contact/>
  </div>
</template>

<script>

import Contact from "./components/Contact.vue";

export default {
  name: 'app',
  components: {
    Contact
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
