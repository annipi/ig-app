// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.7.0;

contract PhotoAlbum {
  mapping(uint => Photo) photos;

  struct Photo {
    string name;
    string picture;
  }

  uint public photosLength = 0;

  function addPhoto(uint _id, string memory _name, string memory _picture) external {
    photos[_id] = Photo({ name: _name, picture: _picture });
    photosLength++;
  }

  function deletePhotoById(uint _id) external {
    delete photos[_id];
    photosLength--;
  }

  function getNameById(uint _id) view external returns(string memory) {
    return photos[_id].name;
  }

  function getPictureById(uint _id) view external returns(string memory) {
    return photos[_id].picture;
  }

  function getPhotoById(uint _id) view external returns (string memory name, string memory picture) {
    return (photos[_id].name, photos[_id].picture);
  }

  function updateNameById(uint _id, string memory _name) external {
    Photo storage photo = photos[_id];
    photo.name = _name;
  }

  function updatePictureById(uint _id, string memory _picture) external {
    Photo storage photo = photos[_id];
    photo.picture = _picture;
  }

  function updatePictureById(uint _id, string memory _name, string memory _picture) external {
    Photo storage photo = photos[_id];
    photo.name = _name;
    photo.picture = _picture;
  }
}
