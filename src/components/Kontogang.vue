<template>
 <form @submit.prevent="submit">
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
           <div class="form-floating">
             <input v-model="dataKonto.datum" class="form-control"  placeholder="Datum">
             <label>Datum</label>
           </div>
           <div class="form-floating">
             <input v-model="dataKonto.beschriftug" class="form-control"  placeholder="Beschreibung">
             <label>Beschreibung</label>
           </div>
           <div class="form-floating">
             <input v-model.number="dataKonto.betrag" class="form-control"  placeholder="Betrag">
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
import {ref} from "vue";


export default {
  name: "Konto-gang",
  props: {userId: Number},

setup(){
    const benutzerId = ref(0);
    benutzerId.value = () => {this.props.userId()};
    const dataKonto =  {
        benutzerID_Fk: benutzerId,
        betrag: '',
        beschriftug: '',
        datum: ''
    };
  const submit = async () => {
    console.log(dataKonto)
    await axios.post('http://localhost:8080/api/user/zugang', dataKonto)
  };
  return {
    dataKonto,
    submit,
  }
}

}
</script>

<style scoped>

</style>
