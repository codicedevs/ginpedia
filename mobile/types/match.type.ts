import { User } from "./user.type";

interface Match {
  _id: string;
  name: string;
  date: string;
  location: string;
  playersLimit: number;
  userId: string;
  users: User[];
}
export default Match;
