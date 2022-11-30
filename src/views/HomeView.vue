<template>
  <div class="home">
    <img alt="World" src="../assets/Vue_JS_RAM.png">
    <HelloWorld msg="Hello World"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
