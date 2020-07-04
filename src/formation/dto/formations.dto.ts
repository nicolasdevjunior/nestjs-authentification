import { ObjectId } from 'bson';

export class FormationsCategoryDto{
    categoryName: string;
    tagName: string;
    description: string;
}

export class FormationsDto{
    idCategory: ObjectId;
    tagName: string;
    formationName: string;
    description: string;
    image: string;
}

export class FormationSectionsDto{
    idCategory: ObjectId;
    idFormation: ObjectId;
    sectionName: string;
}

export class FormationCoursDto{
    idFormation: ObjectId;
    title: string;
}

export class FormationContentDto{
    idCategory : ObjectId;
    idFormation: ObjectId;
    idSection : ObjectId;
    contentType: string;
    content: string;
}