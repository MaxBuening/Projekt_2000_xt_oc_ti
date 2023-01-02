<template>
<div class="scrollable">
  <table class="table" id="kontogangTable">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">ID</th>
      <th scope="col">Datum</th>
      <th scope="col">Verwendungszweck</th>
      <th scope="col">Betrag</th>
    </tr>
    </thead>
    <tbody class="table" id = "tbody1" >
    </tbody>
  </table>
  </div>
</template>

<script>
import {onMounted} from "vue";
import axios from "axios";
import {store} from "@/assets/store";

export default {
  name: "umsatzTabelle",

  setup() {
    let betrag2 = [];
    let responseArray = [];

    function dreiWerteBerechnen(){
      let max1 = 0;
      let min1 = 0;
      let durchschnitt = 0;
      console.log("response length: "+responseArray.length)
      console.log(responseArray[1])
      for (let i = 0; i<responseArray.length; i++){
        if (responseArray[i].data.amount > max1){
          max1 = responseArray[i].data.amount
        }
        if (responseArray[i].data.amount < min1){
          min1 = responseArray[i].data.amount
        }
        durchschnitt += responseArray[i].data.amount;
      }
      durchschnitt = (durchschnitt/responseArray.length).toFixed(2)
      console.log(max1)
      store.hoechstEinnahme = max1;
      store.hoechstAusgabe = min1;
      store.transaktionsdurchschnitt = durchschnitt;
    }

    function addRowToKontogang(Row,ID, Datum, Beschreibung, Betrag){
      let tableBody = document.getElementById("tbody1");
      let newRow = tableBody.insertRow(0);
      let number = newRow.insertCell(0)
      let id = newRow.insertCell(1)
      let datum = newRow.insertCell(2);
      let abgangZugang = newRow.insertCell(3);
      let betrag1 = newRow.insertCell(4);

      if(Betrag < 0){
        newRow.className = "p-3 mb-2 bg-danger text-white";
      } else {
        newRow.className = "p-3 mb-2 bg-success text-white";
      }

      number.innerHTML='<b>'+Row+'</b>';
      id.innerHTML=ID
      datum.innerHTML=Datum;
      abgangZugang.innerHTML=Beschreibung;
      betrag1.innerHTML=Betrag;

    }
    function correctDateFormat(kontogangArray){
      //Kontogang Array is an array with all responses
      let dateToBeEdited = []
      for (let i = 0; i<kontogangArray.length; i++){
        dateToBeEdited = kontogangArray[i].data.datum;
        //console.log(dateToBeEdited[1].toString().length)

        //Convert year to string
        dateToBeEdited[0]=dateToBeEdited[0].toString();

        //Check if month is less than 10
        if (dateToBeEdited[1]<10){
          //console.log("Yes: "+dateToBeEdited[1]);
          dateToBeEdited[1]="0"+dateToBeEdited[1]
        }

        //Check if day is less than 10
        if(dateToBeEdited[2]<10){
          //console.log("Yes: "+dateToBeEdited[2])
          dateToBeEdited[2]="0"+dateToBeEdited[2]
        }
        kontogangArray[i].data.datum = dateToBeEdited

      }
      return kontogangArray
    }

    function sortDate(correctFormatArray){
      //Correct format array contains all responses with dates in arrays in string format
      let copyArray = correctFormatArray

      let combinedStringFormat = ""


      for (let i = 0; i<correctFormatArray.length; i++){

        combinedStringFormat = ""

        for (let dateArray = 0; dateArray<correctFormatArray[i].data.datum.length; dateArray++){
          combinedStringFormat += correctFormatArray[i].data.datum[dateArray]
          //The dates in copy array are now combined strings
        }
        copyArray[i].data.datum=parseFloat(combinedStringFormat)

      }
      //Sort them
      for (let x = 0; x<copyArray.length; x++){
        for (let y = 0; y<copyArray.length-1; y++){
          //if element < element + 1 : element + 1 = element and element = element + 1
          if (copyArray[y].data.datum < copyArray[y+1].data.datum){
            let interimVar = copyArray[y + 1];
            copyArray[y + 1] = copyArray[y];
            copyArray[y] = interimVar;

          }
        }
      }
      //Convert int dates to beautiful strings
      for (let i = 0; i<copyArray.length; i++){
        let interimString = copyArray[i].data.datum.toString();
        copyArray[i].data.datum = interimString.slice(0,4)+"-"+interimString.slice(4,6)+"-"+interimString.slice(6,8);
      }

      return copyArray

    }

    onMounted(async () => {
      let data = store.kontostandId
      let correctFormatArray = []
      let sortedArray = []
      //let datum = new Date();
      //let day = "";

      for (let i = 0; i < data.kontostandIDs.length; i++) {
        await axios.get(`http://localhost:8080/api/user/zugang/${data.kontostandIDs[i]}`).then(function(response){
          betrag2.push(response.data.beschriftug)
          responseArray.push(response)
          //datum = response.data.datum;
          //day = datum;
          //addRowToKontogang(i+1,response.data.datum,response.data.beschriftug,response.data.amount)
        })
      }
      correctFormatArray = correctDateFormat(responseArray)
      sortedArray = sortDate(correctFormatArray)

      dreiWerteBerechnen()

      let tableBody = document.getElementById("tbody1");
      if(tableBody.rows.length > 0) tableBody.innerHTML = "";


      for (let i = sortedArray.length-1; i>=0; i--){
        addRowToKontogang(i+1,sortedArray[i].data.id,sortedArray[i].data.datum,sortedArray[i].data.beschriftug,sortedArray[i].data.amount)
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
