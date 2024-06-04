<script >
import { ref, onMounted } from 'vue';

export default {
    setup() {
        //lager en reactive string som oppdateres når den blir endret
        const inputData = ref('')

        //tar inputdata og leger den i user data og i post requesten sender vi data med variablen userdata så den kan bli referert i server filen
        const insertdata = async(userdata) => {
          try{
            const result = await axios.post('http://localhost:8080/insertdata',{userdata:userdata})
            console.log(result);
            //resultat.data er det man får tilbake fra servere vis den er success så vilconst newdata bli laget men vente til getdata har kjørt så etter legge storagedata.value in i variablen new data
            if(result.data.success) {
              const newdata = await getData();
              storagedata.value = newdata;
            }
            }catch (error){
              console.error('error inserting data', error); 
            }
        };

        //når vi trykker submit tar den all dataen og starter funksjon insert data og legger med input data 
        const submitData = () => {
          insertdata(inputData.value)
        }


// get data henter all data vi har sent til storage filen for å bli lagret så vi må hente den ut igjen for å så printe det ut vi legger denne dataen i newdata som skjer på linje 15
        const getData = async () => {
          try {
            const result = await axios.get('http://localhost:8080/getdata');
            console.log(result);
            return result.data.storagedata;

          } catch (error) {
            console.error('Error getting data:', error);
            return [];
          }
        };



        //så on mounted oppdaterer bare siden vær gang komponenten er fult satt opp eller sider er refreshet
        onMounted(async () => {
          storagedata.value = await getData();
       });
        //retunerer submit og input fra template slik att vi kan bruke dem i script
        return {
            submitData,
            inputData,
            storagedata
        };
    },
};


</script>

<template>
  <h1>vue save data</h1>
  <input v-model="inputData">
  <button @click="submitData">submit</button>
 
</template>

<style>

</style>
