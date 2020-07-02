<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <v-img  :src="hiro"/>
      </v-col>
      <v-col cols="12" sm="3">
        <v-img  :src="kanji"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <v-img  :src="level1"/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-img  :src="level2"/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-img  :src="level3"/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-img  :src="level4"/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-img  :src="level5"/>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
  export default {
    data: () => ({
      hiro: require('@/assets/marcadores/hiro.png'),
      kanji: require('@/assets/marcadores/kanji.png'),
      level1: require('@/assets/marcadores/level1.png'),
      level2: require('@/assets/marcadores/level2.png'),
      level3: require('@/assets/marcadores/level3.png'),
      level4: require('@/assets/marcadores/level4.png'),
      level5: require('@/assets/marcadores/level5.png'),
    }),
  }
</script>