// 10+ pajama color variants with CSS hue-rotate filters
export interface PajamaColor {
  id: number;
  name: string;
  nameUk: string;
  hex: string;
  filter: string;
  bgColor: string;
}

export const PAJAMA_COLORS: PajamaColor[] = [
  {
    id: 1,
    name: "Sky Blue",
    nameUk: "Небесний",
    hex: "#87CEEB",
    filter: "hue-rotate(0deg) saturate(1)",
    bgColor: "#E0F4FD",
  },
  {
    id: 2,
    name: "Pink",
    nameUk: "Рожевий",
    hex: "#FFB6C1",
    filter: "hue-rotate(140deg) saturate(1.1)",
    bgColor: "#FFF0F3",
  },
  {
    id: 3,
    name: "Mint",
    nameUk: "М'ятний",
    hex: "#98FF98",
    filter: "hue-rotate(210deg) saturate(1.2)",
    bgColor: "#EDFFF0",
  },
  {
    id: 4,
    name: "Lavender",
    nameUk: "Лавандовий",
    hex: "#E6E6FA",
    filter: "hue-rotate(260deg) saturate(0.7)",
    bgColor: "#F5F0FF",
  },
  {
    id: 5,
    name: "Peach",
    nameUk: "Персиковий",
    hex: "#FFCBA4",
    filter: "hue-rotate(30deg) saturate(1.1)",
    bgColor: "#FFF5EE",
  },
  {
    id: 6,
    name: "Lemon",
    nameUk: "Лимонний",
    hex: "#FFFACD",
    filter: "hue-rotate(55deg) saturate(0.9)",
    bgColor: "#FFFDE7",
  },
  {
    id: 7,
    name: "Coral",
    nameUk: "Коралевий",
    hex: "#FF7F7F",
    filter: "hue-rotate(355deg) saturate(1.5)",
    bgColor: "#FFF0EE",
  },
  {
    id: 8,
    name: "Blue",
    nameUk: "Синій",
    hex: "#6495ED",
    filter: "hue-rotate(220deg) saturate(1.3)",
    bgColor: "#EEF4FF",
  },
  {
    id: 9,
    name: "Lilac",
    nameUk: "Ліловий",
    hex: "#C8A2C8",
    filter: "hue-rotate(280deg) saturate(0.9)",
    bgColor: "#FAF0FF",
  },
  {
    id: 10,
    name: "Emerald",
    nameUk: "Смарагдовий",
    hex: "#50C878",
    filter: "hue-rotate(150deg) saturate(1.4)",
    bgColor: "#EDFFF5",
  },
  {
    id: 11,
    name: "Lilac Pink",
    nameUk: "Рожево-ліловий",
    hex: "#FFB3DE",
    filter: "hue-rotate(170deg) saturate(1.2)",
    bgColor: "#FFF0FA",
  },
  {
    id: 12,
    name: "Turquoise",
    nameUk: "Бірюзовий",
    hex: "#40E0D0",
    filter: "hue-rotate(185deg) saturate(1.3)",
    bgColor: "#E8FFFD",
  },
];
