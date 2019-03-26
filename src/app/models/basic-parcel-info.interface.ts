
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