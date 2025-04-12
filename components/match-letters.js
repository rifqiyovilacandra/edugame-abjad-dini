export function initMatchLetters() {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const draggablesContainer = document.getElementById("draggables");
  const dropzonesContainer = document.getElementById("dropzones");
  const scoreDisplay = document.getElementById("score");
  const moreBtn = document.getElementById("moreBtn");
  const resetBtn = document.getElementById("resetBtn");

  let score = 0;

  draggablesContainer.innerHTML = "";
  dropzonesContainer.innerHTML = "";

  // Pilih 5 huruf acak dari seluruh alfabet
  const shuffled = shuffle([...upperCaseLetters]).slice(0, 5);

  shuffled.forEach((letter) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = letter;
    div.setAttribute("draggable", true);
    div.dataset.letter = letter;
    draggablesContainer.appendChild(div);
  });

  shuffle(shuffled).forEach((letter) => {
    const div = document.createElement("div");
    div.className = "dropzone";
    div.dataset.letter = letter;
    div.textContent = letter.toLowerCase();
    dropzonesContainer.appendChild(div);
  });

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  let dragged;

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("dragstart", () => {
      dragged = card;
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      dragged = null;
      card.classList.remove("dragging");
    });
  });

  document.querySelectorAll(".dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("highlight");
    });
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("highlight");
    });
    zone.addEventListener("drop", () => {
      zone.classList.remove("highlight");
      if (zone.dataset.letter === dragged.dataset.letter) {
        zone.classList.add("correct");
        zone.textContent = dragged.textContent;
        dragged.remove();
        score++;
        scoreDisplay.textContent = score;
      } else {
        zone.classList.add("incorrect");
        setTimeout(() => zone.classList.remove("incorrect"), 500);
        scoreDisplay.textContent = score;
      }
    });
  });

  moreBtn.addEventListener("click", initMatchLetters);
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("skorAbjad");
    window.location.hash = "#match-letters"; // reload view
  });
}
