// we are using this to keep track of the api return data. which is a list of Interest objects
export interface Interest {
  avatar: string | null;
  color: string;
  existing: boolean;
  id: number;
  match: number;
  name: string;
  type: string
}