import { ObjectId } from 'bson';
import { Document } from 'mongoose';

export interface FormationsCategory extends Document {
    categoryName: String;
    tagName: String;
    description: String;
}

export interface Formations extends Document {
    idCategory: ObjectId;
    formationName: String;
    tagName: String;
    description: String;
    image: String;
}

export interface FormationCours extends Document {
    idFormation: ObjectId;
    title: String;
}

export interface FormationSections  extends Document {
    idCategory: ObjectId;
    idFormation: ObjectId;
    sectionName: String;
}

export interface FormationContents extends Document {
    idCategory : ObjectId;
    idFormation: ObjectId;
    idSection : ObjectId;
    contentType: String;
    content: String;
}