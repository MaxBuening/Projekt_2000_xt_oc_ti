<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="anfrage">
      <h1 class="h3 mb-3 fw-normal">Bitte Einloggen</h1>

      <div class="form-floating">
        <input v-model="anfrage.benutzername" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Benutzername</label>
      </div>
      <div class="form-floating">
        <input v-model="anfrage.passwort" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
    </form>
  </main>
</template>

<script>




import axios from "axios";
import router from "@/router";


export default {
  name: "Log-in",
  methods: {
    anfrage(){
      axios.post('http://localhost:8080/api/login', {
        benutzername: '',
        passwort: ''
      })
          .then(async function (response) {
            console.log(response)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
            await router.push('/user')
          })
          .catch(function (error) {
            console.log(error);
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
