
import { initMatchLetters } from "./components/match-letters.js"; 

const routes = {
  "match-letters": {
    view: "/views/match-letters.html",
    init: initMatchLetters,
  },
};

function loadPage(route) {
  const page = routes[route];

  if (!page) {
    document.getElementById("main-content").innerHTML =
      "<h2>Halaman tidak ditemukan</h2>";
    return;
  }

  fetch(page.view)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;
      loadStyle(`/styles/${route}.css`);
      page.init();
    });
}

function loadStyle(href) {
  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function handleHashChange() {
  const hash = location.hash.slice(1);
  loadPage(hash);
}

window.addEventListener("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", handleHashChange);
