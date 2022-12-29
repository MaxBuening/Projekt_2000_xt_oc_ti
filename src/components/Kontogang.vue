<template>
 <form @submit.prevent="submit()">
   <!-- Button trigger modal -->
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kontogang" @click="click">
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
           <div class="alert alert-danger" role="alert" v-if="!store.auth">
             Eingabe Überprüfen!
           </div>
           <div class="alert alert-success" role="alert" v-if="store.success">
             Whoop Whoop
           </div>
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
           <div class="RadioButton" id="radioButtonSuper">

             <div class="form-check">
               <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="ZugangSelect" checked>
               <label class="form-check-label" for="flexRadioDefault1">
                 Zugang
               </label>
             </div>
             <div class="form-check">
               <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="AbgangSelect">
               <label class="form-check-label" for="flexRadioDefault2">
                 Abgang
               </label>
             </div>
           </div>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             <button type="submit" class="btn btn-primary" id="liveAlertBtn">Speichern</button>
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
  methods: {
    click(){
      store.auth = true;
      store.success = false;
    }
  },

  setup(){
    const format = (date) => {
      let day = date.getDate();
      if (day < 10){
        day = "0"+day.toString()
      }

      let month = date.getMonth() + 1;
      if (month < 10){
        month = "0" + month.toString()
      }

      const year = date.getFullYear();
      return `Ausgewähltes Datum ist: ${day}.${month}.${year}`;
    }

    const kontodaten = reactive( {
      amount : parseFloat('0'),
      beschriftug : '',
      datum : ''
    });

    const submit = async () => {

      if (kontodaten.amount === 0 || kontodaten.datum === '' || kontodaten.beschriftug === '' || kontodaten.amount === null || kontodaten.amount===""){
        store.auth = false
        store.success = false
      } else {
        store.auth = true
        console.log(document.getElementById("flexRadioDefault2").checked)
         let realamount = kontodaten.amount

        if(document.getElementById("flexRadioDefault2").checked){
          console.log()
          if (!(realamount < 0)){
            realamount = kontodaten.amount * -1
            console.log(realamount)
          }
        } else {
          if (realamount < 0){
            realamount = kontodaten.amount * -1
          }
        }
        await axios.post('http://localhost:8080/api/user/zugang', {
          benutzerID_Fk: store.userId,
          amount: realamount,
          beschriftung: kontodaten.beschriftug,
          datum: kontodaten.datum
        })
        console.log("Result: "+kontodaten.datum)
        store.success = true
        const {data} = await axios.get('http://localhost:8080/api/user');
        store.kontostandId = data
      }

    }
    return{
      kontodaten,
      submit,
      store,
      format
    }
  }

}
</script>

<style scoped>
  .form-check{text-align: left}

</style>
