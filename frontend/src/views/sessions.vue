<template>
	<v-container>
    <!-- <p> {{this.sessions_list[active_patient]}} </p> -->
    <!-- <p> {{this.sessions_list}} </p> -->
    <!-- <p> {{this.grouped_sessions_list}} </p> -->
    <v-expansion-panels accordion
      v-model="active_patient"
    >
      <v-expansion-panel
        v-for="element in grouped_sessions_list"
        :key="element.key"
      >
        <v-expansion-panel-header >{{element.key}}</v-expansion-panel-header>
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
                    <v-combobox
                      v-model="editSession.phobia"
                      :items="phobias_list"
                      label="Escolha uma fobia."
                      @change="getPhobiaModelAfterPhobia()"
                    ></v-combobox>
                    <v-combobox
                      v-model="editSession.model"
                      :items="models_list"
                      label="Escolha um modelo."
                      @change="getModelLevelsAfterModel()"
                      :disabled="editSession.phobia ? false : true"
                    ></v-combobox>
                    <v-combobox
                      v-model="editSession.level"
                      :items="levels_list"
                      label="Escolha um nível."
                      :disabled="editSession.phobia && editSession.model ? false : true"
                    ></v-combobox>
                    <v-combobox
                      v-model="editSession.marker"
                      :items="marker_list"
                      label="Escolha um marcador."
                    ></v-combobox>
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
                    @click="updateSession(editSession); dialogEditSession=false;"
                  >
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
          <v-row dense>
            <v-col cols="12"
              v-for="session in element.values"
              :key="session.session_name"
            >
              <v-card>
                <v-card-title>
                  Nome da Sessão: {{session.session_name}}
                </v-card-title>
                <!-- <p>  {{element.values}} </p> -->
                <v-row>
                  <v-col cols="6">
                    <v-card-text>
                      <p> Nome paciente: {{session.patient}} </p>
                      <p> Fobia: {{session.phobia}} </p>
                      <p> Modelo: {{session.model}} </p>
                      <p> Nível: {{session.level}} </p>
                      <p> Marcador: {{session.marker}} </p>
                    </v-card-text>
                    <v-btn color="primary"
                      @click="goToSession(session.phobia,session.model,session.level,session.marker)"
                      :disabled="session.phobia && session.model && session.level && session.marker ? false : true"
                      >
                      Gerar Sessão
                    </v-btn>
                    <v-btn color="primary"
                      @click="dialogEditSession=true;
                      savedSessionEdit(session);
                      getPhobias();
                      getMarkers();
                      getPhobiaModels();
                      getModelLevels();"
                    >
                      Editar
                    </v-btn>
                    <v-btn fab x-small depressed dark color="red"
                        @click="deleteSession(session)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <p> Notas sessões: {{session.notes}} </p>
                  </v-col>
                </v-row>
                <v-divider/>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
	</v-container>
</template>


<script>
  import axios from 'axios'
  import * as d3 from 'd3'

  const backend_url = 'http://localhost:3000/'
  const api_sessions_url = 'api/sessions'
  const api_phobias_url = 'api/phobias'
  const api_markers_url = 'api/markers'
  const sessions_user_param = 'sessions'
  const user = 'raul@gmail.com'

  export default {
    data: () => ({
      sessions_list: [],
      phobias_list:[],
      models_list:[],
      levels_list:[],
      marker_list:[],
      patient_list:[],
      filtered_sessions_list:[],
      dialogEditSession:false,
      session_oldname:"",
      active_patient:null,
      grouped_sessions_list:"",
      // filter_patient:"",
      editSession:{
        session_name: "",
        patient: "",
        notes: "",
        phobia: "",
        model: "",
        level: "",
        marker: "",
      },
    }),
    mounted: async function () {
      this.getSessions()
    },

    computed:{
      // corre sempre que alguma variável que ele está a usar é alterada
      // sessions_list_filtered: function() {
      //   if(this.filter_patient)
      //     return this.sessions_list.filter( e => e.patient == this.filter_patient)
      //   else
      //     return this.sessions_list
      // },
        computedFilter: function(){
          if(this.active_patient != null)
            return this.grouped_sessions_list[this.active_patient].values

      }
    },
    methods: {
      savedSessionEdit(session) {
        this.session_oldname=session.session_name
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
            this.sessions_list = response.data.sort(response.data.patient)
            var patient_listAux = response.data.map(function(obj){
              return obj.patient
            })
            this.patient_list = patient_listAux.filter(function(item,pos){
              return patient_listAux.indexOf(item) == pos;
            })
            this.grouped_sessions_list = d3.nest()
              .key(function(d) { return d.patient; })
              .entries(this.sessions_list);
              // console.log(this.grouped_sessions_list[1].values)
          })
          .catch(error => console.log(error))
      },
      // getSessionsOfPatient(patient){
      //     this.filtered_sessions_list = this.sessions_list.filter( e => e.patient == patient)
      //     // console.log(this.filtered_sessions_list)
      // },

      getPhobias(){
        axios.get(backend_url  + api_phobias_url + '/' + user)
          .then(response => {
            this.phobias_list = response.data
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
      getPhobiaModels: async function () {
        axios.get(backend_url + api_phobias_url + '/'+ user + '/'+ this.editSession.phobia)
          .then(response =>{
            this.models_list = response.data
          })
          .catch(error => console.log(error))
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
      getModelLevels: async function () {
        var urlAux = backend_url + api_phobias_url + '/'+ user + '/' +  this.editSession.phobia + '/' + this.editSession.model
        axios.get(urlAux)
          .then(response =>{
            this.levels_list = response.data
          })
          .catch(error => console.log(error))
      },
      getMarkers(){
        axios.get(backend_url+api_markers_url + '/'+ user)
          .then(response=>{
            this.marker_list=response.data
          })
          .catch(error =>console.log(error))
      },

      deleteSession(session){
        axios.delete(backend_url+api_sessions_url + '/' + user+'/' + session.session_name)
          .then(response=>{
            for(let i=0; i< this.grouped_sessions_list.length;i++){
              if(this.grouped_sessions_list[i].key ===session.patient){
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
        const url = backend_url+api_sessions_url + '/' + user+'/' + this.session_oldname
        axios.put(url,editSession)
          .then(response=>{
            for (let i = 0; i < this.sessions_list.length; i++) {
              if(this.sessions_list[i].session_name===this.session_oldname){
                // mistério pq é que isto n funciona
                // this.sessions_list[i] = editSession
                this.sessions_list[i].session_name = editSession.session_name
                this.sessions_list[i].patient = editSession.patient
                this.sessions_list[i].phobia = editSession.phobia
                this.sessions_list[i].model = editSession.model
                this.sessions_list[i].level = editSession.level
                this.sessions_list[i].marker = editSession.marker
                return
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
    },

}
</script>