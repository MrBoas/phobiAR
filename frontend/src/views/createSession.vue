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
          @change="getModelLevels()"
        ></v-combobox>

        <v-combobox
          v-model="selected_level"
          :items="levels_list"
          label="Escolha um nível."
        ></v-combobox>

        <v-btn color="primary"
          @click="goToSession()"
          :disabled="selected_level ? false : true">
          Gerar Sessão
        </v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  const backend_url = 'http://localhost:3000/'
  const phobias_user_param = 'api/phobias/raul@gmail.com'
  const sessions_user_param = 'sessions/raul@gmail.com'

  export default {
    data: () => ({
      selected_phobia: '',
      selected_model: '',
      selected_level:'',
      phobias_list:[],
      models_list:[],
      levels_list:[]
    }),
    mounted: async function () {
      this.getPhobias()
    },

    methods: {

      getPhobias(){
        axios.get(backend_url  + phobias_user_param)
          .then(response => {
            this.phobias_list = response.data
          })
          .catch(error => console.log(error))
      },

      getPhobiaModel: async function () {
        this.selected_model=''
        this.selected_level=''
        axios.get(backend_url + phobias_user_param + '/' + this.selected_phobia)
          .then(response =>{
            this.models_list = response.data
          })
          .catch(error => console.log(error))
      },

      getModelLevels: async function () {
        this.selected_level=''
        var urlAux = backend_url + phobias_user_param + '/' + this.selected_phobia + '/' + this.selected_model
        axios.get(urlAux)
          .then(response =>{
            this.levels_list = response.data
          })
          .catch(error => console.log(error))
      },

      goToSession(){
        var sessions_param = '/' + this.selected_phobia + '/' + this.selected_model + '/' + this.selected_level
        var url_session =  backend_url + sessions_user_param + sessions_param
        window.open(url_session)
      }
    },

}
</script>
