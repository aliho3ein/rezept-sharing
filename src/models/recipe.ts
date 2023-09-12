export type SortType = "Neueste" | "Zeit" | "Meist Gesehene";
export type CategoryType =
  | "Asiatisch"
  | "Italienisch"
  | "Orientalisch"
  | "Burger"
  | "Meeresfrüchte"
  | "Griechisch"
  | "Spanisch"
  | "Vegan"
  | "Sushi"
  | "BBQ/Grill"
  | "Snacks"
  | "Sonstiges";

export interface recipeType {
  userID: string;
  title: string;
  material: string[];
  desc: string;
  image: string[];
  category: CategoryType[];
  time: number;
 
}

export interface completeRecipe extends recipeType {
  _id: string;
  createAt:Date
  view: number;
  like: number[];
  rating:number;
}

//für Jan Folz
export interface cardRecipe {
  image: string[]; //you take only the image into 0 position
  title: string; //recipe's name
  like: number[];
  time: number;
}

