
const apiKey = '39AtC2Q62cDLnsdkBGxeBuFuPE3mi5U7';

document.getElementById('searchButton').addEventListener('click', function() {

  const searchTerm = document.getElementById('searchInput').value;

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`)
    .then(response => response.json())
    .then(data => {
      const gifContainer = document.getElementById('gifContainer');
      gifContainer.innerHTML = '';
      data.data.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        gifContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.error('Error fetching GIFs:', error);
    });
});
