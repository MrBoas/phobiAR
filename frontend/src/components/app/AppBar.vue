
<template>
  <v-app-bar flat app>
    <v-tabs background-color="grey darken-4">
      <v-tab class="white--text" link to="/"> <h3>Home</h3></v-tab>
      <v-tab class="white--text" link to="/criarsessao"><h3>Criar Sessão</h3></v-tab>
      <v-tab class="white--text" link to="/sessoes"><h3>Sessões</h3></v-tab>
      <!-- <v-tab class="white--text" link to="/marcadores"><h3>Marcadores</h3></v-tab> -->
    </v-tabs>
  </v-app-bar>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods: {
    }
  }
</script>