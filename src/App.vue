<template>
  <v-app>
    <v-app>
      <v-app-bar app color="primary" dark>
        <h1>Mis mascotas</h1>
      </v-app-bar>
      <v-main>
        <v-card flat width="70%" class="container">
          <v-form ref="form" class="container">
            <v-row class="mx-0">
              <v-file-input label="Foto" @change="onFileChange" outlined dense clearable/>
              <v-text-field class="mx-3" label="Nombre" v-model="petName" required dense outlined/>
              <v-btn color="secondary" @click="uploadFile">Subir</v-btn>
            </v-row>
          </v-form>
        </v-card>
        <v-divider></v-divider>
        <v-card flat>
          <v-row class="mx-0">
            <v-col v-for="(pet, idx) in pets" :key="`pet_${idx}`" cols="4">
              <v-row class="mx-0 d-flex justify-center">
                <h2 class="text-center">{{ pet.name }}</h2>
              </v-row>
              <v-row class="mx-0 d-flex justify-center">
                <v-img :src="pet.picture" height="150" contain/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-main>
    </v-app>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      file: null,
      petName: null,
      pets: [
        {
          "picture":"https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/pets%2Fakita-americano.jpg?alt=media&token=438cc5ff-8e19-40ec-83e2-b3b7007c1f14",
          "name":"Akita americano"
        },
        {
          "name":"Husky siberiano",
          "picture":"https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/pets%2Fhusky-siberiano.jpg?alt=media&token=7f9cc2f0-48c8-4372-bb99-3c8dccc818a2"
        },
        {
          "name":"Labrador",
          "picture":"https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/pets%2Flabrador-cachorro.jpg?alt=media&token=c9ad2d35-5739-4aa2-92de-50088273557e"
        },
        {
          "picture":"https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/pets%2Fpastor-aleman.jpg?alt=media&token=ed36d2dc-da15-455d-bef7-ddc8dc461a41",
          "name":"Pastor aleman"
        },
        {
          "picture":"https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/pets%2Fpug.jpg?alt=media&token=8b73db0a-98e8-431c-ac49-82e4b40ff113",
          "name":"Pug"
        },
        {
          "picture":"https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/pets%2Fsan-bernardo.jpg?alt=media&token=3ac3d4c1-2203-4d6f-a5ce-0ea415246f78",
          "name":"San bernardo"
        }
      ]
    };
  },
  methods: {
    onFileChange(file) {
      if(!file) return;
      this.file = file;
      console.log(`File ${file.name} loaded!`);
    },
    uploadFile() {
      console.log(`Ready to upload file ${this.file.name} with name ${this.petName}!`);
      this.$refs.form.reset();
    },
  },
};
</script>
