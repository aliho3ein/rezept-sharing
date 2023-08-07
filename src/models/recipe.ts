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
