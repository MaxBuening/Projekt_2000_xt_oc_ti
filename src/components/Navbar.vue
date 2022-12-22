<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Projekt2000 XT OC TI</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <div class="navbar-nav" v-if="auth">
          <router-link class="nav-link" to="/" >Home</router-link>
          <router-link class="nav-link" to="/user">Profil</router-link>
          <router-link class="nav-link" to="/" @click="logout" >Logout</router-link>
        </div>

        <div class="navbar-nav" v-if="!auth">
          <router-link class="nav-link" to="/" >Home</router-link>
          <router-link class="nav-link" to="/login">Einloggen</router-link>
          <router-link class="nav-link" to="/register">Registrieren</router-link>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";


export default {
  name: "Nav-bar",

  setup() {
    const auth = ref(false);

    onMounted(async () => {
      try{
        await axios.get('http://localhost:8080/api/user');
        auth.value = true
      } catch (e) {
        auth.value =false;
      }
    });

    const logout = async () => {

      await axios.post('http://localhost:8080/api/logout', {}, {withCredentials: true})
          .then(async function (response) {
        console.log("Hallo")
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
            auth.value= false;
      })
          .catch(function (error) {
            console.log(error);
          });

    }
    return {
      auth,
      logout
    }

  }

}
</script>

<style scoped>

</style>
