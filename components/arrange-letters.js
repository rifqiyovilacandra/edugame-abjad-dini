export function initArrangeLetters() {
  let correctWord = "";
  const maxLength = 15;

  const inputField = document.getElementById("word-input");
  const addBtn = document.getElementById("add-word-btn");
  const scrambledContainer = document.getElementById("scrambled-word");
  const feedback = document.getElementById("feedback");
  const wordInput = document.getElementById("word-letter");

  function shuffleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5);
  }

  function renderWordArea(word) {
    wordInput.textContent = word;
    const shuffled = shuffleWord(word);
    scrambledContainer.innerHTML = "";
    feedback.textContent = "";
    wordInput.textContent = word;

    shuffled.forEach((letter, i) => {
      const letterDiv = document.createElement("div");
      letterDiv.textContent = letter;
      letterDiv.classList.add("letter");
      letterDiv.draggable = true;
      letterDiv.dataset.index = i;

      // Drag events
      letterDiv.addEventListener("dragstart", dragStart);
      letterDiv.addEventListener("dragover", dragOver);
      letterDiv.addEventListener("drop", drop);
      scrambledContainer.appendChild(letterDiv);
    });
  }

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.index);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    const fromIndex = e.dataTransfer.getData("text/plain");
    const toIndex = e.target.dataset.index;

    const children = Array.from(scrambledContainer.children);
    scrambledContainer.insertBefore(
      children[fromIndex],
      fromIndex < toIndex ? children[toIndex].nextSibling : children[toIndex]
    );

    // Update dataset.index agar drag & drop tetap bekerja
    Array.from(scrambledContainer.children).forEach((child, index) => {
      child.dataset.index = index;
    });
  }

  function checkAnswer() {
    const attempt = Array.from(scrambledContainer.children)
      .map((el) => el.textContent)
      .join("")
      .toLowerCase();

    if (attempt === correctWord) {
      feedback.textContent = "✅ Jawaban Benar!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = "❌ Masih salah, coba lagi!";
      feedback.style.color = "red";
    }
  }

  addBtn.addEventListener("click", () => {
    const word = inputField.value.trim().toLowerCase();
    if (!word) {
      alert("Masukkan kata terlebih dahulu.");
      return;
    }
    if (word.length > maxLength) {
      alert("Kata maksimal 15 huruf.");
      return;
    }

    correctWord = word;
    renderWordArea(correctWord);
  });

  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
}
