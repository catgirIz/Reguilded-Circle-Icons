var Alr = 5000;
var stringformat = true; //Set to false to use the YYYY/MM/DD format
module.exports = {
  load() {
    setTimeout(function () {
      Alr = 0;
      if (typeof Toastify !== "undefined") {
        if (!window?._momentFormat) {
          window._momentFormat = moment.prototype.format;
        }

        moment.prototype.format = function (str) {
          if (stringformat==true) {
            str = str.replace("M/D/YYYY", "DD/MM/YYYY");
            str = str.replace("MM/DD/YYYY", "DD/MM/YYYY");
            str = str.replace("YYYY/MM/DD", "DD/MM/YYYY");
            str = str.replace("YYYY/M/D", "DD/MM/YYYY");
          } else {
            str = str.replace("M/D/YYYY", "YYYY/MM/DD");
            str = str.replace("MM/DD/YYYY", "YYYY/MM/DD");
            str = str.replace("DD/MM/YYYY", "YYYY/MM/DD");
            str = str.replace("D/M/YYYY", "YYYY/MM/DD");
          }
          return window._momentFormat.bind(this)(str);
        };

        const metadata = require(`./metadata.json`);
        metadata.then(function (result) {
          Toastify({
            text: `Loaded ${result.name} ${result.version}!`,
            duration: 3000,
            destination: "https://www.guilded.gg/i/2yenj7K2",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        });
      } else {
        Overlay(
          "Sky's Utilities Addon Is Required For This Addon To Run!",
          "https://github.com/skyallaround/levguilded/releases/download/Stuff/Sky.s.Utilities.zip"
        );
        this.unload;
        //return false;
      }
    }, Alr);
  },
  init() {},
  unload() {
    moment.prototype.format = function (str) {
      return window._momentFormat.bind(this)(str);
    };
    if (typeof Toastify !== "undefined") {
      const metadata = require(`./metadata.json`);
      metadata.then(function (result) {
        Toastify({
          text: `Unloaded ${result.name} ${result.version}!`,
          duration: 3000,
          destination: "https://www.guilded.gg/i/2yenj7K2",
          style: {
            background: "linear-gradient(to right, #ff3838, #ff9999)",
          },
        }).showToast();
      });
    }
  },
};

async function Overlay(Text, Link) {
  if (document.getElementById("Neededoverlay")) {
    document.getElementById("Neededoverlay").remove();
  }
  if (!document.getElementById("Neededoverlay")) {
    // Create the overlay element
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.id = "Neededoverlay";
    overlay.style.top = "50%";
    overlay.style.left = "50%";
    overlay.style.transform = "translate(-50%, -50%)";
    overlay.style.width = "400px";
    overlay.style.resize = "both";
    overlay.style.borderRadius = "10px";
    overlay.style.height = "300px";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";

    // Create the close button element
    const closeButton = document.createElement("button");
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "5px";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.border = "none";
    closeButton.style.color = "white";
    closeButton.style.fontSize = "20px";
    closeButton.innerHTML = "&times;";

    // Add click event listener to the close button
    closeButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    // Create the text element
    const text = document.createElement("p");
    text.style.color = "white";
    text.style.fontSize = "24px";
    text.style.textAlign = "center";
    text.style.position = "absolute";
    text.style.top = "50%";
    text.style.left = "50%";
    text.style.transform = "translate(-50%, -50%)";
    text.textContent = `${Text}`;

    if (Link !== null && Link !== "") {
      // Create the link element
      const link = document.createElement("a");
      link.style.color = "yellow";
      link.style.textAlign = "center";
      link.style.position = "absolute";
      link.style.top = "75%";
      link.style.left = "50%";
      link.style.transform = "translate(-50%, -50%)";
      link.style.textDecoration = "underline";
      link.href = `${Link}`;
      link.textContent = "Download Here";
      // Add click event listener to the link
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(link.href, "_blank");
      });

      // Append the link element to the text element
      overlay.appendChild(link);
    }
    overlay.appendChild(closeButton);
    // Append the text element to the overlay element
    overlay.appendChild(text);

    // Append the overlay element to the document body
    document.body.appendChild(overlay);
  }
}
