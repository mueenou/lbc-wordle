<template>
  <div class="rounded mx-auto mt-5 mb-20">
    <div
      class="line grid grid-cols-5 justify-center items-center mx-auto w-full gap-y-2 max-w-[400px]"
    >
      <div
        v-for="cell in grid"
        :class="{
          'bg-green-500': cell.status === 'correct',
          'bg-yellow-500': cell.status === 'present',
          'bg-red-500': cell.status === 'absent',
        }"
        class="letter w-[70px] h-[70px] grid place-content-center text-center text-6xl font-bold uppercase border dark:border-gray-700 border-gray-300"
      >
        {{ cell.letter }}
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["wordFound", "wordNotFound"]);
const props = defineProps(["word"]);
const gameEnded = ref(false); // Track the game state
const word = props.word;
const currentGuess = ref("");
const currentRow = ref(0);
const rows = 6; // Number of attempts
const cols = 5; // Length of the word

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const grid = ref(Array.from({ length: rows * cols }, () => ({ letter: "", status: "" })));
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

function handleKeydown(e) {
  if (e.key === "Backspace") {
    if (currentGuess.value.length > 0) {
      currentGuess.value = currentGuess.value.slice(0, -1);
      updateGrid();
    }
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    if (currentGuess.value.length < cols) {
      currentGuess.value += e.key.toLowerCase();
      updateGrid();

      if (currentGuess.value.length === cols) {
        checkGuess();
        currentGuess.value = "";
        currentRow.value++;
      }
    }
  }
}

function updateGrid() {
  const start = currentRow.value * cols;
  for (let i = 0; i < cols; i++) {
    grid.value[start + i].letter = currentGuess.value[i] || "";
  }
}

function checkGuess() {
  const start = currentRow.value * cols;
  const guessedWord = currentGuess.value.split("").map((letter, index) => ({
    letter,
    isCorrect: word[index] === letter,
    isThere: word.includes(letter) && word[index] !== letter,
  }));

  let isWordFound = true;
  guessedWord.forEach((guess, index) => {
    const cell = grid.value[start + index];
    if (guess.isCorrect) {
      cell.status = "correct";
    } else if (guess.isThere) {
      cell.status = "present";
      isWordFound = false;
    } else {
      cell.status = "absent";
      isWordFound = false;
    }
  });

  if (isWordFound) {
    endGame();
    emit("wordFound", { word, attempts: currentRow.value + 1 });
  } else {
    if (currentRow.value === 5 && !isWordFound) {
      setTimeout(() => {
        endGame();
        emit("wordNotFound", { word, attempts: currentRow.value + 1 });
      }, 100); // Delay the alert to ensure the grid updates
    }
  }

  currentGuess.value = "";
}

const endGame = () => {
  gameEnded.value = true; // Set the game state to ended
  window.removeEventListener("keydown", handleKeydown);
};
</script>
