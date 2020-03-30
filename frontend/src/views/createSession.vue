<template>
  <v-container>
    <v-row>
      <v-col cols="12"/>
    </v-row>

    <v-row>
      <v-col cols="1"/>
      <v-col cols="10">
        <v-combobox
          v-model="select_set"
          :items="phobias_list"
          label="Escolha uma fobia."
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  const backend_url = 'http://localhost:3000/api/'

  export default {
    data: () => ({
      phobias_list:[],
      select_set:"",
    }),
    mounted: async function () {
      this.getPhobias()
    },

    methods: {
      capitalize(word){
        return word.charAt(0).toUpperCase() + word.slice(1)
      },

      getPhobias(){
        axios.get(backend_url + 'phobias/raul@gmail.com')
          .then(response => {
            this.phobias_list = response.data
            this.phobias_list = this.phobias_list.map(a=>this.capitalize(a))
          })
          .catch(error => console.log(error))
      }
    },

}
</script>
