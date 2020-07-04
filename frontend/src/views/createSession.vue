<template>
  <v-container >
    <v-row
      justify="center"
    >
      <v-col cols="5" sm="5">
        <h3> Preencha:</h3>
         <v-text-field
          v-model= "patient"
          label="Nome do paciente"
        ></v-text-field>

        <h3> Escolha: </h3>
        <v-select
          v-model="selected_phobia"
          :items="phobias_list"
          label="Fobia"
          @change="getPhobiaModel()"
        ></v-select>

        <v-select
          v-model="selected_model"
          :items="models_list"
          label="Modelo"
          @change="getModelLevels()"
          :disabled="selected_phobia ? false : true"
        ></v-select>

        <v-select
          v-model="selected_level"
          :items="levels_list"
          label="Nível"
          :disabled="(selected_phobia && selected_model) && selected_marker!='niveis' ? false : true"
        ></v-select>
      </v-col>
      <v-col cols="5" sm="5">

        <!-- Calendário -->
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="mt-8"
              v-model="session_date"
              label="Data"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="session_date"
            @input="menu = false"
            locale="pt"
            ></v-date-picker>
        </v-menu>

        <v-select
          class="mt-8"
          v-model="selected_marker"
          :items="marker_list"
          @change="selected_marker=='niveis' ? selected_level='' : selected_level=selected_level"
          label="Marcador"
        ></v-select>
      </v-col>
      <v-col cols="10" sm="10">
        <v-textarea
          rows ="6"
          outlined
          v-model="notes"
          label= "Notas Sessão"
        ></v-textarea>
        <v-row
          justify="end"
        >
          <v-btn color="primary"
            @click="saveSession();clearInformation();snackbar_create=true"
            :disabled="session_date && patient && selected_model && (selected_level || (selected_marker=='niveis' && selected_level=='')) && selected_marker ? false : true">
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

  const backend_url =  process.env.VUE_APP_BACKEND_HOST
  const api_phobias_url = '/api/phobias'
  const api_markers_url = '/api/markers'
  const api_sessions_url = '/api/sessions'
  const sessions_user_param = '/sessions'
  const user = 'raul@gmail.com'
  const qs = require('querystring')

  export default {
    data: () => ({
      selected_phobia: '',
      selected_model: '',
      selected_level:'',
      selected_marker:'',
      patient:'',
      notes:'',
      snackbar_create: false,
      phobias_list:[],
      models_list:[],
      levels_list:[],
      marker_list:[],
      session_date: new Date().toISOString().substr(0, 10),
      menu: false,
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
      saveSession(){
        var body = {
          'session_date': this.session_date,
          'patient': this.patient,
          'notes': this.notes,
          'phobia': this.selected_phobia,
          'model': this.selected_model,
          'level': this.selected_level,
          'marker': this.selected_marker,
        }

        var url = backend_url + api_sessions_url + '/' + user + '/upload'
        axios.post(url,body)
          .then(response=>{})
          .catch(error => console.log(error))
      },

      clearInformation(){
        this.selected_phobia= ''
        this.selected_model= ''
        this.selected_level=''
        this.selected_marker=''
        this.patient='',
        this.session_date=new Date().toISOString().substr(0, 10)
        this.notes=''
      }
    },
}
</script>
