<template>
  <div id="app">
<!--需要缓存的-->
    <keep-alive :include="$store.state.keepAlivePage">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  height: 802px;
  background-color: rgba(245,248,254,0.84);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
/**
 *@Description
 *@Author:En_Ze
 *@Date:2021/2/1 2:55
*/