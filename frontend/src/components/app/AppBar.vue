
<template>
  <v-app-bar flat app color="grey darken-4">
    <v-col cols="1"></v-col>
      <v-btn link to="/"><h2>Home</h2></v-btn>

    <v-col cols="6" class="shrink">
      <v-btn  link to="/criarsessao"><h2>Criar Sessão</h2></v-btn>
      <v-btn  link to="/sessoes"><h2>Sessões</h2></v-btn>
    </v-col>
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