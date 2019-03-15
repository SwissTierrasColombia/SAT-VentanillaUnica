export interface RootObject {
  id: number;
  attributes: Attributes8;
}

export interface Attributes8 {
  'Área de terreno': number;
  extdireccion: Extdireccion[];
  predio: Predio[];
}

export interface Predio {
  id: number;
  attributes: Attributes7;
}

export interface Attributes7 {
  Departamento: string;
  Municipio: string;
  Zona: string;
  NUPRE: string;
  FMI: string;
  'Número predial': string;
  'Número predial anterior': string;
  Tipo: string;
  'Destinación económica': string;
  construccion: Construccion[];
}

export interface Construccion {
  id: number;
  attributes: Attributes6;
}

export interface Attributes6 {
  'Área construcción': number;
  extdireccion: (Extdireccion2 | Extdireccion22)[];
  unidadconstruccion: Unidadconstruccion[];
}

export interface Unidadconstruccion {
  id: number;
  attributes: Attributes5;
}

export interface Attributes5 {
  'Número de pisos': number;
  'Área construida': number;
  'Número de habitaciones'?: any;
  'Número de baños'?: any;
  'Número de locales'?: any;
  Uso?: any;
  'Puntuación'?: any;
  extdireccion: (Extdireccion3 | Extdireccion22)[];
}

export interface Extdireccion3 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  'País': string;
  Departamento?: string;
  Ciudad: string;
  'Código postal': string;
  'Apartado correo': string;
  'Nombre calle': string;
}

export interface Extdireccion22 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  'País': string;
  Departamento: string;
  Ciudad: string;
  'Código postal': string;
  'Apartado correo': string;
  'Nombre calle': string;
}

export interface Extdireccion2 {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  'País': string;
  Departamento?: any;
  Ciudad: string;
  'Código postal': string;
  'Apartado correo': string;
  'Nombre calle': string;
}

export interface Extdireccion {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  'País': string;
  Departamento: string;
  Ciudad: string;
  'Código postal': string;
  'Apartado correo'?: string;
  'Nombre calle': string;
}