<template>
  <v-container style="width: 95%">
    <v-row dense justify="center">
      <v-col cols="12" sm="9">
        <h3> Sumissão de Feedback: </h3>
        <p class="mb-1"> Está página foi criada com o intuito de haver um forma fácil e rápida
          de submeter feedback que tenha relativamente à plataforma.
        </p>
      </v-col>
      <v-col cols="12"  sm="9">
        <v-textarea outlined auto-grow hide-details
          v-model="ideas"
          rows="6"
          row-height="16"
          label="Feedback"
          placeholder="Ideias, sugestões, etc"
      ></v-textarea>
      </v-col>
      <v-col cols="12" class="pt-3"  sm="9">
        <v-textarea outlined auto-grow hide-details
          v-model="bugs"
          rows="6"
          row-height="16"
          label="Bugs"
          placeholder="Bugs encontrados"
        ></v-textarea>
      </v-col>
      <v-col cols="12"  sm="9" class="mt-4">
        <v-slider hide-details
          v-model="rating"
          label="Experiência Geral"
          min="0"
          max="10"
          thumb-label="always"
          :thumb-size="20"
        >
      </v-slider>
      </v-col>
      <v-col cols="12"  sm="9">
        <v-btn block color="primary"
          @click="feedback(ideas,bugs,rating);cleanFeedback()"
          :loading="loading.feedbackSubmit"
        >
          Submeter Feedback
        </v-btn>
        <v-alert text dismissible type="success" v-model="alert.feedbackSubmitSuccess">
          Submit Successful!!!
        </v-alert>
        <v-alert text dismissible type="error" v-model="alert.feedbackSubmitFail">
          Submit Failed...
        </v-alert>
      </v-col>
      <!-- <v-col cols="12"  sm="9">
        <h3> Formulário: </h3>
        <p class="mb-1">
          De forma a contribuir com um feedback mais completo, por favor, preencha o seguinte formulário.
        </p>
      </v-col>
      <v-col cols="12"  sm="9">
        <v-btn block color="primary"
          @click="gotoForm()"
        >
          Prencher Formulário
        </v-btn>
      </v-col> -->
      <v-col cols="12"  sm="9">
        <h3> Contacto: </h3>
        <p>
          Para qualquer outro tipo de contacto envie um email para <b>raulvilasboas97@gmail.com</b>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vuex from 'vuex'
import axios from 'axios'
const backend_url = process.env.VUE_APP_BACKEND_HOST
const qs = require('querystring')

export default {
  data: () => ({
    rating:5,
    ideas:"",
    bugs:"",
    loading: {
      feedbackSubmit: false
    },
    alert: {
      feedbackSubmitSuccess: false,
      feedbackSubmitFail: false
    }
  }),
  methods: {
    gotoForm: function () {
      window.open('https://forms.gle/TSBt15HtCYK5b6FV9')
    },
    cleanFeedback(){
      this.rating=5
      this.ideas=""
      this.bugs=""
    },
    feedback(ideas,bugs,rating){
      this.loading.feedbackSubmit = true
      var form = {}
      form.rating = rating
      form.ideas = ideas
      form.bugs = bugs

      axios.post(backend_url + '/api/feedback', qs.stringify(form),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
        .then(response => {
          this.alert.feedbackSubmitSuccess = true
          this.alert.feedbackSubmitFail = false
        })
        .catch(alert => {
          console.log(alert.response.data)
          this.alert.feedbackSubmitSuccess = false
          this.alert.feedbackSubmitFail = true
        })
        .finally(() => {
          this.loading.feedbackSubmit = false
        })
    },
  }
}
</script>