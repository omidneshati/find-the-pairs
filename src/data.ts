import fruit from "./assets/fruit/fruits-and-vegetable--1488.svg";
import animal from "./assets/animal/cat--2477.svg";
import alphabet from "./assets/alphabet/letter-a--16224.svg";

export const lowerNumber = 24;
export const totalSpace = 100;
export let nCards: number[] = [];
for (let i = lowerNumber; i <= totalSpace; i++) {
  if (i % 2 === 0 && i % 3 === 0 && i % 6 === 0 && i % 8 === 0 && i % 12 === 0)
    nCards.push(i);
}

export const nPairs = [2, 3, 4];
export const nKinds: { value: string; icon: { src: string } }[] = [
  { value: "fruit", icon: fruit },
  { value: "animal", icon: animal },
  { value: "alphabet", icon: alphabet },
];
