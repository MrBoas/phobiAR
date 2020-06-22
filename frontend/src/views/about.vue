<template>
  <v-container style="width: 90%">
    <v-row justify="center">
      <v-col cols="12" sm="9">
        <h2 class="pb-2"> About me </h2>
        <p class="text-justify">
          Olá, sou Raul Vilas Boas e estou atualmente a tirar o mestrado na Universidade do Minho em Engenharia Informática.
          O tema da minha tese é <i>Design an Artefact of Augmented Reality to support the Exposure Therapy of Specific Phobias</i> e incide
          sobre a utilização da Realidade Aumentada para ajudar no
          tratamento de fobias específicas.
        </p>
        <h2> Equipa </h2>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="2">
        <v-img
          class="mb-2"
          :src="require('@/assets/foto.jpg')"
        ></v-img>
        <h4 class="text-center pt-3">Raul Vilas Boas</h4>
        <p class="text-center mb-0">  Aluno de Mestrado</p>
      </v-col>
      <v-col cols="8" sm="2">
        <v-img
          class="mb-2"
          :src="require('@/assets/foto.jpg')"
        ></v-img>
        <h4 class="text-center pt-3">Pedro Rangel Henriques</h4>
        <p class="text-center mb-0">  Orientador</p>
      </v-col>
      <v-col cols="8" sm="2">
        <v-img
          class="mb-2"
          :src="require('@/assets/foto.jpg')"
        ></v-img>
        <h4 class="text-center pt-3">Lázaro Lima</h4>
        <p class="text-center mb-0">  Coorientador</p>
      </v-col>
      <v-col cols="8" sm="2">
        <v-img
          class="mb-2"
          :src="require('@/assets/foto.jpg')"
        ></v-img>
        <h4 class="text-center pt-3">Greice Zanini</h4>
        <p class="text-center mb-0">Psicóloga Colaborador</p>
      </v-col>

    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="9">
        <h2> Contacto </h2>
        <p> Email: raulvilasboas97@gmail.com</p>
        <h2> Publicações </h2>
        <p>
          Raul Vilas Boas, Lázaro Lima, Greice Zanini, and Pedro Rangel Henriques, <i> Artefact of augmented reality to support the treatment of specific phobias </i>,
          Trends and Innovations in Information Systems and Technologies (Cham) (Alvaro Rocha, Hojjat Adeli, Luís Paulo Reis, Sandra Costanzo, Irena Orovic, and
          Fernando Moreira, eds.), Springer International Publishing, 2020,
          pp. 181–187,
          DOI: <a href="https://link.springer.com/chapter/10.1007%2F978-3-030-45691-7_17">10.1007/978-3-030-45691-7_17</a>
          </p>
      </v-col>
    </v-row>
  </v-container>
</template>