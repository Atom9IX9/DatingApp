import { TGender } from "./types";

export class User implements TCreateUserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: TGender;
  location: string | null;
  seekingParams: TUserSeekingParams | null;
  photos: string[] // array of urls

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: TGender,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.location = null;
    this.seekingParams = null;
    this.photos = [];
  }

  public getUsername() {
    return `${this.firstName} ${this.lastName}`
  }
}

export type TUserSeekingParams = {
  gender: TGender,
  age: {
    min: number;
    max: number;
  }
}

export type TCreateUserData = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: TGender;
}
