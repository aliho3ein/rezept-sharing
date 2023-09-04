export interface comment {
    _id?: string;
    userID: string;
    recipeID?: string;
    title?: string;
    desc?: string;
    date?:Date;
    like?:number[];
  }