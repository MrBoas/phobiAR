
<template>
  <v-app-bar app color="grey darken-4">
    <v-col cols="1"></v-col>
      <v-btn @click="goToHome()"><h2>Home</h2></v-btn>

    <v-col cols="10">
      <v-btn @click="goToCreateSession()"><h2>Criar Sessão</h2></v-btn>
    </v-col>
  </v-app-bar>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods: {
      goToHome: function (table) {
        this.$router.push('/')
      },
      goToCreateSession: function (table) {
        this.$router.push('/criarsessao')
      }
    }
  }
</script>