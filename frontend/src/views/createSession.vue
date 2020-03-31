<template>
  <v-container>
    <v-row>
      <v-col cols="12"/>
    </v-row>

    <v-row>
      <v-col cols="1"/>
      <v-col cols="10">
        <v-combobox
          v-model="selected_phobia"
          :items="phobias_list"
          label="Escolha uma fobia."
          @change="getPhobiaModel()"
        ></v-combobox>

        <v-combobox
          v-model="selected_model"
          :items="models_list"
          label="Escolha um modelo."
        ></v-combobox>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  const backend_url = 'http://localhost:3000/api/'
  const phobias_user_param = 'phobias/raul@gmail.com'

  export default {
    data: () => ({
      selected_phobia: '',
      selected_model: '',
      phobias_list:[],
      models_list:[],
    }),
    mounted: async function () {
      this.getPhobias()
      // this.getPhobiaModel()
    },

    methods: {
      // capitalize(word){
      //   return word.charAt(0).toUpperCase() + word.slice(1)
      // },

      getPhobias(){
        axios.get(backend_url  + phobias_user_param)
          .then(response => {
            this.phobias_list = response.data
            // this.phobias_list = this.phobias_list.map(a=>this.capitalize(a))
          })
          .catch(error => console.log(error))
      },

      getPhobiaModel: async function () {
        this.selected_model=''
        axios.get(backend_url + phobias_user_param + '/' + this.selected_phobia)
          .then(response =>{
            this.models_list = response.data
          })
          .catch(error => console.log(error))
      },

    },

}
</script>
