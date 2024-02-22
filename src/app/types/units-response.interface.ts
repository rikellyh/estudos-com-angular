export interface Country {
  name: Name;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: Currencies;
  languages: Languages;
  borders: string[];
  flags: Flags;
}

interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

interface NativeName {
  official: string;
  common: string;
}

interface Currencies {
  [currencyCode: string]: Currency;
}

interface Currency {
  name: string;
  symbol: string;
}

interface Languages {
  [language: string]: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
