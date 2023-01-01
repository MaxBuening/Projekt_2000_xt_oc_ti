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
      <div v-if="benutzerNamebereitsvergeben">
        <div class="form-floating">
          <input v-model="data.benutzername" class="form-control" style="outline-color: lightcoral" placeholder="Benutzername">
          <label>Benutzername</label>
        </div>
      </div>
      <div v-if="!benutzerNamebereitsvergeben">
        <div class="form-floating">
          <input v-model="data.benutzername" class="form-control" placeholder="Benutzername">
          <label>Benutzername</label>
        </div>
      </div>
      <div v-if="passwortzukurz">
        <div class="form-floating">
          <input v-model="data.passwort" class="form-control" placeholder="Passwort" style="outline-color: lightcoral" type="password">
          <label>Passwort</label>
        </div>
      </div>
      <div v-if="!passwortzukurz">
        <div class="form-floating">
          <input v-model="data.passwort" class="form-control" placeholder="Passwort" type="password">
          <label>Passwort</label>
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-primary" style="margin-bottom: 20px" type="submit">Regestrieren</button>
      <i v-if="passwortzukurz" class="warning">Das Passwort ist zu schwach <br> Es sollte min. 6 Zeichen lang sein und min ein Sonderzeichen enthalten (!,§,$,%,&,/,-) </i>
      <i v-if="benutzerNamebereitsvergeben" class="warning">Der Benutzername ist bereits vergeben</i>
    </form>
  </main>
</template>

<script>


import {reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router/dist/vue-router";
import {store} from "@/assets/store";


export default {
  name: "Reg-ister",
  data(){
    return {

    }
  },

  setup() {
    const data = reactive({
      vorname: '',
      nachname: '',
      benutzername: '',
      passwort: ''
    });

    const passwortzukurz = ref(false)
    const benutzerNamebereitsvergeben = ref(false)
    const router = useRouter();
      const submit = async () => {
       // console.log(data)


        //console.log((data.passwort.includes("-") || data.passwort.includes("!") || data.passwort.includes("§") || data.passwort.includes("$") || data.passwort.includes("%") || data.passwort.includes("&") || data.passwort.includes("/")) && data.passwort.length > 6)
        if ((data.passwort.includes("-") || data.passwort.includes("!") || data.passwort.includes("§") || data.passwort.includes("$") || data.passwort.includes("%") || data.passwort.includes("&") || data.passwort.includes("/")) && data.passwort.length > 6){
          console.log("!Eistee0815!".length)
          await axios.post('http://localhost:8080/api/register', data).then(async function (response){
            passwortzukurz.value = false;
            store.kontostandId = null;
           console.log(response.request.status)
            if (!(response.request.status === 400)){
              benutzerNamebereitsvergeben.value = false
              await router.push('/login')
            } else {
              benutzerNamebereitsvergeben.value = true
            }
          })


          //benutzerNamebereitsvergeben.value = anfrage.message === "Benutzername existiert bereits";

        } else {
          passwortzukurz.value = true;
        }



      }
      return {data, submit, passwortzukurz, benutzerNamebereitsvergeben}

  }
}
</script>

<style scoped>
.warning{
  color: red;
  font-size: medium;
}
.form-control{
  outline-style: double;
  outline-color: darkslategray;
  margin-bottom: 10px;
}



</style>
