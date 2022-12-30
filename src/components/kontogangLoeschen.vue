<template>

  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete">
    Kontogang Löschen
  </button>


  <div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Transaktion Löschen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-floating">
            <input v-model="id" class="form-control"  placeholder="TransaktionsId">
            <label>TransaktionsId</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" @click="deleteTransaktion">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "kontogangLoeschen",

  data(){
    return {
      id : Number
    }
  },

  methods: {
    deleteTransaktion(){
      axios.delete(`http://localhost:8080/api/user/zugang/${this.id}`).then(async function (response){
        console.log(response)

      })
    }
  }


}
</script>

<style scoped>
p{
  background-color: dimgrey;
}

</style>
