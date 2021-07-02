function getPhotos(images) {
  images.map((image) => {
    console.log(image);
  });
}
fetch("https://api.pexels.com/v1/search?query=people", {
  headers: {
    Authorization: "YOUR_API_KEY",
  },
})
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    getPhotos(data.photos);
  });
