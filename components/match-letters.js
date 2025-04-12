export function initMatchLetters() {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const draggablesContainer = document.getElementById("draggables");
  const dropzonesContainer = document.getElementById("dropzones");
  const scoreDisplay = document.getElementById("score");
  const moreBtn = document.getElementById("moreBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Ambil skor dari localStorage (kalau ada)
  let score = parseInt(localStorage.getItem("matchLettersScore")) || 0;
  scoreDisplay.textContent = score;

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  function generateLetters() {
    draggablesContainer.innerHTML = "";
    dropzonesContainer.innerHTML = "";

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

          // Simpan skor ke localStorage
          localStorage.setItem("matchLettersScore", score);
          if (score % 10 === 0) {
            playYaySound();
            launchConfetti();
            showEmojiEffect();
          }
        } else {
          zone.classList.add("incorrect");
          setTimeout(() => zone.classList.remove("incorrect"), 500);
        }
      });
    });
  }

  generateLetters();

  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      generateLetters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      score = 0;
      localStorage.setItem("matchLettersScore", score); // Reset juga di localStorage
      scoreDisplay.textContent = score;
      generateLetters();
    });
  }

  function launchConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff0", "#0f0", "#0ff", "#f0f", "#f00", "#00f"];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = `${2 + Math.random()}s`;
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  }

  function playYaySound() {
    const audio = document.getElementById("yaySound");
    audio.currentTime = 0;
    audio.play();
  }

  function showEmojiEffect() {
    const emojis = ["🎉", "👏", "🎊", "✨", "🔥"];
    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.getElementById("emoji-container").appendChild(emoji);
    setTimeout(() => emoji.remove(), 2000);
  }
}
