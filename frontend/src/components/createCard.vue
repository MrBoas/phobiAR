<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">
          Criar nova sessão
        </span>
      </v-card-title>
      <v-card-text class="mb-n8">
        <v-row>
          <v-col cols="6">
            <v-text-field readonly
              v-model="createSession.patient"
              label="Nome do paciente"
            ></v-text-field>
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
                  v-model="createSession.session_date"
                  label="Data"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="createSession.session_date"
                @input="menu = false"
                locale="pt"
              ></v-date-picker>
            </v-menu>
            <v-select
              v-model="createSession.phobia"
              :items="phobias_list"
              label="Escolha uma fobia."
              @change="getPhobiaModelAfterPhobia()"
            ></v-select>
            <v-select
              v-model="createSession.model"
              :items="models_list"
              label="Escolha um modelo."
              @change="getModelLevelsAfterModel()"
              :disabled="createSession.phobia ? false : true"
            ></v-select>
            <v-select
              v-model="createSession.level"
              :items="levels_list"
              label="Escolha um nível."
              :disabled="(createSession.phobia && createSession.model) && createSession.marker!='niveis' ? false : true"
            ></v-select>
            <v-select
              v-model="createSession.marker"
              @change="createSession.marker=='niveis' ? createSession.level='' : createSession.level=createSession.level"
              :items="marker_list"
              label="Escolha um marcador."
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-textarea
              hide-details
              width ="100px"
              rows ="14"
              outlined
              v-model="createSession.notes"
              label= "Notas"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'

  const backend_url = process.env.VUE_APP_BACKEND_HOST
  const api_sessions_url = '/api/sessions'
  const api_phobias_url = '/api/phobias'
  const api_markers_url = '/api/markers'

export default {
  props: ['createSession','phobias_list','marker_list']  ,
   data: () => ({
      user: 'raul@gmail.com',
      menu: false,
      models_list:[],
      levels_list:[],
  }),
 methods: {

  getPhobiaModelAfterPhobia: async function () {
    if(this.createSession.phobia){
      this.createSession.model=''
      this.createSession.level=''
      axios.get(backend_url + api_phobias_url + '/'+ this.user + '/'+ this.createSession.phobia)
        .then(response =>{
          this.models_list = response.data
        })
        .catch(error => console.log(error))
    }
  },
  getModelLevelsAfterModel: async function () {
    if(this.createSession.model){
      this.createSession.level=''
      var urlAux = backend_url + api_phobias_url + '/'+ this.user + '/' +  this.createSession.phobia + '/' + this.createSession.model
      axios.get(urlAux)
        .then(response =>{
          this.levels_list = response.data
        })
        .catch(error => console.log(error))
    }
  },

 }
}
</script>
