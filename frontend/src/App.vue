<template>
  <v-app>
    <AppBar/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/app/AppBar'

export default {
  name: 'App',
  components: {
    AppBar,
  },
};
</script>