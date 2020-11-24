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
import { app } from '../base';

export default {
  name: 'App',
  data() {
    return {
      db: app.firestore(),
      fileUrl: null,
      petName: null,
      pets: [],
    };
  },
  methods: {
    async onFileChange(file) {
      if(!file) return;
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      this.fileUrl = await fileRef.getDownloadURL();
    },
    async uploadFile() {
      await this.db.collection('pets').doc(this.petName).set({
        name: this.petName,
        picture: this.fileUrl,
      });
      await this.getPets();
      this.$refs.form.reset();
    },
    async getPets() {
      const petsCollection = await this.db.collection('pets').get();
      this.pets = petsCollection.docs.map(doc => doc.data());
    },
  },
  created() {
    this.getPets();
  }
}
</script>
