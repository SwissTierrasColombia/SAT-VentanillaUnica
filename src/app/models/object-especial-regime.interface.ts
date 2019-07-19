export interface ObjectEspecialRegime {
    objSpecialRegime: ObjSpecialRegime;
    categories: CategoryRestriction[];
}

export interface CategoryRestriction {
    category: Category;
    restrictions: Restriction[];
}

export interface Restriction {
    id: number;
    restriction: Organization;
}

export interface Category {
    id: number;
    field: string;
    value: string;
    urlMasInfo: string;
    description: string;
}

export interface ObjSpecialRegime {
    id: number;
    organization: Organization;
    model: string;
    object: string;
    wsurl: string;
    createAt: string;
    dueDate: string;
}

export interface Organization {
    id: number;
    name: string;
}