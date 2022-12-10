<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Bitte Einloggen</h1>

      <div class="form-floating">
        <input v-model="data.benutzername" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Benutzername</label>
      </div>
      <div class="form-floating">
        <input v-model="data.passwort" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
    </form>
  </main>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import {useRouter} from "vue-router/dist/vue-router";

export default {
  name: "Log-in",
setup() {

  const data = reactive(
      {
        benutzername: '',
        passwort: ''
      }
  );
  const router = useRouter();
  const submit = async () => {
    const response = await axios.post('http://localhost:8080/api/login', data, {withCredentials: true});
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    await router.push('/')
  }
  return {
    data,
    submit
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
