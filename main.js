// const flowbite = require("flowbite");
// import { Modal } from "flowbite";
const body = document.body;
const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const loadingBar = document.querySelector("#unity-loading-bar");
const progressBarFull = document.querySelector("#unity-progress-bar-full");
const fullscreenButton = document.querySelector("#unity-fullscreen-button");
const warningBanner = document.querySelector("#unity-warning");
const bg = document.querySelector(".outer-bg");
const mobileContent = document.querySelector("#contentMobile");
const mobileContent1 = document.querySelector("#contentMobile-1");

function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length
      ? "block"
      : "none";
  }
  const div = document.createElement("div");
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == "error") div.style = "background: red; padding: 10px;";
  else {
    if (type == "warning") div.style = "background: yellow; padding: 10px;";
    setTimeout(function () {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}

const buildUrl = "Build";
const loaderUrl = buildUrl + "/Final Web 03.loader.js";
const config = {
  dataUrl: buildUrl + "/Final Web 03.data",
  frameworkUrl: buildUrl + "/Final Web 03.framework.js",
  codeUrl: buildUrl + "/Final Web 03.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Pixel Camera Experience",
  productVersion: "0.1",
  showBanner: unityShowBanner,
};
///iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

function updateCanvasSize() {
  if (!canvas) return;
  let desiredWidth = bg.offsetWidth * 0.3;
  let desiredHeight = bg.offsetWidth * 0.3 * 1.7;

  // Check if the calculated dimensions exceed the maximum limits
  if (desiredHeight > bg.offsetHeight * 0.6) {
    desiredWidth = bg.offsetHeight * 0.6 * 0.57;
    desiredHeight = bg.offsetHeight * 0.6;
  }

  desiredWidth = Math.max(desiredWidth, 380);
  desiredHeight = Math.max(desiredHeight, 670);

  desiredWidth = Math.min(desiredWidth, window.innerWidth * 0.8);
  desiredHeight = Math.min(desiredHeight, window.innerHeight * 0.8);

  if (desiredWidth !== canvas.style.width) {
    desiredHeight = desiredWidth / 0.57; // Adjust the height accordingly
  }
  if (desiredHeight !== canvas.style.height) {
    desiredWidth = desiredHeight * 0.57; // Adjust the width accordingly
  }

  // Set the width and height of the canvas
  canvas.style.width = `${desiredWidth}px`;
  canvas.style.height = `${desiredHeight}px`;

  if (window.innerWidth > 768) {
    const pixel = document.getElementById("pixel");
    // const cm3 = document.getElementById("cm3");
    pixel.style.display = "none";
    power.classList.remove("block")
    // cm3.style.display = none;
  } else {
    // bg.style.opacity = "0";
  }
}
window.addEventListener("resize", updateCanvasSize);
updateCanvasSize();

if (!!loadingBar) loadingBar.style.display = "block";

const imageUrls = [
  "./TemplateData/Feature-Bgs/MagicEraser.png",
  "./TemplateData/Feature-Bgs/MagicEditor.png",
  "./TemplateData/Feature-Bgs/AudioMagicEraser.png",
  "./TemplateData/Feature-Bgs/VideoBoost.png",
  "./TemplateData/Feature-Bgs/BestTake.png",
  "./TemplateData/Feature-Bgs/HighRes.png",
  "./TemplateData/BgImage.png",
  "./TemplateData/img_1.png",
  "./TemplateData/img_2.png",
  "./TemplateData/img_3.png",
  "./TemplateData/img_4.png",
];

const imageObjects = [];

function preloadImages(callback) {
  let loadedCount = 0;

  imageUrls.forEach(function (url, index) {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        callback();
      }
    };
    imageObjects.push(img);
  });
}

let expanded = false;

