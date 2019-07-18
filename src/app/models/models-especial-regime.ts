interface ModelsEspecialRegime {
  entity: number;
  name: string;
  topics: Topic[];
}

interface Topic {
  name: string;
  models: Model[];
}

interface Model {
  name: string;
  url: string;
  objects: Object[];
}

interface Object {
  name: string;
  url: string;
}