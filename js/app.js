let imageArray = [];
let filteredArray = [];
const submit = document.getElementById("submit");
const stop = document.getElementById("stop");
let searchOn = true;
let imgToRotate = 1;
let interval;

const requestUrl = "https://www.reddit.com/search.json?q=";

document.addEventListener("DOMContentLoaded", () => {
  stop.style.display = "none";
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(requestUrl + input.value)
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        for (let i = 0; i < 25; i++) {
          imageArray.push(jsonData.data.children[i].data.url);
        }
        // Checks to make sure they're not gifs
        const ext = ".jpg";
        filteredArray = imageArray.filter((link) => {
          return link.indexOf(ext) !== -1 && link.includes("redd.it");
        });
        slideShow();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  let slideShow = () => {
    document.getElementById("stop").style.display = "block";
    searchOn = true;
    input.style.display = "none";
    submit.style.display = "none";
    p.style.display = "none";
    h1.style.display = "none";
    displayImages.style.background = "";
    document.body.style.backgroundColor = "black";
    interval = setInterval(addImages, 3000);
  };

  const addImages = () => {
    if (searchOn) {
      displayImages.style.backgroundImage = `url("${filteredArray[imgToRotate]}")`;
      imgToRotate = imgToRotate + 1;
      if (imgToRotate === filteredArray.length) {
        imgToRotate = 1;
      }
    }
  };
  // Stop button functionality
  document.getElementById("stop").addEventListener("click", () => {
    document.getElementById("stop").style.display = "none";
    input.style.display = "inline";
    submit.style.display = "inline";
    p.style.display = "block";
    h1.style.display = "block";
    document.body.style.backgroundColor = "white";
    displayImages.style.background = "white";
    input.value = "";
    imageArray = [];
    filteredArray = [];
    searchOn = false;
    displayImages.style.backgroundSize = "contain";
    displayImages.style.backgroundRepeat = "no-repeat";
    displayImages.style.backgroundPosition = "center center";
    clearInterval(interval);
  });
});
