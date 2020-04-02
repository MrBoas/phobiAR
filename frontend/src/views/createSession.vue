<template>
  <v-container>
    <v-row>
      <v-col cols="12"/>
    </v-row>

    <v-row>
      <v-col cols="1"/>
      <v-col cols="2" class="mr-6">
        <v-text-field
          v-model= "session"
          label="Nome da sessão"
        ></v-text-field>
          <v-text-field
          v-model= "patient"
          label="Nome do paciente"
        ></v-text-field>
        <v-combobox
          v-model="selected_phobia"
          :items="phobias_list"
          label="Escolha uma fobia."
          @change="getPhobiaModel()"
        ></v-combobox>
      </v-col>
      <v-col cols="2" class="mx-6">
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

        <v-combobox
          v-model="selected_marker"
          :items="marker_list"
          label="Escolha um marcador."
        ></v-combobox>
      </v-col>
      <v-col cols="3" class="mx-6">
        <v-textarea
          rows ="7"
          outlined
          v-model="notes"
          label= "Notas"
        ></v-textarea>
      </v-col>
      <v-col cols="1">
        <v-btn color="primary"
          @click="goToSession()"
          :disabled="selected_level && selected_marker ? false : true">
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
  const markers_user_param = 'api/markers/raul@gmail.com'
  const sessions_user_param = 'sessions/raul@gmail.com'

  export default {
    data: () => ({
      selected_phobia: '',
      selected_model: '',
      selected_level:'',
      selected_marker:'',
      patient:'',
      session:'',
      notes:'',
      phobias_list:[],
      models_list:[],
      levels_list:[],
      marker_list:[]
    }),
    mounted: async function () {
      this.getPhobias()
      this.getMarkers()
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
        if(this.selected_phobia){
          this.selected_model=''
          this.selected_level=''
          axios.get(backend_url + phobias_user_param + '/' + this.selected_phobia)
            .then(response =>{
              this.models_list = response.data
            })
            .catch(error => console.log(error))
        }
      },

      getModelLevels: async function () {
        if(this.selected_model){
          this.selected_level=''
          var urlAux = backend_url + phobias_user_param + '/' + this.selected_phobia + '/' + this.selected_model
          axios.get(urlAux)
            .then(response =>{
              this.levels_list = response.data
            })
            .catch(error => console.log(error))
        }
      },

      getMarkers(){
        axios.get(backend_url+markers_user_param)
          .then(response=>{
            this.marker_list=response.data
          })
          .catch(error =>console.log(error))
      },
      goToSession(){
        var sessions_param = '/' + this.selected_phobia + '/' + this.selected_model + '/' + this.selected_level + '/' + this.selected_marker
        var url_session =  backend_url + sessions_user_param + sessions_param
        window.open(url_session)
      }
    },

}
</script>
