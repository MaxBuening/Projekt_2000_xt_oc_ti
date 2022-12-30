<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid bg-dark">
      <a class="navbar-brand text-white" href="#">Projekt2000 XT OC TI</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <div class="navbar-nav" v-if="auth">
          <router-link class="nav-link text-white" to="/" >Home</router-link>
          <router-link class="nav-link" to="/user" style="color: aquamarine">Profil</router-link>
          <router-link class="nav-link text-white" to="/" @click="logout" >Logout</router-link>
        </div>

        <div class="navbar-nav" v-if="!auth">
          <router-link class="nav-link text-white" to="/" >Home</router-link>
          <router-link class="nav-link" to="/login" style="color: aquamarine">Einloggen</router-link>
          <router-link class="nav-link text-white" to="/register">Registrieren</router-link>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import {store} from "@/assets/store";


export default {
  name: "Nav-bar",

  setup() {
    const auth = ref(false);

    onMounted(async () => {
      try{
        const resp = await axios.get('http://localhost:8080/api/user');
        if(resp.message !== "Request failed with status code 401"){
          auth.value = true;
        }
      } catch (e) {
        auth.value =false;
      }
    });

    const logout = async () => {

      await axios.post('http://localhost:8080/api/logout', {}, {withCredentials: true})
          .then(async function (response) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
            auth.value= false;
            store.tabelle = false;
            store.table_reload++;
            this.forceUpdate();
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
