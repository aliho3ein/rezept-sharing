export interface userWithId {
  username?: string;
  email: string;
  password?: string;
  dateOfBirth?: Date;
  isVerified: boolean;
  info?: string[];
  image?: string[];
  wishlist?: string[];
}

export interface crewType {
  name: string;
  social: socialType[];
  position: string;
}

export interface socialType {
  icon: socialIconType;
  title: socialTitleType;
  link: string;
}

type socialIconType =
  | "fa-linkedin"
  | "fa-instagram-square"
  | "fa-github-square"
  | "fa-twitter-square"
  | "fa-facebook-square"
  | "fa-stack-overflow"
  | "fa-blogger"
  | "fa-at";

type socialTitleType =
  | "linkedin"
  | "Instagram"
  | "Github"
  | "Twitter"
  | "Facebook"
  | "StackOverflow"
  | "Blog"
  | "Email";
