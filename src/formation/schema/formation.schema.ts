import * as mongoose from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;


export const FormationCategorySchema = new mongoose.Schema({
    categoryName: { type : String, required: true },
    tagName: { type : String, required: true },
    description: { type : String, required: false }
}, { collection: 'formationsCategory' }); 

export const FormationsSchema = new mongoose.Schema({
    formationName: { type : String, required: true },
    idCategory: { type : ObjectId },
    tagName: { type : String, required: true },
    description: { type : String, required: false },
    image:{ type : String,required:false },
    createAt:{ type : Date, default:Date.now}
}, { collection: 'formations' });

export const FormationCoursSchema = new mongoose.Schema({
    title: { type : String, required: true },
    idFormation:{ type : ObjectId },
    createAt:{ type : Date, default:Date.now}
}, { collection: 'formationsCours' });


export const FormationSectionsSchema = new mongoose.Schema({
    idPartie : { type : ObjectId }, 
    sectionName: { type : String, required: true },
    createAt:{ type : Date, default:Date.now}
}, { collection: 'formationsSections' });

export const FormationContentsSchema = new mongoose.Schema({  
    idSection: { type : ObjectId },
    contentType: { type : String,enum:enumValues,trim : true,default:'Client',required: true },
    content: { type : String, required: true },
    createAt:{ type : Date, default:Date.now}
}, { collection: 'formationsContents' });

var enumValues = {
    values: ['Image' ,'String'],
    message: 'Content type requis.'
}