<template>
  <v-container>
    <h2 v-if="grouped_sessions_list_filtered.length>0">Lista de Sessões por Paciente:</h2>
    <!-- <p> {{grouped_sessions_list}}</p> -->
    <v-text-field
      v-if="grouped_sessions_list_filtered.length>0"
      clearable
      label="Procurar paciente"
      v-model="filter_patient"
    ></v-text-field>
    <h2 v-if="grouped_sessions_list_filtered.length==0">Sem nenhuma sessão criada</h2>
    <v-btn
      v-if="grouped_sessions_list_filtered.length==0"
      class="mt-3"
      color="primary"
      link
      to="/criarsessao"
    >Criar uma Sessão</v-btn>
    <!-- meter aqui um botão para rederecionar para a tab de criar sessao quando n há pacientes -->
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="patient_session_list in grouped_sessions_list_filtered"
        :key="patient_session_list.key"
      >
        <v-expansion-panel-header>{{patient_session_list.key}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- v-dialog do criar -->
          <v-dialog v-model="dialogCreateSession" max-width="700px" :retain-focus="false">
            <v-card>
              <v-card-title>
                <span class="headline">Criar nova sessão</span>
              </v-card-title>
              <v-card-text class="mb-n8">
                <v-row>
                  <v-col cols="6">
                    <!-- <p>session_date: {{createSession.session_date}} </p>
                    <p>complete_session_date: {{createSession.complete_session_date}} </p>
                    <p> computed: {{full_createSession_date}} </p>-->
                    <v-text-field readonly v-model="createSession.patient" label="Nome do paciente"></v-text-field>
                    <v-menu
                      v-model="menuCriar"
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
                        @input="menuCriar = false"
                        @change="createSession.complete_session_date = full_createSession_date"
                        locale="pt"
                      ></v-date-picker>
                    </v-menu>
                    <v-select
                      v-model="createSession.phobia"
                      :items="phobias_list"
                      label="Escolha uma fobia."
                      @change="getPhobiaModelAfterPhobia2()"
                    ></v-select>
                    <v-select
                      v-model="createSession.model"
                      :items="models_list"
                      label="Escolha um modelo."
                      @change="getModelLevelsAfterModel2()"
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
                      width="100px"
                      rows="14"
                      outlined
                      v-model="createSession.notes"
                      label="Notas"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-col class="grow">
                  <v-btn
                    block
                    color="success"
                    @click="createNewSession(createSession);
                      dialogCreateSession=false;
                      snackbar_edit = true"
                    :disabled="createSession.session_date && createSession.patient && createSession.phobia && createSession.model && (createSession.level || (createSession.marker=='niveis' && createSession.level=='')) && createSession.marker ? false : true"
                  >Guardar</v-btn>
                </v-col>
                <v-col class="grow">
                  <v-btn block color="error" @click="dialogCreateSession=false;">Cancelar</v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- v-dialog do editar -->
          <v-dialog v-model="dialogEditSession" max-width="700px" :retain-focus="false">
            <v-card>
              <v-card-title>
                <span class="headline">Editar sessão</span>
              </v-card-title>
              <v-card-text class="mb-n8">
                <v-row>
                  <v-col cols="6">
                    <!-- <p>computed: {{full_editSession_date}} </p>
                    <p>editSession.complete_session_date: {{editSession.complete_session_date}}</p>
                    <p>editSession.session_date: {{editSession.session_date}} </p>
                    <p>session_olddate: {{session_olddate}} </p>
                    <p>session_olddate_complete: {{session_olddate_complete}} </p>-->
                    <v-text-field v-model="editSession.patient" label="Nome do paciente"></v-text-field>
                    <v-menu
                      v-model="menuEditar"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editSession.session_date"
                          label="Data"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editSession.session_date"
                        @input="menuEditar = false"
                        @change="editSession.complete_session_date = full_editSession_date"
                        locale="pt"
                      ></v-date-picker>
                    </v-menu>
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
                      :disabled="(editSession.phobia && editSession.model) && editSession.marker!='niveis' ? false : true"
                    ></v-select>
                    <v-select
                      v-model="editSession.marker"
                      @change="editSession.marker=='niveis' ? editSession.level='' : editSession.level=editSession.level"
                      :items="marker_list"
                      label="Escolha um marcador."
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                      hide-details
                      width="100px"
                      rows="14"
                      outlined
                      v-model="editSession.notes"
                      label="Notas"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-col class="grow">
                  <v-btn
                    block
                    color="success"
                    @click="updateSession(editSession);
                      dialogEditSession=false;
                      patientOrDateChangedReload(editSession);
                      snackbar_edit = true"
                    :disabled="editSession.session_date && editSession.patient && editSession.phobia && editSession.model && (editSession.level || (editSession.marker=='niveis' && editSession.level=='')) && editSession.marker ? false : true"
                  >Guardar</v-btn>
                </v-col>
                <v-col class="grow">
                  <v-btn block color="error" @click="dialogEditSession=false">Cancelar</v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-row v-for="(session,index) in patient_session_list.values" :key="index">
            <v-col cols="12" class="pb-0"></v-col>
            <v-col cols="12">
              <!-- <p> {{session.session_date}} </p>
              <p> {{session}} </p>-->
              <v-simple-table class="ml-4" dense>
                <tr>
                  <th class="text-left">Paciente</th>
                  <td style="width:700px">{{ session.patient }}</td>
                </tr>
                <tr>
                  <th class="text-left">Data</th>
                  <td style="width:700px">{{ session.session_date.substr(0,10) }}</td>
                </tr>
                <tr>
                  <th class="text-left">Fobia</th>
                  <td style="width:700px">{{ session.phobia }}</td>
                </tr>
                <tr>
                  <th class="text-left">Modelo</th>
                  <td style="width:700px">{{ session.model }}</td>
                </tr>
                <tr v-if="session.level">
                  <th class="text-left">Nível</th>
                  <td style="width:700px">{{ session.level }}</td>
                </tr>
                <tr>
                  <th class="text-left">Marcador</th>
                  <td style="width:700px">{{ session.marker }}</td>
                </tr>
                <tr v-if="session.notes">
                  <th class="text-left">Notas</th>
                  <td style="width:700px">{{ session.notes }}</td>
                </tr>
              </v-simple-table>
            </v-col>
            <v-col class="pt-0">
              <v-btn
                color="primary"
                depressed
                rounded
                class="ml-2"
                @click="goToSession(session.phobia,session.model,session.level,session.marker)"
                :disabled="session.phobia && session.model && (session.level || (session.marker=='niveis' && session.level=='')) && session.marker ? false : true"
              >Gerar</v-btn>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @mouseover="getQRCodeLevel(session.phobia,session.model,session.level,session.marker)"
                    depressed
                    fab
                    dark
                    rounded
                    x-small
                    color="black"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>qr_code</v-icon>
                  </v-btn>
                </template>
                <img
                  :src="'https://api.qrserver.com/v1/create-qr-code/?data='
                  +'https://phobiar-be.epl.di.uminho.pt/sessions/'
                  +  user + '/' + session.phobia + '/' + session.model + '/' + qrCodeLevel + '/' + session.marker
                  +'&ampsize=300x300'"
                />
                <v-row justify="center">
                  <h4>QR Code para gerar a sessão</h4>
                </v-row>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    x-small
                    depressed
                    dark
                    color="blue"
                    v-on="on"
                    class="mr-2 ml-2"
                    @click="dialogEditSession=true;
                    savedSessionEdit(session);
                    getPhobias();
                    getMarkers();
                    getPhobiaModels();
                    getModelLevels();"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar Sessão</span>
              </v-tooltip>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    x-small
                    depressed
                    dark
                    color="red"
                    v-on="on"
                    class="mr-2"
                    @click="deleteWarning=true"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <v-alert class="mb-0" type="warning" v-model="deleteWarning">
                  Tem a certeza que quer apagar a sessão?
                  <v-btn
                    class="mr-2 ml-2"
                    depressed
                    dark
                    color="green"
                    @click="deleteSession(session);deleteWarning=false"
                  >Sim</v-btn>
                  <v-btn depressed dark color="red" @click="deleteWarning=false">Não</v-btn>
                </v-alert>
              </v-menu>

              <v-divider class="mt-5"></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                rounded
                depressed
                dark
                color="green"
                class="ml-2"
                @click="dialogCreateSession=true;
                  cleanCreateSessionInfo(patient_session_list.key,patient_session_list.values[0].phobia);
                  getPhobias();
                  getMarkers()"
              >Criar Nova Sessão</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar v-model="snackbar_edit">
      Sessão guardada com sucesso
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
import axios from "axios";
import * as d3 from "d3";

const backend_url = process.env.VUE_APP_BACKEND_HOST;
const api_sessions_url = "/api/sessions";
const api_phobias_url = "/api/phobias";
const api_markers_url = "/api/markers";
const sessions_user_param = "/sessions";

export default {
  components: {},
  data: () => ({
    user: "raul@gmail.com",
    session_olddate_complete: "",
    session_olddate: "",
    filter_patient: "",
    patient_oldname: "",
    grouped_sessions_list: "",
    qrCodeLevel: "",
    editSession: {
      session_date: "",
      complete_session_date: "",
      patient: "",
      notes: "",
      phobia: "",
      model: "",
      level: "",
      marker: ""
    },
    createSession: {
      session_date: "",
      complete_session_date: "",
      patient: "",
      notes: "",
      phobia: "",
      model: "",
      level: "",
      marker: ""
    },
    menuCriar: false,
    menuEditar: false,
    dialogEditSession: false,
    dialogCreateSession: false,
    snackbar_edit: false,
    deleteWarning: false,
    phobias_list: [],
    models_list: [],
    levels_list: [],
    marker_list: []
  }),
  mounted: async function() {
    this.getSessions();
  },

  computed: {
    // corre sempre que alguma variável que ele está a usar é alterada
    grouped_sessions_list_filtered: function() {
      if (this.filter_patient) {
        return this.grouped_sessions_list.filter(e =>
          e.key.toLowerCase().includes(this.filter_patient.toLowerCase())
        );
      } else return this.grouped_sessions_list;
    },
    full_editSession_date: function() {
      if (this.session_olddate != this.editSession.session_date) {
        var incompleteDate = new Date().toISOString().substr(10, 24);
        // this.editSession.complete_session_date = this.editSession.session_date + incompleteDate
        return this.editSession.session_date + incompleteDate;
      }
    },
    full_createSession_date: function() {
      var incompleteDate = new Date().toISOString().substr(10, 24);
      // this.createSession.complete_session_date = this.createSession.session_date + incompleteDate
      return this.createSession.session_date + incompleteDate;
    }
  },
  methods: {
    savedSessionEdit(session) {
      this.session_olddate = session.session_date.substr(0, 10);
      this.session_olddate_complete = session.session_date;
      this.editSession.session_date = session.session_date.substr(0, 10);
      this.editSession.complete_session_date = session.session_date;
      this.patient_oldname = session.patient;
      this.editSession.patient = session.patient;
      this.editSession.notes = session.notes;
      this.editSession.phobia = session.phobia;
      this.editSession.model = session.model;
      this.editSession.level = session.level;
      this.editSession.marker = session.marker;
    },

    getSessions() {
      axios
        .get(backend_url + api_sessions_url + "/" + this.user)
        .then(response => {
          var sessions_list = response.data.sort(response.data.patient);
          this.grouped_sessions_list = d3
            .nest()
            .key(function(d) {
              return d.patient;
            })
            .entries(sessions_list);
        })
        .catch(error => console.log(error));
    },

    getPhobias() {
      axios
        .get(backend_url + api_phobias_url + "/" + this.user + "/lista")
        .then(response => {
          this.phobias_list = response.data;
        })
        .catch(error => console.log(error));
    },

    getPhobiaModels: async function() {
      axios
        .get(
          backend_url +
            api_phobias_url +
            "/" +
            this.user +
            "/" +
            this.editSession.phobia
        )
        .then(response => {
          this.models_list = response.data;
        })
        .catch(error => console.log(error));
    },

    getModelLevels: async function() {
      var urlAux =
        backend_url +
        api_phobias_url +
        "/" +
        this.user +
        "/" +
        this.editSession.phobia +
        "/" +
        this.editSession.model;
      axios
        .get(urlAux)
        .then(response => {
          // a lista de inteiros por motivos desconhecidos
          var levels_listAux = response.data;
          this.levels_list = levels_listAux.map(a => a.toString());
        })
        .catch(error => console.log(error));
    },

    getPhobiaModelAfterPhobia: async function() {
      if (this.editSession.phobia) {
        this.editSession.model = "";
        this.editSession.level = "";
        axios
          .get(
            backend_url +
              api_phobias_url +
              "/" +
              this.user +
              "/" +
              this.editSession.phobia
          )
          .then(response => {
            this.models_list = response.data;
          })
          .catch(error => console.log(error));
      }
    },

    getModelLevelsAfterModel: async function() {
      if (this.editSession.model) {
        this.editSession.level = "";
        var urlAux =
          backend_url +
          api_phobias_url +
          "/" +
          this.user +
          "/" +
          this.editSession.phobia +
          "/" +
          this.editSession.model;
        axios
          .get(urlAux)
          .then(response => {
            this.levels_list = response.data;
          })
          .catch(error => console.log(error));
      }
    },

    getPhobiaModelAfterPhobia2: async function() {
      if (this.createSession.phobia) {
        this.createSession.model = "";
        this.createSession.level = "";
        axios
          .get(
            backend_url +
              api_phobias_url +
              "/" +
              this.user +
              "/" +
              this.createSession.phobia
          )
          .then(response => {
            this.models_list = response.data;
          })
          .catch(error => console.log(error));
      }
    },
    getModelLevelsAfterModel2: async function() {
      if (this.createSession.model) {
        this.createSession.level = "";
        var urlAux =
          backend_url +
          api_phobias_url +
          "/" +
          this.user +
          "/" +
          this.createSession.phobia +
          "/" +
          this.createSession.model;
        axios
          .get(urlAux)
          .then(response => {
            this.levels_list = response.data;
          })
          .catch(error => console.log(error));
      }
    },
    getMarkers() {
      axios
        .get(backend_url + api_markers_url + "/" + this.user)
        .then(response => {
          this.marker_list = response.data;
        })
        .catch(error => console.log(error));
    },
    createNewSession(createSession) {
      var session = {
        session_date: createSession.complete_session_date,
        patient: createSession.patient,
        notes: createSession.notes,
        phobia: createSession.phobia,
        model: createSession.model,
        level: createSession.level,
        marker: createSession.marker
      };
      var url = backend_url + api_sessions_url + "/" + this.user + "/upload";
      axios
        .post(url, session)
        .then(response => {
          for (let i = 0; i < this.grouped_sessions_list.length; i++) {
            if (this.grouped_sessions_list[i].key === session.patient) {
              for (
                let j = 0;
                j < this.grouped_sessions_list[i].values.length;
                j++
              ) {
                if (
                  this.grouped_sessions_list[i].values[j].session_date <
                  createSession.complete_session_date
                ) {
                  this.grouped_sessions_list[i].values.splice(j, 0, session);
                  return;
                }
              }
              // quando o lemento vai ser adicionado na última posição
              this.grouped_sessions_list[i].values.push(session);
            }
          }
        })
        .catch(error => console.log(error));
    },

    deleteSession(session) {
      axios
        .delete(
          backend_url +
            api_sessions_url +
            "/" +
            this.user +
            "/" +
            session.session_date +
            "/" +
            session.patient
        )
        .then(response => {
          for (let i = 0; i < this.grouped_sessions_list.length; i++) {
            if (this.grouped_sessions_list[i].key === session.patient) {
              for (
                let j = 0;
                j < this.grouped_sessions_list[i].values.length;
                j++
              ) {
                if (
                  this.grouped_sessions_list[i].values[j].session_date ===
                  session.session_date
                ) {
                  this.grouped_sessions_list[i].values.splice(j, 1);
                  break;
                }
              }
              // remover elemento da lista se tiver values vazios
              if (this.grouped_sessions_list[i].values.length == 0) {
                this.grouped_sessions_list.splice(i, 1);
              }
              return;
            }
          }
        })
        .catch(error => console.log(error));
    },

    updateSession(session) {
      const url =
        backend_url +
        api_sessions_url +
        "/" +
        this.user +
        "/" +
        this.session_olddate_complete +
        "/" +
        this.patient_oldname;
      axios
        .put(url, session)
        .then(response => {
          for (let i = 0; i < this.grouped_sessions_list.length; i++) {
            if (this.grouped_sessions_list[i].key === this.patient_oldname) {
              for (
                let j = 0;
                j < this.grouped_sessions_list[i].values.length;
                j++
              ) {
                if (
                  this.grouped_sessions_list[i].values[j].session_date ===
                  this.session_olddate_complete
                ) {
                  this.grouped_sessions_list[i].values[j].session_date =
                    session.complete_session_date;
                  this.grouped_sessions_list[i].values[j].patient =
                    session.patient;
                  this.grouped_sessions_list[i].values[j].notes = session.notes;
                  this.grouped_sessions_list[i].values[j].phobia =
                    session.phobia;
                  this.grouped_sessions_list[i].values[j].model = session.model;
                  this.grouped_sessions_list[i].values[j].level = session.level;
                  this.grouped_sessions_list[i].values[j].marker =
                    session.marker;
                  return;
                }
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getModelLevelsList(urlAux) {
      axios
        .get(urlAux)
        .then(response => {
          this.niveis = response.data;
        })
        .catch(error => console.log(error));
    },

    goToSession: async function(phobia, model, level, marker) {
      if (marker == "niveis") {
        var urlAux = backend_url +api_phobias_url +"/" + this.user +"/" + phobia + "/" + model;

        let res = await axios.get(urlAux);
        var niveis = res.data.map(a => a.toString());
        niveis = niveis.join("-");

        var url_session =
          backend_url +
          sessions_user_param +"/" +this.user +"/" +phobia +"/" +model +"/" +niveis + "/niveis";
      } else {
        var url_session =
          backend_url +sessions_user_param +"/" +this.user +"/" +phobia +"/" +model +"/" +level +"/" +marker;
      }
      window.open(url_session);
    },

    patientOrDateChangedReload(editSession) {
      if (
        editSession.patient != this.patient_oldname ||
        editSession.session_date != this.session_olddate
      )
        this.$router.go(0);
    },

    // TODO arranjar uma maneira melhor depois
    downloadMarker(marker) {
      var url =
        backend_url +
        api_markers_url +
        "/" +
        this.user +
        "/" +
        marker +
        "/download";
      window.open(url);
    },

    cleanCreateSessionInfo(patient, phobia) {
      this.createSession.complete_session_date = new Date().toISOString();
      this.createSession.session_date = this.createSession.complete_session_date.substr(
        0,
        10
      );
      this.createSession.patient = patient;
      this.createSession.notes = "";
      this.createSession.phobia = phobia;
      this.createSession.model = "";
      this.createSession.level = "";
      this.createSession.marker = "";
    },

    getQRCodeLevel: async function(phobia, model, level, marker) {
      if (marker == "niveis") {
        var urlAux =
          backend_url +
          api_phobias_url +
          "/" +
          this.user +
          "/" +
          phobia +
          "/" +
          model;
        let res = await axios.get(urlAux);
        var niveis = res.data.map(a => a.toString());
        this.qrCodeLevel = niveis.join("-");
      } else this.qrCodeLevel = level;
    }
  }
};
</script>