import Vue from 'vue';
import PhotoAlbumContract from '../../build/contracts/PhotoAlbum.json';

export default class PhotoAlbum {
  constructor(address) {
    this.address = address;
    this.instance = new Vue.web3.eth.Contract(PhotoAlbumContract.abi, address);
  }

  addPhoto(name, picture) {
    return new Promise((resolve, reject) => {
      this.getPhotoAlbumSize()
        .then((size) => this.send(this.instance.methods.addPhoto(size, name, picture)))
        .then(resolve)
        .catch(reject);
    });
  }

  getPhotos() {
    return new Promise((resolve, reject) => {
      this.getPhotoAlbumSize()
        .then((photosLength) => Array.from(Array(photosLength).keys()))
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

  getPhotoAlbumSize() {
    return new Promise((resolve, reject) => {
      this.instance.methods.photosLength()
        .call()
        .then((photosLength) => Number(photosLength))
        .then(resolve)
        .catch(reject);
    });
  }

  send(signature) {
    return new Promise((resolve, reject) => {
      let from;
      Vue.web3.eth.getAccounts()
        .then(accounts => {
          from = accounts[0];
          return signature.estimateGas({from});
        })
        .then(gas => signature.send({from, gas}))
        .then(resolve)
        .catch(reject);
    });
  }
}
