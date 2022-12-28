<template>
<div class="scrollable">
  <table class="table" id="kontogangTable">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Datum</th>
      <th scope="col">Verwendungszweck</th>
      <th scope="col">Betrag</th>
    </tr>
    </thead>
    <tbody class="table table-success table-striped" id = "tbody1" >
    </tbody>
  </table>
  </div>
</template>

<script>
import {onBeforeMount} from "vue";
import axios from "axios";
import {store} from "@/assets/store";

export default {
  name: "umsatzTabelle",

  setup() {
    let betrag2 = [];

    function addRowToKontogang(Row, Datum, Beschreibung, Betrag){
      let tableBody = document.getElementById("tbody1");
      let newRow = tableBody.insertRow(0);

      let number = newRow.insertCell(0)
      let datum = newRow.insertCell(1);
      let abgangZugang = newRow.insertCell(2);
      let betrag1 = newRow.insertCell(3);

      number.innerHTML='<b>'+Row+'</b>';
      datum.innerHTML=Datum;
      abgangZugang.innerHTML=Beschreibung;
      betrag1.innerHTML=Betrag;

    }

    onBeforeMount(async () => {
      let data = store.kontostandId

      for (let i = 0; i < data.kontostandIDs.length; i++) {
        await axios.get(`http://localhost:8080/api/user/zugang/${data.kontostandIDs[i]}`).then(function(response){
          betrag2.push(response.data.beschriftug)
          addRowToKontogang(i+1,response.data.datum,response.data.beschriftug,response.data.amount)
        })
      }

    })

    return{
      store
    }

  }
}
</script>

<style scoped>
.scrollable{
  height: 400px;
  overflow: scroll;
}

</style>
