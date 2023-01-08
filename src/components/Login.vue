<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="anfrage">
      <h1 class="h3 mb-3 fw-normal">Bitte Einloggen</h1>
      <div class="alert alert-danger" role="alert" v-if="store.login">
        Passwort oder Nutzername Falsch
      </div>
      <div class="form-floating">
        <input v-model="anfrage.benutzername" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Benutzername</label>
      </div>
      <div class="form-floating">
        <input v-model="anfrage.passwort" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-secondary" type="submit">Login</button>
    </form>
  </main>
</template>

<script>



import router from "@/router";
import axios from "axios";
import {store} from "@/assets/store";




export default {
  name: "Log-in",
data(){
 return{
   store
 }
},
  methods: {
    anfrage(){
      axios.post('http://localhost:8080/api/login', {
        benutzername: this.anfrage.benutzername,
        passwort: this.anfrage.passwort

      },{withCredentials: true})
          .then(async function (response) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
            if (response.message !== "Request failed with status code 400"){
              store.login = false
              await router.push('/user')
            } else {
              store.login = true
            }
          })
          .catch(function (error) {
            console.log(error)
            store.login = true
          });
    }
  }


}

</script>

<style>

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
