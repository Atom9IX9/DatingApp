import { TGender } from "./types";

export class User implements TCreateUserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: TGender;
  location: string | null;
  seekingParams: TUserSeekingParams | null;
  photos: TPhotos

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: TGender,
    photos: TPhotos
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.location = null;
    this.seekingParams = null;
    this.photos = photos;
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
  photos: TPhotos;
}

export type TPhotos = {
  avatar: string | null; // url
  all: string[]; // array of urls
} 
