
<template>
  <v-app-bar flat app>
    <v-tabs background-color="grey darken-4">
      <!-- <v-tab class="white--text" link to="/"> <h3 class="text-capitalize">Home</h3></v-tab> -->
      <v-tab class="white--text" link to="/"><h3 class="text-capitalize">Home</h3></v-tab>
      <v-tab class="white--text" link to="/criarsessao"><h3 class="text-capitalize">Criar Sessão</h3></v-tab>
      <v-tab class="white--text" link to="/sessoes"><h3 class="text-capitalize">Sessões</h3></v-tab>
      <v-tab class="white--text" link to="/modelos"><h3 class="text-capitalize">Modelos</h3></v-tab>
      <v-tab class="white--text" link to="/feedback"><h3 class="text-capitalize">Feedback</h3></v-tab>
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