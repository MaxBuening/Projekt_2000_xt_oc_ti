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
           <div id="liveAlertPlaceholder"></div>
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
      if (kontodaten.amount === "" || kontodaten.datum === "" || kontodaten.beschriftug === ""){
        fehler = true;
        console.log(fehler)
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const alert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          alertPlaceholder.append(wrapper)
        }
        const alertTrigger = document.getElementById('liveAlertBtn')
        if (alertTrigger) {
          alertTrigger.addEventListener('click', () => {
            alert('Überprüfe deine Eingabe irgendetwas stimmt noch nicht', 'danger')
          })
        }

      } else {
        console.log(document.getElementById("radioButtonSuper"))
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
  .form-check{text-align: left}

</style>
