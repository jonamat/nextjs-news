export enum REQ_STATUS {
  LOADING,
  ERROR,
  SUCCESS,
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Country {
  alpha2Code: string;
  alpha3Code: string;
  name: string;
  capital: string;
  subregion: string;
  region: string;
  population: number;
  currencies: Array<Currency>;
  languages: Array<Language>;
}