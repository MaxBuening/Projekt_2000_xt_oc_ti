<template>
  <body style="background-color: darkslategray" id="bodyHaupt">
    <div class="wrap">
    <div class="container-fluid min-vh-100">

      <div class="row">
        <div id="AAA" class="col-6" style="border: 2px solid transparent"><h2 class = "row text-left text" style="color: darkslategray">Account von {{vorname}}</h2></div>
        <div class="col-6" style="border: 2px solid transparent">
          <img src="../assets/P2000XTocTI-Logo.png" style="width: 300px" align="right">
        </div>
      </div>
      <div class="row h-100">
        <div class="col-5 h-50">
          <div><button @click="reload" style="background-color: transparent; border: 10px solid transparent"><img src="../assets/Reload.png" style="width: 50px"></button></div>
          <umsatz-tabelle :key="store.table_reload" v-if="store.tabelle"></umsatz-tabelle>
        </div>
        <div class="col-7 ">
          <div class="row" id = "huups">
            <div class="col-6"><konto-gang></konto-gang></div>
            <div class="col-6"><kontogang-loeschen></kontogang-loeschen></div>
          </div>
          <div class="row" id="Betrag1" v-if="(store.newAmount || store.amount)>=0">
            <div class="col-6" style="border: 10px solid transparent; text-align: left; color: darkslategray; font-size: 30px"><b>Kontostand: {{ store.newAmount || store.amount }}€</b></div>
            <div class="col-6" style="border: 10px solid transparent; text-align: right; color: darkslategray"><h2>{{fullDate}}</h2></div>
          </div>
          <div class="row" id="Betrag2" v-if="(store.newAmount || store.amount)<0">
            <div class="col-6" style="border: 10px solid transparent; text-align: left; color: crimson; font-size: 30px"><h2>Kontostand: {{ store.newAmount || store.amount }}€</h2></div>
            <div class="col-6" style="border: 10px solid transparent; text-align: right; color: darkslategray"><h2>{{fullDate}}</h2></div>
          </div>

          <div class="row" style="text-align: left; margin-bottom: 0px">
            <div class="col-4" style="padding-bottom: 0; padding-top: 0; border: 0px">
              <h2 style="font-size: 20px; color: darkslategray">Höchste Einnahme:</h2>
            </div>
            <div class="col-8" style="padding-bottom: 0; padding-top: 0; border: 0px">
              <h2 style="font-size: 20px; color: darkslategray">{{store.hoechstEinnahme}}€</h2>
            </div>
          </div>
          <div class="row" style="text-align: left; margin-bottom: 0px">
            <div class="col-4" style="padding-bottom: 0; padding-top: 0; border: 0px">
              <h2 style="font-size: 20px; color: darkslategray">Höchste Ausgabe</h2>
            </div>
            <div class="col-8" style="padding-bottom: 0; padding-top: 0; border: 0px">
              <h2 style="font-size: 20px; color: darkslategray">{{store.hoechstAusgabe}}€</h2>
            </div>
          </div>
          <div class="row" style="text-align: left; margin-bottom: 0px">
            <div class="col-4" style="padding-bottom: 0; padding-top: 0; border: 0px">
              <h2 style="font-size: 20px; color: darkslategray">Transaktionsdurchschnitt:</h2>
            </div>
            <div class="col-8" style="padding-bottom: 0; padding-top: 0; border: 0px">
              <h2 style="font-size: 20px; color: darkslategray">{{store.transaktionsdurchschnitt}}€</h2>
            </div>
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
import UmsatzTabelle from "@/components/umsatzTabelle";
import KontogangLoeschen from "@/components/kontogangLoeschen";


export default {

  name: "Us-er",
  components: {KontogangLoeschen, UmsatzTabelle, KontoGang},


  methods: {
    reload(){
      store.table_reload++
      store.tabelle = true
    }
  },

  setup() {
    let betrag = 0;
    const vorname = ref("userKonnteNichtGeladenWerden");
    const date = new Date();
    const fullDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    const backgroundColor = "#2c3e50";

    onBeforeMount(async () => {
        store.nav++
        const {data} = await axios.get('http://localhost:8080/api/user');
        store.kontostandId = data
        vorname.value = data.vorname;
        store.userId = data.id;
        for (let i = 0; i < data.kontostandIDs.length; i++) {
          await axios.get(`http://localhost:8080/api/user/zugang/${data.kontostandIDs[i]}`).then(function(response){
            betrag += response.data.amount;
            return betrag;
          })
        }
        store.amount = betrag
        console.log(store.kontostandId)
        console.log("Betrag: "+ betrag)
      })

    return{
      vorname,
      fullDate,
      betrag,
      backgroundColor,
      store
    }

  }

}
</script>

<style scoped>
  [class*="col"]{
    padding:1rem;
    background-color: azure;
    border:2px solid #000000;
    color: #000000;
  }

  [class*="table"]{
    padding:1rem;
    background-color: azure;
    border:2px solid #000000;
    color: #000000;
  }
  [class*="row"]{
    border: 10px solid transparent;

  }
  [class*="col"]{
  }

</style>
