<template>
	<v-container>
    <!-- <p> {{grouped_sessions_list_filtered}}</p> -->
    <h2> Lista de pacientes: </h2>
    <v-text-field
      label="Filtrar pacientes"
      v-model="filter_patient"
    ></v-text-field>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="patient_session_list in grouped_sessions_list_filtered"
        :key="patient_session_list.key"
      >
        <v-expansion-panel-header >{{patient_session_list.key}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-dialog
            v-model="dialogEditSession"
            max-width="700px"
            :retain-focus="false"
          >
            <v-card>
              <v-card-title>
                <span class="headline">
                  Editar sessão
                </span>
              </v-card-title>
              <v-card-text class="mb-n8">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editSession.session_name"
                      label="Nome da sessão"
                    ></v-text-field>
                    <v-text-field
                      v-model="editSession.patient"
                      label="Nome do paciente"
                    ></v-text-field>
                    <v-select
                      v-model="editSession.phobia"
                      :items="phobias_list"
                      label="Escolha uma fobia."
                      @change="getPhobiaModelAfterPhobia()"
                    ></v-select>
                    <v-select
                      v-model="editSession.model"
                      :items="models_list"
                      label="Escolha um modelo."
                      @change="getModelLevelsAfterModel()"
                      :disabled="editSession.phobia ? false : true"
                    ></v-select>
                    <v-select
                      v-model="editSession.level"
                      :items="levels_list"
                      label="Escolha um nível."
                      :disabled="editSession.phobia && editSession.model ? false : true"
                    ></v-select>
                    <v-select
                      v-model="editSession.marker"
                      :items="marker_list"
                      label="Escolha um marcador."
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                      hide-details
                      width ="100px"
                      rows ="12"
                      outlined
                      v-model="editSession.notes"
                      label= "Notas"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-col class="grow">
                  <v-btn block color="success"
                    @click="updateSession(editSession);
                      dialogEditSession=false;
                      patientChangedReload(editSession);
                      snackbar_edit = true"
                    :disabled="editSession.session_name && editSession.patient && editSession.phobia && editSession.model && editSession.level && editSession.marker    ? false : true">
                    Guardar
                  </v-btn>
                </v-col>
                <v-col class="grow">
                  <v-btn block color="error" @click="dialogEditSession=false">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-row
            v-for="session in patient_session_list.values"
            :key="session.session_name"
            >
            <v-col cols="12" class="pb-0">
              <!-- <h3> Sessão: {{session.session_name}}</h3> -->
              <!-- <v-divider/> -->
            </v-col>
          <v-col cols="12">
            <v-simple-table dense>
                <tr>
                  <th class="text-left">Sessão</th>
                  <td>{{ session.session_name }}</td>
                </tr>
                <tr>
                  <th class="text-left">Paciente</th>
                  <td>{{ session.patient }}</td>
                </tr>
                <tr>
                  <th class="text-left">Fobia</th>
                  <td>{{ session.phobia }}</td>
                </tr>
                <tr>
                  <th class="text-left">Modelo</th>
                  <td>{{ session.model }}</td>
                </tr>
                <tr>
                  <th class="text-left">Nível</th>
                  <td>{{ session.level }}</td>
                </tr>
                <tr>
                  <th class="text-left">Marcador</th>
                  <td>{{ session.marker }}</td>
                </tr>
                <tr v-if="session.notes">
                  <th class="text-left">Notas</th>
                  <td>{{ session.notes }}</td>
                </tr>
            </v-simple-table>
          </v-col>
          <v-col class="pt-0">
            <v-btn color="primary"
              rounded
              class="ml-3"
              @click="goToSession(session.phobia,session.model,session.level,session.marker)"
              :disabled="session.phobia && session.model && session.level && session.marker ? false : true"
              >
              Gerar
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn fab x-small depressed dark color="green" v-on="on"
                  class="mr-2 ml-3"
                  @click="dialogEditSession=true;
                  savedSessionEdit(session);
                  getPhobias();
                  getMarkers();
                  getPhobiaModels();
                  getModelLevels();"
                >
                <v-icon>create</v-icon>
                </v-btn>
              </template>
              <span>Editar Sessão</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
              <v-btn fab x-small depressed dark color="blue" v-on="on"
                class="mr-2"
                @click="downloadMarker(session.marker)"
              >
              <v-icon>get_app</v-icon>
              </v-btn>
              </template>
            <span>Download Marcador</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn fab x-small depressed dark color="red" v-on="on"
                    class="mr-2"
                    @click="deleteSession(session)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Apagar Sessão</span>
            </v-tooltip>
            <v-divider
              class="mt-5"
            >
            </v-divider>
          </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="snackbar_edit"
    >
      Sessão guardada com sucesso
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
	</v-container>
</template>


<script>
  import axios from 'axios'
  import * as d3 from 'd3'
  // const backend_url = 'http://localhost:3000/'
  const backend_url = 'http://' + process.env.VUE_APP_BACKEND_HOST + ':' + process.env.VUE_APP_BACKEND_PORT
  const api_sessions_url = '/api/sessions'
  const api_phobias_url = '/api/phobias'
  const api_markers_url = '/api/markers'
  const sessions_user_param = '/sessions'
  const user = 'raul@gmail.com'

  export default {
    data: () => ({
      session_oldname:"",
      filter_patient:"",
      patient_oldname:"",
      grouped_sessions_list:"",
      editSession:{
        session_name: "",
        patient: "",
        notes: "",
        phobia: "",
        model: "",
        level: "",
        marker: "",
      },
      testing:"",
      dialogEditSession:false,
      snackbar_edit: false,
      phobias_list:[],
      models_list:[],
      levels_list:[],
      marker_list:[],

    }),
    mounted: async function () {
      this.getSessions()
    },

    computed:{
      // corre sempre que alguma variável que ele está a usar é alterada
      grouped_sessions_list_filtered: function() {
        if(this.filter_patient){
          return this.grouped_sessions_list.filter( e =>e.key.includes(this.filter_patient) )
        }
        else
          return this.grouped_sessions_list
      },
    },
    methods: {
      savedSessionEdit(session) {
        this.session_oldname = session.session_name
        this.patient_oldname = session.patient
        this.editSession.session_name = session.session_name
        this.editSession.patient = session.patient
        this.editSession.notes =session.notes
        this.editSession.phobia = session.phobia
        this.editSession.model = session.model
        this.editSession.level = session.level
        this.editSession.marker = session.marker
      },

      getSessions(){
        axios.get(backend_url + api_sessions_url + '/' + user)
          .then(response => {
            var sessions_list = response.data.sort(response.data.patient)
            this.grouped_sessions_list = d3.nest()
              .key(function(d) { return d.patient; })
              .entries(sessions_list);
          })
          .catch(error => console.log(error))
      },

      getPhobias(){
        axios.get(backend_url  + api_phobias_url + '/' + user + '/lista')
          .then(response => {
            this.phobias_list = response.data
          })
          .catch(error => console.log(error))
      },

      getPhobiaModels: async function () {
        axios.get(backend_url + api_phobias_url + '/'+ user + '/'+ this.editSession.phobia)
          .then(response =>{
            this.models_list = response.data
          })
          .catch(error => console.log(error))
      },

      getModelLevels: async function () {
        var urlAux = backend_url + api_phobias_url + '/'+ user + '/' +  this.editSession.phobia + '/' + this.editSession.model
        axios.get(urlAux)
          .then(response =>{
            // a lista de inteiros por motivos desconhecidos
            var levels_listAux = response.data
            this.levels_list = levels_listAux.map(a=> a.toString())
          })
          .catch(error => console.log(error))
      },

      getPhobiaModelAfterPhobia: async function () {
        if(this.editSession.phobia){
          this.editSession.model=''
          this.editSession.level=''
          axios.get(backend_url + api_phobias_url + '/'+ user + '/'+ this.editSession.phobia)
            .then(response =>{
              this.models_list = response.data
            })
            .catch(error => console.log(error))
        }
      },

      getModelLevelsAfterModel: async function () {
        if(this.editSession.model){
          this.editSession.level=''
          var urlAux = backend_url + api_phobias_url + '/'+ user + '/' +  this.editSession.phobia + '/' + this.editSession.model
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

      deleteSession(session){
        axios.delete(backend_url+api_sessions_url + '/' + user+'/' + session.session_name + '/' + session.patient)
          .then(response=>{
            for(let i=0; i< this.grouped_sessions_list.length;i++){
              if(this.grouped_sessions_list[i].key === session.patient){
                for(let j=0; j < this.grouped_sessions_list[i].values.length;j++){
                  if( this.grouped_sessions_list[i].values[j].session_name === session.session_name){
                    this.grouped_sessions_list[i].values.splice(j,1)
                    break
                  }
                }
                // remover elemento da lista se tiver values vazios
                if(this.grouped_sessions_list[i].values.length == 0){
                  this.grouped_sessions_list.splice(i,1)
                }
                return
              }
            }
          })
          .catch(error => console.log(error))
        },

      updateSession(editSession){
        const url = backend_url+api_sessions_url + '/' + user+'/' + this.session_oldname + '/' + this.patient_oldname
        axios.put(url,editSession)
          .then(response=>{
            for (let i = 0; i < this.grouped_sessions_list.length; i++) {
              if(this.grouped_sessions_list[i].key === this.patient_oldname){
                for(let j = 0; j < this.grouped_sessions_list[i].values.length;j++){
                  if( this.grouped_sessions_list[i].values[j].session_name === this.session_oldname){
                    // mistério pq é que isto n funciona
                    // this.sessions_list[i].values = editSession
                    this.grouped_sessions_list[i].values[j].session_name = editSession.session_name
                    this.grouped_sessions_list[i].values[j].patient = editSession.patient
                    this.grouped_sessions_list[i].values[j].notes = editSession.notes
                    this.grouped_sessions_list[i].values[j].phobia = editSession.phobia
                    this.grouped_sessions_list[i].values[j].model = editSession.model
                    this.grouped_sessions_list[i].values[j].level = editSession.level
                    this.grouped_sessions_list[i].values[j].marker = editSession.marker
                    return
                  }
                }
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      goToSession(phobia,model,level,marker){
        var sessions_param = '/' + phobia + '/' + model + '/' + level + '/' + marker
        var url_session =  backend_url + sessions_user_param + '/' + user + sessions_param
        window.open(url_session)
      },
      patientChangedReload(editSession){
        // console.log(editSession)
        if(editSession.patient != this.patient_oldname)
          this.$router.go(0)
      },

    // arranjar uma maneira melhor depois
    downloadMarker(marker){
      var url = backend_url + api_markers_url + '/' + user + '/' + marker + '/download'
      window.open(url);
    }
    },


}
</script>