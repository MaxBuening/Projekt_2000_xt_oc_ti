<template>
  <header>
  </header>
  <body>
    <div class="wrap">
    <div class="container-fluid min-vh-100">
      <div class="row">
        <div class="col-3">
          <img alt="Logo" src="../assets/P2000XTocTI-Logo.png" style="width:300px">
        </div>
        <div class="col-6"></div>
        <div class="col-1"><button>Settings</button></div>
        <div class="col-2"><button>Logout</button></div>
      </div>
      <div class="row">
        <div id="AAA" class="col"><h2 class = "row text-left text">Account von {{vorname}}, Kontostand am {{fullDate}}: {{ store.amount }}€</h2></div>
      </div>
      <div class="row h-100">
        <div class="col-5 h-50">
          <table class="table" id="kontogangTable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Datum</th>
                <th scope="col">Zugang/Abgang</th>
                <th scope="col">Betrag</th>
              </tr>
            </thead>
            <tbody id = "tbody1">

              <!--
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              Muster
              <tr><th scope = "row">x</th><td>Val1</td><td>Val2</td><td>Val3</td></tr>
              -->


            </tbody>
          </table>
        </div>
        <div class="col-7 ">
          <div class="row">
          <konto-gang></konto-gang>
          </div>
          <div class="row">
            <div class="col">Datum</div>
            <div class="col">Betrag</div>
            <div class="col">Zugang</div>
            <div class="col">Abgang</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </body>
</template>

<script>
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import KontoGang from "@/components/Kontogang";
import {store} from "@/assets/store";

export default {

  name: "Us-er",
  components: {KontoGang},

  setup() {
    let betrag = 0;
    const vorname = ref("userKonnteNichtGeladenWerden");
    const date = new Date();
    const fullDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();

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

        const {data} = await axios.get('http://localhost:8080/api/user');
        store.kontostandId = data
        vorname.value = data.vorname;
        store.userId = data.id;
        console.log("User ID: "+store.userId)
        for (let i = 0; i < data.kontostandIDs.length; i++) {
          await axios.get(`http://localhost:8080/api/user/zugang/${data.kontostandIDs[i]}`).then(function(response){
            betrag += response.data.amount;
            return betrag
          })
        }
        store.amount = betrag
      console.log(store.kontostandId)
        console.log("Betrag: "+ betrag)

        addRowToKontogang("1","10-12-2002","Kekse","100")


      })

    return{
      vorname,
      fullDate,
      betrag,
      store
    }

  }

}
</script>

<style scoped>
  [class*="col"]{
    padding:1rem;
    background-color: #fff;
    border:2px solid #000000;
    color: #000000;
  }
  [class*="table"]{
    padding:1rem;
    background-color: #fff;
    border:2px solid #000000;
    color: #000000;
  }

</style>
