export interface IPlanet {
  name: string;
}
export interface ISpecies {
  name: string;
}
export interface IPerson {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: number;
  homeworld: IPlanet;
  id: string;
  mass: number;
  skinColor: string;
  species: ISpecies;
}
export interface IPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}
export interface IAllPeople {
  totalCount: number;
  pageInfo: IPageInfo;
  people: IPerson[];
}
export interface ILikedPeople {
  id: string;
  gender: string;
}
