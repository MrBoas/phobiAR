<template>
  <v-container>
    <v-row justify="center">
    <h2 class="mb-4"> Marcadores </h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="2">
        <v-img  :src="hiro"/>
        <v-row justify="center">
          <h4 class="mt-1"> Hiro </h4>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <v-btn fab x-small depressed dark color="blue" v-on="on"
            class="ml-2"
            @click="downloadMarker('hiro')"
          >
          <v-icon>get_app</v-icon>
          </v-btn>
          </template>
          <span>Transferir Marcador</span>
        </v-tooltip>
        </v-row>
      </v-col>
      <v-col cols="12" sm="2">
        <v-img  :src="kanji"/>
        <v-row justify="center">
          <h4 class="mt-1"> Kanji </h4>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn fab x-small depressed dark color="blue" v-on="on"
              class="ml-2"
              @click="downloadMarker('kanji')"
            >
            <v-icon>get_app</v-icon>
            </v-btn>
            </template>
            <span>Transferir Marcador</span>
          </v-tooltip>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="2">
        <v-img  :src="level1"/>
        <v-row justify="center">
          <h4 class="mt-1"> Nivel 1 </h4>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn fab x-small depressed dark color="blue" v-on="on"
              class="ml-2"
              @click="downloadMarkerNiveis('level1')"
            >
            <v-icon>get_app</v-icon>
            </v-btn>
            </template>
            <span>Transferir Marcador</span>
          </v-tooltip>
        </v-row>
      </v-col>
      <v-col cols="12" sm="2">
        <v-img  :src="level2"/>
        <v-row justify="center">
          <h4 class="mt-1"> Nivel 2 </h4>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn fab x-small depressed dark color="blue" v-on="on"
              class="ml-2"
              @click="downloadMarkerNiveis('level2')"
            >
            <v-icon>get_app</v-icon>
            </v-btn>
            </template>
            <span>Transferir Marcador</span>
          </v-tooltip>
        </v-row>

      </v-col>
      <v-col cols="12" sm="2">
        <v-img  :src="level3"/>
        <v-row justify="center">
          <h4 class="mt-1"> Nivel 3 </h4>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn fab x-small depressed dark color="blue" v-on="on"
              class="ml-2"
              @click="downloadMarkerNiveis('level3')"
            >
            <v-icon>get_app</v-icon>
            </v-btn>
            </template>
            <span>Transferir Marcador</span>
          </v-tooltip>
        </v-row>

      </v-col>
      <v-col cols="12" sm="2">
        <v-img  :src="level4"/>
        <v-row justify="center">
          <h4 class="mt-1"> Nivel 4 </h4>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn fab x-small depressed dark color="blue" v-on="on"
              class="ml-2"
              @click="downloadMarkerNiveis('level4')"
            >
            <v-icon>get_app</v-icon>
            </v-btn>
            </template>
            <span>Transferir Marcador</span>
          </v-tooltip>
        </v-row>

      </v-col>
      <v-col cols="12" sm="2">
        <v-img  :src="level5"/>
        <v-row justify="center">
          <h4 class="mt-1"> Nivel 5 </h4>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-btn fab x-small depressed dark color="blue" v-on="on"
              class="ml-2"
              @click="downloadMarkerNiveis('level5')"
            >
            <v-icon>get_app</v-icon>
            </v-btn>
            </template>
            <span>Transferir Marcador</span>
          </v-tooltip>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
  import axios from 'axios'
  const backend_url = process.env.VUE_APP_BACKEND_HOST

  export default {
    data: () => ({
      user: 'raul@gmail.com',
      hiro: require('@/assets/marcadores/hiro.png'),
      kanji: require('@/assets/marcadores/kanji.png'),
      level1: require('@/assets/marcadores/level1.png'),
      level2: require('@/assets/marcadores/level2.png'),
      level3: require('@/assets/marcadores/level3.png'),
      level4: require('@/assets/marcadores/level4.png'),
      level5: require('@/assets/marcadores/level5.png'),
      markers_list:[],
    }),

    mounted: async function () {
    },

    methods:{
      downloadMarker(marker){
        var url = backend_url +'/api/markers/' + this.user + '/' + marker + '/download'
        window.open(url);
      },
      downloadMarkerNiveis(marker){
        var url = backend_url +'/api/markers/' + this.user + '/niveis/' + marker + '/download'
        window.open(url);
      },
    }
  }

</script>