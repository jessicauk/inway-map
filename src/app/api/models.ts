export interface CountryFacet {
  value: string; // ej: "FR"
  name?: string; // etiqueta si existiera
  count: number; // nº de registros
}

export interface PostalRecordFields {
  country_code: string; // "FR"
  postal_code: string; // "75001"
  place_name?: string; // "Paris"
  admin_name1?: string; // provincia/estado
  admin_code1?: string;
  admin_name2?: string;
  admin_code2?: string;
  admin_name3?: string;
  admin_code3?: string;
  latitude?: number | string;
  longitude?: number | string;
  accuracy?: number | string;
  // Algunas instancias incluyen geo_point_2d
  geo_point_2d?: { lat: number; lon: number };
}

export interface PostalRecord {
  id: string; // record id
  fields: PostalRecordFields;
}

export interface PostalQueryResult {
  total_count: number;
  results: Array<PostalRecordFields & { id?: string }>; // el API devuelve array de objetos de campos
}
