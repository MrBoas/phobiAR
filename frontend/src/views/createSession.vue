<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col cols="5" sm="5">
        <v-text-field
          v-model= "session_name"
          label="Nome da sessão"
        ></v-text-field>
        <v-select
          v-model="selected_phobia"
          :items="phobias_list"
          label="Escolha uma fobia."
          @change="getPhobiaModel()"
        ></v-select>

        <v-select
          v-model="selected_model"
          :items="models_list"
          label="Escolha um modelo."
          @change="getModelLevels()"
          :disabled="selected_phobia ? false : true"
        ></v-select>

        <v-select
          v-model="selected_level"
          :items="levels_list"
          label="Escolha um nível."
          :disabled="selected_phobia && selected_model ? false : true"
        ></v-select>
      </v-col>
      <v-col cols="5" sm="5">
         <v-text-field
          v-model= "patient"
          label="Nome do paciente"
        ></v-text-field>
        <v-select
          v-model="selected_marker"
          :items="marker_list"
          label="Escolha um marcador."
        ></v-select>
      </v-col>
      <v-col cols="10" sm="10">
        <v-textarea
          rows ="7"
          outlined
          v-model="notes"
          label= "Notas Sessão"
        ></v-textarea>
        <v-row
          justify="end"
        >
          <v-btn color="primary"
            @click="saveSession();snackbar_create=true"
            :disabled="session_name && patient && selected_model && selected_level && selected_marker ? false : true">
            Guardar Sessão
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar
          v-model="snackbar_create"
        >
          Sessão criada com sucesso
          <v-btn
            color="blue"
            text
            @click="snackbar_create = false"
          >
            Close
          </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import { ModelGltf } from 'vue-3d-model'
  // const backend_url = 'http://localhost:3000/'
  const backend_url = 'http://' + process.env.VUE_APP_BACKEND_HOST + ':' + process.env.VUE_APP_BACKEND_PORT
  const api_phobias_url = '/api/phobias'
  const api_markers_url = '/api/markers'
  const api_sessions_url = '/api/sessions'
  const sessions_user_param = '/sessions'
  const user = 'raul@gmail.com'

  export default {
    data: () => ({
      selected_phobia: '',
      selected_model: '',
      selected_level:'',
      selected_marker:'',
      patient:'',
      session_name:'',
      notes:'',
      snackbar_create: false,
      phobias_list:[],
      models_list:[],
      levels_list:[],
      marker_list:[]
    }),
    mounted: async function () {
      this.getPhobias()
      this.getMarkers()
    },
    components: {
        ModelGltf
    },
    methods: {

      getPhobias(){
        axios.get(backend_url  +  api_phobias_url + '/' + user + '/lista')
          .then(response => {
            this.phobias_list = response.data
          })
          .catch(error => console.log(error))
      },

      getPhobiaModel: async function () {
        if(this.selected_phobia){
          this.selected_model=''
          this.selected_level=''
          axios.get(backend_url + api_phobias_url + '/'+ user + '/'+ this.selected_phobia)
            .then(response =>{
              this.models_list = response.data
            })
            .catch(error => console.log(error))
        }
      },

      getModelLevels: async function () {
        if(this.selected_model){
          this.selected_level=''
          var urlAux = backend_url + api_phobias_url + '/'+ user + '/' + this.selected_phobia + '/' + this.selected_model
          axios.get(urlAux)
            .then(response =>{
              this.levels_list = response.data
            })
            .catch(error => console.log(error))
        }
      },

      getMarkers(){
        axios.get(backend_url+api_markers_url + '/'+ user)
          .then(response=>{
            this.marker_list=response.data
          })
          .catch(error =>console.log(error))
      },
      goToSession(){
        var sessions_param = '/' + this.selected_phobia + '/' + this.selected_model + '/' + this.selected_level + '/' + this.selected_marker
        var url_session =  backend_url + sessions_user_param + '/' + user + sessions_param
        window.open(url_session)
      },

      saveSession(){
        var body = {
          'session_name': this.session_name,
          'patient': this.patient,
          'notes': this.notes,
          'phobia': this.selected_phobia,
          'model': this.selected_model,
          'level': this.selected_level,
          'marker': this.selected_marker,
        }
        var url = backend_url + api_sessions_url + '/' + user + '/upload'
        console.log(url)
        axios.post(url,body)
          .then(response=>{})
          .catch(error => console.log(error))
      }
    },

}
</script>