preloadImages(function () {
  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = function () {
    createUnityInstance(canvas, config, function (progress) {
      progressBarFull.style.width = 100 * progress + "%";
    })
      .then(function (unityInstance) {
        loadingBar.style.display = "none";
        fullscreenButton.onclick = function () {
          console.log("offset", bg.offsetWidth, bg.offsetHeight);

          if (!!canvas && expanded) {
            canvas.style.transform = "scale(1.2)";
            canvas.style.transformOrigin = "center";
            fullscreenButton.style.position = "relative"; // Add this line
            fullscreenButton.style.top = "90px";
            canvas.style.position = "relative"; // Add this line
            canvas.style.top = "70px";
            // console.log("abcd")
            expanded = false;
          } else {
            canvas.style.transform = "scale(1)";
            canvas.style.transformOrigin = "center";
            fullscreenButton.style.position = ""; // Reset position to default
            fullscreenButton.style.top = "";
            canvas.style.position = ""; // Add this line
            canvas.style.top = "";
            expanded = true;
          }
        };
      })
      .catch(function (message) {
        alert(message);
      });
  };

  document.body.appendChild(script);
});

function updateContent(content) {
  const pixel = document.getElementById("pixel");
  const power = document.querySelector(".power");
  const cm2 = document.getElementById("contentMobile-2");
  const cm3 = document.getElementById("cm3");

  console.log("content", content);
  pixel.style.display = "flex";
  contentMobile.innerHTML = content;
  power.classList.remove("block"); 
  contentMobile1.innerHTML = "How to use " + content + "?";
  cm2.innerHTML = "How to use " + content + "?";
  if (content == "Pixel AI") {
    pixel.style.display = "none";
    power.classList.add("block"); 
  }
  if (window.innerWidth < 768) {
    bg.style.background = "white !important";
    bg.style.backgroundImage = "";
    // alert("hello")
    return;
  } else {
    pixel.style.display = "none";
  }
  if (content == "Magic Eraser") {
    bg.style.backgroundImage =
      "url('./TemplateData/Feature-Bgs/MagicEraserNew.png')";
    cm3.src = "./TemplateData/Pop-up/MagicEraser.png";
  }
  if (content == "Magic Editor") {
    bg.style.backgroundImage =
      "url('./TemplateData/Feature-Bgs/MagicEditorNew.png')";
    cm3.src = "./TemplateData/Pop-up/MagicEditor.png";
  }
  if (content == "Audio Eraser") {
    bg.style.backgroundImage =
      "url('./TemplateData/Feature-Bgs/AudioMagicEraserNew.png')";
    cm3.src = "./TemplateData/Pop-up/Audio.png";
  }
  if (content == "Video Boost") {
    bg.style.backgroundImage =
      "url('./TemplateData/Feature-Bgs/VideoBoostNew.png')";
    cm3.src = "./TemplateData/Pop-up/VideoBoost.png";
  }
  if (content == "Best Take") {
    bg.style.backgroundImage =
      "url('./TemplateData/Feature-Bgs/BestTakeNew.png')";
    cm3.src = "./TemplateData/Pop-up/BestTake.png";
  }
  if (content == "Super Res Zoom") {
    bg.style.backgroundImage =
      "url('./TemplateData/Feature-Bgs/HighResNew.png')";
    cm3.src = "./TemplateData/Pop-up/HighRes.png";
  }
  if (content == "Pixel AI") {
    bg.style.backgroundImage = "url('./TemplateData/BgImage.png')";
    pixel.style.display = "none";
    power.classList.add("block"); 
}}

// options with default values

let isOpen = false;

const targetEl = document.getElementById("default-modal");
const button = document.getElementById("modal-button");
button.addEventListener("click", () => {
  myFunction();
});
const backdrop = document.getElementById("backdrop");
const cross = document.getElementById("cross");
const contentMobile1 = document.getElementById("contentMobile1");
backdrop.addEventListener("click", () => {
  console.log("modal backdrop");

  myFunction();
});
let content = "";
function myFunction() {
  if (isOpen) {
    console.log("modal first");
    targetEl.classList.add("hidden");
    backdrop.classList.add("hidden");
    cross.classList.remove("rotate-180");

    isOpen = false;
    contentMobile1.innerHTML = content;
  } else {
    console.log("modal false", button.innerHTML);
    content = contentMobile1.innerHTML;
    contentMobile1.innerHTML = "Hide";
    cross.classList.add("rotate-180");
    targetEl.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    isOpen = true;
  }
}
