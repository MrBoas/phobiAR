<template>
  <v-container style="width: 90%">
    <v-row align="center" justify="center" class="mt-8">
      <v-col cols="12" sm="5" class="mr-6">
        <h2> About phobiAR </h2>
         <p class="text-justify">
           Esta plataforma tem como objetivo providenciar uma maneira fácil e intuitiva para os psicólogos conseguirem utilizar a Realidade Aumentada
           para ajudar no tratamento de pacientes fóbicos. Para isso, é possível criar sessões para um paciente com uma determinada fobia e associar
           a essa sessão um marcador. Depois, o psicólogo pode carregar essa sessão e quando a câmara reconhecer o marcador o modelo 3D será carregado.
         </p>
        <h2> Guia de Utilização </h2>
        <p>
          1. Crie uma sessão em <i>Criar Sessão;</i> <br>
          2. Carregue na tab <i> Sessões </i> e procure pela sessão criada; <br>
          3. Faça download do marcador que escolheu caso não o tenha;<br>
          4. Carregue no botão <i> gerar sessão</i>; <br>
          5. Aponte a câmara para a imagem do marcador.
        </p>
      </v-col>
      <v-col cols="12" sm="4">
        <v-carousel  height="auto" hide-delimiters cycle>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          {
            src: require('@/assets/aranha.png'),
          },
          {
            src: require('@/assets/cobra.png'),
          },
          {
            src: require('@/assets/seringa.png'),
          }
        ],
      }
    },
  }
</script>