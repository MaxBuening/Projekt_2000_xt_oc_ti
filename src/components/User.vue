<template>
  <body>
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
          <umsatz-tabelle :key="table_reload"></umsatz-tabelle>
        </div>
        <div class="col-7 ">
          <div class="row">
            <div class="col-2"><konto-gang></konto-gang></div>
            <div class="col-2"><kontogang-loeschen></kontogang-loeschen></div>
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
import UmsatzTabelle from "@/components/umsatzTabelle";
import KontogangLoeschen from "@/components/kontogangLoeschen";


export default {

  name: "Us-er",
  components: {KontogangLoeschen, UmsatzTabelle, KontoGang},

  data (){
    return {
      table_reload : 0
    }
  },

  methods: {
    reload(){
      this.table_reload++
    }
  },

  setup() {
    let betrag = 0;
    const vorname = ref("userKonnteNichtGeladenWerden");
    const date = new Date();
    const fullDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();

    onBeforeMount(async () => {

        const {data} = await axios.get('http://localhost:8080/api/user');
        store.kontostandId = data
        vorname.value = data.vorname;
        store.userId = data.id;
        console.log("User ID: "+store.userId)
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
