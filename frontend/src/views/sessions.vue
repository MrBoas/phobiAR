<template>
	<v-container>
    <v-card class="mt-10">
      <v-col cols="12"
        v-for="session in sessions_list"
        :key="session.session" >
      <v-card-title
        v-text="session.session"
      ></v-card-title>
      <v-row>
        <v-col cols="6">
          <v-card-text>
            <p> Nome paciente: {{session.patient}} </p>
            <p> Fobia: {{session.phobia}} </p>
            <p> Modelo: {{session.model}} </p>
            <p> Nível: {{session.level}} </p>
            <p> Marcador: {{session.marker}} </p>
          </v-card-text>
               <v-btn fab x-small depressed dark color="red"
                  @click="deleteSession(session.session)">
                  <v-icon>delete</v-icon>
               </v-btn>
        </v-col>
        <v-col cols="6">
          <p> Notas sessões: {{session.notes}} </p>
        </v-col>
      </v-row>
      <v-divider/>
      </v-col>
    </v-card>
	</v-container>
</template>


<script>
  // import savedSessions from '@/components/savedSessions'
  import axios from 'axios'
  const backend_url = 'http://localhost:3000/'
  const api_sessions_url = 'api/sessions'
  const sessions_user_param = 'sessions'
  const user = 'raul@gmail.com'


  export default {
    data: () => ({
      sessions_list: [],
    }),
    mounted: async function () {
      this.getSessions()
    },

    methods: {
      getSessions(){
        axios.get(backend_url + api_sessions_url + '/' + user)
          .then(response => {
            this.sessions_list = response.data
            console.log(this.sessions_list)
          })
          .catch(error => console.log(error))
      },

      deleteSession(session){
        axios.delete(backend_url+api_sessions_url + '/' + user+'/' + session)
          .then(response=>{
            console.log(response.data) // debug
            for(let i=0; i< this.sessions_list.length;i++){
              if(this.sessions_list[i].session===session){
                this.sessions_list.splice(i,1)
                return i
              }
            }
          })
          .catch(error => console.log(error))
        }
    },

}
</script>