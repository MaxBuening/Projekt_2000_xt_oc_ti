<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Sei einer von uns</h1>

      <div class="form-floating">
        <input v-model="data.vorname" class="form-control" placeholder="Vorname">
        <label>Vorname</label>
      </div>
      <div class="form-floating">
        <input v-model="data.nachname" class="form-control"  placeholder="Nachname">
        <label>Nachname</label>
      </div>
      <div class="form-floating">
        <input v-model="data.benutzername" class="form-control" placeholder="Benutzername">
        <label>Benutzername</label>
      </div>
      <div class="form-floating">
        <input v-model="data.passwort" class="form-control" placeholder="Passwort" type="password">
        <label>Passwort</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Regestrieren</button>
      <i v-if="passwortzuschwach === true">Test</i>
    </form>
    <PasswortZuSchwach v-if="passwortzuschwach"></PasswortZuSchwach>
  </main>
</template>

<script>


import {reactive} from "vue";
import axios from "axios";
import {useRouter} from "vue-router/dist/vue-router";
import {store} from "@/assets/store";
import PasswortZuSchwach from "@/components/PasswortZuSchwach";

export default {
  name: "Reg-ister",
  components: {PasswortZuSchwach},
  setup() {
    const data = reactive({
      vorname: '',
      nachname: '',
      benutzername: '',
      passwort: ''
    });
    let passwortzuschwach = reactive({
      passwortzuschwach : false
    });
    console.log(passwortzuschwach)
    const router = useRouter();
      const submit = async () => {
        console.log(data)
        if ((data.passwort.includes("-") || data.passwort.includes("!") || data.passwort.includes("§") || data.passwort.includes("$") || data.passwort.includes("%") || data.passwort.includes("&") || data.passwort.includes("/")) && data.passwort.length < 6){
          await axios.post('http://localhost:8080/api/register', data)
          store.kontostandId = null
          passwortzuschwach = false;
          await router.push('/login')
        } else {
          passwortzuschwach = true;
          console.log(passwortzuschwach)
        }



      }
      return {data, submit, passwortzuschwach}

  }
}
</script>

<style scoped>

</style>
