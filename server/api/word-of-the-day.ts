export default defineEventHandler((event) => {
  const context = event.context as { wordOfTheDay: string };
  return { word: context.wordOfTheDay };
});
