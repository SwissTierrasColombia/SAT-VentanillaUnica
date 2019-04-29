
/*
export interface BasicConsult {
  predio: Predio;
  terreno: Terreno;
  construccion: Construccion[];
}

export interface Construccion {
  geometria: Geometria;
}

export interface Terreno {
  area_de_terreno: number;
  direccion: Direccion[];
  geometria: Geometria;
}

export interface Geometria {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Properties {
}

export interface Direccion {
  pais: string;
  departamento: string;
  ciudad: string;
  codigo_postal: string;
  apartado_correo?: string;
  nombre_calle: string;
}

export interface Predio {
  Departamento: string;
  Municipio: string;
  zona: string;
  nupre: string;
  fmi: string;
  tipo: string;
  numero_predial: string;
  numero_predial_anterior: string;
}

*/



export interface BasicParcelInfo {
  id: number;
  attributes: Attributes5;
}

export interface Attributes5 {
  'Área de terreno [m2]': number;
  extdireccion: Extdireccion[];
  predio: Predio[];
}

export interface Predio {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  Nombre: string;
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
  attributes: Attributes3;
}

export interface Attributes3 {
  'Área construcción': number;
  extdireccion: Extdireccion[];
  unidadconstruccion: Unidadconstruccion[];
}

export interface Unidadconstruccion {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  'Número de pisos': number;
  'Área construida [m2]': number;
  'Número de habitaciones'?: number | number;
  'Número de baños'?: number | number;
  'Número de locales'?: number | number;
  Uso?: string | string;
  'Puntuación'?: number | number;
  extdireccion: (Extdireccion | Extdireccion)[];
}

export interface Extdireccion {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  'País': string;
  Departamento: string;
  Ciudad: string;
  'Código postal'?: any;
  'Apartado correo': string;
  'Nombre calle': string;
}