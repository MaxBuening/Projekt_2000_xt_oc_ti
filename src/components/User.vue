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
        <div class="col"><h2 class = "row text-left text">Account von {{vorname}}, Kontostand am {{fullDate}}: {{ betrag }}€</h2></div>
      </div>
      <div class="row h-100">
        <div class="col-5 h-50">
          <!-- Begin copied part from bootstrap -->
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- End copied part from bootstrap -->
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
import {onMounted, ref} from "vue";
import axios from "axios";
import KontoGang from "@/components/Kontogang";
import {store} from "@/assets/store";


export default {
  name: "Us-er",
  components: {KontoGang},
  setup() {
    let betrag = [];
    const vorname = ref("userKonnteNichtGeladenWerden");
    const date = new Date();
    const fullDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    onMounted(async () => {
      const {data} = await axios.get('http://localhost:8080/api/user');
      vorname.value = data.vorname;
      store.userId = data.id;
      console.log(store.userId)
      for (let i = 0; i < data.kontostandIDs.length; i++) {
        axios.get(`http://localhost:8080/api/user/zugang/${data.kontostandIDs[i]}`).then(function (response){
          betrag.push(response.data.amount);
        })
      }
      console.log(betrag.length)
    });

    return{
      vorname,
      fullDate,
      betrag
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
