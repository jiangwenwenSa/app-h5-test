<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
   return {
      activeIndex: '1',
   }
  },
  created(){
   
  }
}
 
</script>

<style>
#app {
  width: 1200px;
  margin:0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.nav {
  display: flex;
  margin: 40px 0;
  border-bottom: 1px solid #ddd;
}

a {
  padding: 20px;
  color: #42b983;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}
</style>
