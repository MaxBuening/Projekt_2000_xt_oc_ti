<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Sein einer von uns</h1>

      <div class="form-floating">
        <input v-model="data.vorname" class="form-control"  placeholder="Vorname">
        <label>Vorname</label>
      </div>
      <div class="form-floating">
        <input v-model="data.nachname" class="form-control"  placeholder="Nachname">
        <label>Nachname</label>
      </div>
      <div class="form-floating">
        <input v-model="data.benutzername" class="form-control"  placeholder="Benutzername">
        <label>Benutzername</label>
      </div>
      <div class="form-floating">
        <input v-model="data.passwort" class="form-control" placeholder="Passwort" type="password">
        <label>Passwort</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Regestrieren</button>
    </form>
  </main>
</template>

<script>
import {reactive} from "vue";
import axios from 'axios';
import {useRouter} from "vue-router/dist/vue-router";

export default {
  name: "Reg-ister",
  setup(){
    const data = reactive({
      vorname: '',
      nachname: '',
      benutzername: '',
      passwort: ''
    });
      const router = useRouter();
      const submit = async () => {
        console.log(data)
        await axios.post('http://localhost:8080/api/register', data)
        await router.push('/login')
      }
      return {data, submit}






  }
}
</script>

<style scoped>

</style>
