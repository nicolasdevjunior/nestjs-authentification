import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { FORMATION_CATEGORY_MODEL_PROVIDER, FORMATION_MODEL_PROVIDER, FORMATION_CONTENT_MODEL_PROVIDER, FORMATION_SECTION_MODEL_PROVIDER, FORMATION_COURS_MODEL_PROVIDER } from '../constants';
import { FormationsCategory, Formations, FormationContents, FormationSections, FormationCours } from './interface/formation.interface';
import { FormationsCategoryDto } from './dto/formations.dto';
import { Category } from '../../../frontend/src/app/_interfaces/category.interface';


@Injectable()
export class FormationService {

    mongoose: any;
    constructor(
        @Inject(FORMATION_CATEGORY_MODEL_PROVIDER) private readonly formationCategoryModel: Model<FormationsCategory>,
        @Inject(FORMATION_MODEL_PROVIDER) private readonly formationsModel: Model<Formations>,
        @Inject(FORMATION_COURS_MODEL_PROVIDER) private readonly formationsCoursModel: Model<FormationCours>,
        @Inject(FORMATION_SECTION_MODEL_PROVIDER) private readonly formationSectionModel: Model<FormationSections>,
        @Inject(FORMATION_CONTENT_MODEL_PROVIDER) private readonly formationContentModel: Model<FormationContents>
    ) {
        this.mongoose = require('mongoose');
    }


   async addCategory(data:FormationsCategoryDto) {
        let dataChecked =await this.formationCategoryModel.findOne({categoryName : data.categoryName}).exec();
        if(dataChecked == null){
            return this.formationCategoryModel.create(data);
        }else{
            return null; 
        }
    }

    updateCategory(data) {
        return this.formationCategoryModel.findOneAndUpdate({ _id: data._id }, data, { new: true }).exec();
    }

    deleteCategory(id) {
        return this.formationCategoryModel.findOneAndRemove({ _id: id }).exec();
    }

    getCategory() {
        return this.formationCategoryModel.find().exec();
    }

    //formations
    addFormation(data) {
        return this.formationsModel.create(data);
    }

    updateFormation(data) {
        return this.formationsModel.findOneAndUpdate({ _id: data._id }, data, { new: true }).exec();
    }

    deleteFormation(id) {
        return this.formationsModel.findOneAndRemove({ _id: id }).exec();
    }

    getFormations() {
        return this.formationsModel.find().exec();
    }

    getFormationByID(id) {
        return this.formationsModel.find({idCategory :id}).sort({ createdAt: -1 }).exec();
    }

    getCoursTagName(tag) {
        return this.formationCategoryModel.findOne({tagName :tag}).exec();
    }

    
    //cours
    async addCours(data) {
        return this.formationsCoursModel.create(data);
    }

    updateCours(data) {
        return this.formationsCoursModel.findOneAndUpdate({ _id: data._id }, data, { new: true }).exec();
    }

    deleteCours(id) {
        return this.formationsCoursModel.findOneAndRemove({ _id: id }).exec();
    }

    getCours(id) {
        return this.formationsCoursModel.find({idFormation : id}).exec();
    }

    getCoursByID(id) {
        return this.formationsCoursModel.find({idCategory :id}).sort({ createdAt: -1 }).exec();
    }

    //section
    addSection(data) {
        return this.formationSectionModel.create(data);
    }

    updateSection(data) {
        return this.formationSectionModel.findOneAndUpdate({ _id: data._id }, data, { new: true }).exec();
    }

    deleteSection(id) {
        return this.formationSectionModel.findOneAndRemove({ _id: id }).exec();
    }

    getSection() {
        return this.formationSectionModel.find().exec();
    }


    //content
    addContent(data) {
        return this.formationContentModel.create(data);
    }

    updateContent(data) {
        return this.formationContentModel.findOneAndUpdate({ _id: data._id }, data, { new: true }).exec();
    }

    deleteContent(id) {
        return this.formationContentModel.findOneAndRemove({ _id: id }).exec();
    }

    getContents() {
        return this.formationContentModel.find().exec();
    }
}
