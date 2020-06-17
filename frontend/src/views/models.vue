<template>
  <v-container>
    <!-- <p> {{phobias_list_all}} </p> -->
    <h2 class="mb-4"> Lista de Fobias </h2>
    <!-- multiple para ter vários abertos no acordeao -->
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="element in phobias_list_all"
        :key="element.phobia"
      >
        <v-expansion-panel-header>{{element.phobia}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <h3> Lista de modelos </h3>
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="model in element.models"
              :key="model.model_name"
            >
              <v-expansion-panel-header>{{model.model_name}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  align="center"
                  v-for="level in model.levels"
                  :key="level"
                >
                    <v-col class="shrink wrap-text" >
                        <p class="ma-0" > Nível: {{level}}</p>
                    </v-col>
                    <v-col class="shrink">
                      <v-btn color="primary"
                        @click="preview_phobia=element.phobia;
                          preview_model=model.model_name
                          preview_level=level;"
                      >
                        Ver Modelo
                      </v-btn>
                    </v-col>
                  <v-row>
                    <v-col cols="12" sm="6" v-if="preview_phobia==element.phobia &&
                      preview_model==model.model_name &&
                      preview_level==level">
                    <model-gltf :src="backend_url+'/models/'+preview_phobia+'/'+preview_model+'/'+preview_level+'/scene.glb'"
                      >
                    </model-gltf>
                    </v-col>
                  </v-row>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>



<script>
  import axios from 'axios'
  import { ModelGltf } from 'vue-3d-model'

  export default {
    data: () => ({
      backend_url:'http://' + process.env.VUE_APP_BACKEND_HOST + ':' + process.env.VUE_APP_BACKEND_PORT,
      api_phobias_url: '/api/phobias',
      user: 'raul@gmail.com',
      phobias_list_all:[],
      preview_phobia:"",
      preview_model:"",
      preview_level:"",
      loading_model:false
    }),
    components: {
        ModelGltf
    },
    mounted: async function () {
      this.getPhobias()
    },

    methods: {
      getPhobias(){
        axios.get(this.backend_url  + this.api_phobias_url + '/' + this.user)
          .then(response => {
            this.phobias_list_all = response.data
          })
          .catch(error => console.log(error))
      },
    },


}
</script>

<style>
.wrap-text {
  /* word-break: unset;
  word-wrap: unset;
  overflow-wrap: unset; */
  white-space: nowrap;
}
</style>