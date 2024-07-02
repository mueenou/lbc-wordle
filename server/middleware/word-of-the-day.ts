import { randomElement } from "../utils/randomElement";

const banglishWords: string[] = [
  "Bhabi",
  "Bhaia",
  "Chole",
  "Hawae",
  "Ghora",
  "Kotha",
  "Shukh",
  "Dukkh",
  "Bhoyy",
  "Anond",
  "Jibon",
  "Bhalo",
  "Bondh",
  "Shuru",
  "Niyom",
  "Maner",
  "Rakhi",
  "Ghumy",
  "Bhore",
  "Tumi",
  "Ekdin",
  "Porer",
  "Ghore",
  "Shure",
  "Kotoo",
  "Ekhan",
  "Niche",
  "Dekho",
  "Chara",
  "Ranna",
  "Panta",
  "Bhola",
  "Durey",
  "Proti",
  "Tomar",
  "Rasta",
  "Pahar",
  "Ratri",
  "Diwal",
  "Golpo",
  "Chora",
  "Misti",
  "Bhuri",
  "Tiyar",
  "Pithe",
  "Chobi",
  "Amage",
  "Bhebe",
  "Khawa",
  "Bokul",
  "Chara",
  "Gorom",
  "Bikel",
  "Pothe",
  "Bhuta",
  "Gache",
  "Paith",
  "Nacha",
  "Bhuiy",
  "Pakha",
  "Mukhe",
  "Bhala",
];

const filteredWords = banglishWords.filter((word) => word.length === 5);

interface WordOfTheDay {
  word: string;
  date: string;
}

let wordOfTheDay: WordOfTheDay = {
  word: randomElement(filteredWords),
  date: new Date().toDateString(),
};

export default defineEventHandler((event) => {
  const today = new Date().toDateString();
  if (wordOfTheDay.date !== today) {
    wordOfTheDay.word = randomElement(banglishWords);
    wordOfTheDay.date = today;
  }
  (event.context as { wordOfTheDay: string }).wordOfTheDay = wordOfTheDay.word;
});
