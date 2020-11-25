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
import PhotoAlbum from '@/handlers/PhotoAlbum';

export default {
  name: 'App',
  data() {
    return {
      photoAlbum: new PhotoAlbum('0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab'),
      fileUrl: null,
      petName: null,
      pets: []
    };
  },
  methods: {
    async onFileChange(file) {
      if(!file) return;
      await this.$ipfs.add(file)
        .then((hash) => {
          this.fileUrl = `http://ipfs.infura.io/ipfs/${hash.path}`;
          console.log(`File uploaded to IPFS with hash ${hash.path}!`)
        });
    },
    uploadFile() {
      this.photoAlbum.addPhoto(this.petName, this.fileUrl)
        .then((tx) => {
          console.log(`Ready to save Photo with name ${this.petName}!`);
          console.log(tx);
          this.$refs.form.reset();
          this.getPets();
        });
    },
    getPets() {
      this.photoAlbum.getPhotos()
      .then(photos => {
        this.pets = photos
      });
    },
  },
  created() {
    this.getPets();
  },
};
</script>
