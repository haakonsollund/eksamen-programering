<script >
import { ref, onMounted } from 'vue';

export default {
    setup() {
        //lager en reactive string som oppdateres når den blir endret
        const inputData = ref('')

        //tar inputdata og leger den i user data og i post requesten sender vi data med variablen userdata så den kan bli referert i server filen
        const insertdata = async(userdata) => {
          const result = await axios.post(`http://localhost:8080/insertdata`,{userdata:userdata})
          console.log(result)
        }

        //når vi trykker submit tar den all dataen og starter funksjon insert data og legger med input data 
        const submitData = () => {
          insertdata(inputData.value)
        }

        onMounted(async () => {
          storagedata.value = await getData();
       });
        //retunerer submit og input fra template slik att vi kan bruke dem i script
        return {
            submitData,
            inputData
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
