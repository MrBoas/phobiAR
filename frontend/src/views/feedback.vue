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
      <v-col cols="12"  sm="9">
        <v-slider hide-details
          v-model="rating"
          label="Experiência Geral"
          min="0"
          max="10"
          :thumb-label="true"
          :thumb-size="24"
        >
      </v-slider>
      </v-col>
      <v-col cols="12"  sm="9">
        <v-btn block color="primary"
          @click="feedback(ideas,bugs,rating)"
          :loading="loading.feedbackSubmit"
        >
          Submeter Feedback
        </v-btn>
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

export default {
  data: () => ({
    rating:5,
    ideas:"",
    bugs:"",
    loading: {
      feedbackSubmit: false
    },
  }),
  methods: {
    gotoForm: function () {
      window.open('https://forms.gle/TSBt15HtCYK5b6FV9')
    },

    // TODO  corrigir isto
    feedback(){
      this.loading.feedbackSubmit = true
    //   axios.get(this.backend_url  + this.api_phobias_url + '/' + this.user)
    //     .then(response => {
    //     })
    //     .catch(error => console.log(error))
    },
  }
}
</script>