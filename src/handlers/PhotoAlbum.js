import Vue from 'vue';
import PhotoAlbumContract from '../../build/contracts/PhotoAlbum.json';

export default class PhotoAlbum {
  constructor(address) {
    this.address = address;
    this.instance = new Vue.web3.eth.Contract(PhotoAlbumContract.abi, address);
  }

  addPhoto(id, name, picture) {
    return new Promise((resolve, reject) => {
      this.send(this.instance.methods.addPhoto(id, name, picture))
        .then(resolve)
        .catch(reject);
    });
  }

  getPhotos() {
    return new Promise((resolve, reject) => {
      this.instance.methods.photosLength()
        .call()
        .then((photosLength) => Array.from(Array(Number(photosLength)).keys()))
        .then((ids) => ids.map(id => this.getPhoto(id)))
        .then((photoPromises) => Promise.all(photoPromises))
        .then(resolve)
        .catch(reject);
    });
  }

  getPhoto(id) {
    return new Promise((resolve, reject) => {
      this.instance.methods.getPhotoById(id)
        .call()
        .then(({ name, picture }) => resolve({ name, picture }))
        .catch(reject);
    });
  }

  send(signature) {
    return new Promise((resolve, reject) => {
      const [from] = Vue.web3.eth.getAccounts();
      signature.estimateGas({from})
        .then(gas => signature.send({from, gas}))
        .then(resolve)
        .catch(reject);
    });
  }
}
