import { User } from "./user";

export class Poll {
  question: string;
  options: {option: string, count: number}[];
  votes: number ;
  createdBy: User;
  createdDate: Date;
  votedOn: boolean;
  edited: boolean;
}
