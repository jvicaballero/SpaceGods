const header = document.querySelector("header");

const headerContainer = document.createElement("div");
headerContainer.className = "header-container";

// Content box — title and home button sit on top of the background image
const headerContent = document.createElement("div");
headerContent.className = "header-content";

const headerTitle = document.createElement("h1");
headerTitle.textContent = "Space Gods Set 17 — Comps to Play";

const headersubtitle = document.createElement("p");
headersubtitle.textContent =
  "A Guide for all the Hardstuck TFT Players out there";

const headerButton = document.createElement("button");
headerButton.textContent = "All Comps";
headerButton.addEventListener("click", function handleClick() {
  window.location = "/";
});

headerContent.appendChild(headerTitle);
headerContent.appendChild(headersubtitle);
headerContent.appendChild(headerButton);
headerContainer.appendChild(headerContent);
header.appendChild(headerContainer);
