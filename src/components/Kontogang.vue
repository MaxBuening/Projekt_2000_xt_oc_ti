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
           <h1 class="modal-title fs-5" id="KontogangModalLabel">Kontogang</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <div>
            <Datepicker v-model="kontodaten.datum" :enable-time-picker ="false" :format ="format" placeholder="Datum" ></Datepicker>
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
             <button type="submit" class="btn btn-primary">Speichern</button>
         </div>
       </div>
     </div>
   </div>
 </form>

</template>

<script>

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from "axios";
import {store} from "@/assets/store";
import {reactive} from "vue";
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "Konto-gang",
  components: {Datepicker},
  setup(){
    let fehler = false;
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `Ausgewähltes Datum ist: ${day}.${month}.${year}`;
    }

    const kontodaten = reactive( {
      amount : parseFloat(''),
      beschriftug : '',
      datum : ''
    });

    const submit = async () => {
      if (kontodaten.amount === null || kontodaten.datum === "" || kontodaten.beschriftug === ""){
        fehler = true;
        console.log(fehler)
      } else {
        await axios.post('http://localhost:8080/api/user/zugang', {
          benutzerID_Fk: store.userId,
          amount: kontodaten.amount,
          beschriftung: kontodaten.beschriftug,
          datum: kontodaten.datum
        })
        fehler = false;
      }



    }
    return{
      kontodaten,
      submit,
      store,
      format,
      fehler
    }
  }

}
</script>

<style scoped>

</style>
