export type categoriesType = "seeFood" | "asian" | "oriental" | number;

export interface recipeType {
  userID: string;
  title: string;
  material: string[];
  desc: string;
  image: string[];
  category: categoriesType[];
  time: number;
}

export interface completeRecipe extends recipeType {
  id: string;
  userId: string;
  date: Date;
  like: number;
  view: number;
}

//für Jan Folz
export interface cardRecipe {
  img: string[];//you take only the image into 0 position 
  title: string; //recipe's name
  rewiews: number;
  time: number;
}
