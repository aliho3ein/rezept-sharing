export interface comment {
    _id: string;
    userID: any;
    recipeID: string;
    title: string;
    desc?: string;
    date?:Date;
    like?:number[];
  }