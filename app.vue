<template>
  <UContainer>
    <ColorScheme
      ><USelect
        class="w-24 mt-10"
        v-model="$colorMode.preference"
        :options="['system', 'light', 'dark']"
      />
    </ColorScheme>

    <div class="text-center mt-5">
      <h1 class="font-bold text-4xl">LBC WORDLE</h1>
    </div>
    <UAlert
      class="w-80 mx-auto my-10"
      v-if="wordFound"
      icon="i-heroicons-check"
      color="primary"
      variant="subtle"
      title="Bravo!"
      :description="`You have found the word of the day in ${attempts} attempts! The word was: ${secretWord}.`"
    />
    <UAlert
      class="w-80 mx-auto my-10"
      v-if="wordNotFound"
      icon="i-heroicons-x-mark"
      color="red"
      variant="subtle"
      title="Game Over!"
      :description="`You have not found the word of the day in ${attempts} attempts!.`"
    />
    <div class="words_container">
      <Wordle
        v-if="word"
        :word="word.word.toLowerCase()"
        @word-found="(payload) => showFoundModal(payload)"
        @word-not-found="(payload) => showNotFoundModal(payload)"
      />
      <Wordle v-else :word="test" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { data: word } = await useFetch("/api/word-of-the-day");
const attempts = ref(0);
const secretWord = ref("");
const wordFound = ref(false);
const wordNotFound = ref(false);
const showFoundModal = (payload) => {
  attempts.value = payload.attempts;
  secretWord.value = payload.word;
  wordFound.value = true;
};

const showNotFoundModal = (payload) => {
  attempts.value = payload.attempts;
  secretWord.value = payload.word;
  wordNotFound.value = true;
};
</script>
