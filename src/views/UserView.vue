<template>
<div>
  <h3>{{ message }}</h3>
</div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";


export default {
  name: "UserView",
  components: {},

  setup(){
    const message = ref('You are not Logged in');

    onMounted(async () => {
      const {data} = await axios.get('http://localhost:8080/api/user')
      console.log(data)
      message.value = `Hi ${data.vorname} ${data.nachname}`;
    })

    return {
      message
    }
  }

}
</script>

<style>

</style>
