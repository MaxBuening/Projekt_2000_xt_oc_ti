<template>
  <body style="background-color: grey" id="bodyHaupt">
    <div class="wrap">
    <div class="container-fluid min-vh-100">
      <div class="row">
        <div class="col-3">
          <img alt="Logo" src="../assets/P2000XTocTI-Logo.png" style="width:300px">
        </div>
        <div class="col-6"></div>
      </div>
      <div class="row">
        <div id="AAA" class="col"><h2 class = "row text-left text">Account von {{vorname}}, Kontostand am {{fullDate}}: {{ store.newAmount || store.amount }}€</h2></div>
      </div>
      <div class="row h-100">
        <div class="col-5 h-50">
          <div><button @click="reload">Tabelle neu laden</button></div>
          <umsatz-tabelle :key="store.table_reload" v-if="store.tabelle"></umsatz-tabelle>
        </div>
        <div class="col-7 " >
          <div class="row" id = "huups">
            <div class="col-2"><konto-gang></konto-gang></div>
            <div class="col-2"><kontogang-loeschen></kontogang-loeschen></div>
          </div>
          <div class="row">
            <div class="col" style="background-color: grey">Datum</div>
            <div class="col" id="BetragCol">Betrag</div>
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
    const fullDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
    const backgroundColor = "#2c3e50";

    onBeforeMount(async () => {

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
