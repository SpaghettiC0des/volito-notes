export interface Prefecture {
  id: number;
  name: Name;
  lines: Line[];
}

export interface Name {
  ja: string;
  en: string;
}

export interface Line {
  id: number;
  name: Name2;
  lat: number;
  lng: number;
  zoom: number;
  stations: Station[];
}

export interface Name2 {
  ja: string;
  en: string;
}

export interface Station {
  id: number;
  gid: number;
  name: Name3;
  location: Location;
  lines: Line2[];
}

export interface Name3 {
  ja: string;
  en: string;
}

export interface Location {
  lat: number;
  lng: number;
  countryCode: CountryCode;
  postalCode: PostalCode;
  administrativeArea1: AdministrativeArea1;
  ward: Ward;
  locality1: Locality1;
  sublocality1: Sublocality1;
  sublocality2: Sublocality2;
  sublocality3: Sublocality3;
  sublocality4: Sublocality4;
}

export interface CountryCode {
  en: string;
  ja: string;
}

export interface PostalCode {
  en?: string;
  ja?: string;
}

export interface AdministrativeArea1 {
  en: string;
  ja: string;
}

export interface Ward {
  en?: string;
  ja?: string;
}

export interface Locality1 {
  en?: string;
  ja?: string;
}

export interface Sublocality1 {
  en?: string;
  ja?: string;
}

export interface Sublocality2 {
  en?: string;
  ja?: string;
}

export interface Sublocality3 {
  en?: string;
  ja?: string;
}

export interface Sublocality4 {
  en?: string;
  ja?: string;
}

export interface Line2 {
  id: number;
  name: Name4;
}

export interface Name4 {
  ja: string;
  en: string;
}
