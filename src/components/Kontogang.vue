<template>
 <form @submit.prevent="submit()">
   <!-- Button trigger modal -->
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kontogang">
     Kontogang hinzufügen
   </button>

   <!-- Modal -->
   <div class="modal fade" id="kontogang" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 id="UserId" v>{{store.userId}}</h1>
           <h1 class="modal-title fs-5" id="KontogangModalLabel">Kontogang - UserID: {{userId}}</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <div class="form-floating">
             <input v-model="kontodaten.datum" class="form-control"  placeholder="Datum">
             <label>Datum</label>
           </div>
           <div class="form-floating">
             <input v-model="kontodaten.beschriftug" class="form-control"  placeholder="Beschreibung">
             <label>Beschreibung</label>
           </div>
           <div class="form-floating">
             <input v-model.number="kontodaten.amount" class="form-control"  placeholder="Betrag">
             <label>Betrag</label>
           </div>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button  class="btn btn-primary" type="submit">Speichern</button>
         </div>
       </div>
     </div>
   </div>
 </form>

</template>

<script>


import axios from "axios";
import {store} from "@/assets/store";
import {reactive} from "vue";
export default {
  name: "Konto-gang",

  setup(){
    console.log(store.userId)
    const kontodaten = reactive( {
      amount : parseFloat(''),
      beschriftug : '',
      datum : ''
    });
    const submit = async () => {
      await axios.post('http://localhost:8080/api/user/zugang', {
        benutzerID_Fk: store.userId,
        amount: kontodaten.amount,
        beschriftung: kontodaten.beschriftug,
        datum: kontodaten.datum
      })
    }
    return{
      kontodaten,
      submit,
      store
    }
  }

}
</script>

<style scoped>

</style>
