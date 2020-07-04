
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL_PROVIDER, USER_ROLE_MODEL_PROVIDER } from 'src/constants';
import { User } from './interface/user.interface';
import { UserRole } from './interface/user.role.interface';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UsersService {
    private mongoose: any;

    constructor(@Inject(USER_MODEL_PROVIDER) private readonly userModel: Model<User>, @Inject(USER_ROLE_MODEL_PROVIDER) private readonly userRoleModel: Model<UserRole>) {
        this.mongoose = require('mongoose');
    }
    async findOne(username: string) {
        return this.userModel.findOne({ email: username });
    }

    async addUser(body) {
        return this.userModel.create(body);
    }

    async getUser(): Promise<User[]> {
        return this.userModel.find();
    }

    async getOneUser(id) {
        return this.userModel.findOne({ _id: id });
    }

    updateProfil(id,profil){
        return this.userModel.findOneAndUpdate({ _id: id },{profil:profil},{new:true});
    }

    update(data){
        return this.userModel.findOneAndUpdate({ _id: data.id },data,{new:true}); 
    }

    updateCover(id,cover){
        return this.userModel.findOneAndUpdate({ _id: id },{cover:cover},{new:true});
    }

    async setPassword(id, currentPassword, newPassword): Promise<User> {
        let user = await this.userModel.findOne({ _id: id });
        if (user) {
            const checkPassword = await bcrypt.compare(currentPassword, user.password);
            if (checkPassword === true) {
              let res = await this.userModel.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true });
              return new this.userModel(res);
            }
            throw new NotFoundException('Mot de passe incorrect...');
        }
        throw new NotFoundException('Mot de passe incorrect...');
    }


    async getMail(mail) {
        return this.userModel.findOne({ email: mail });
    }

    async getMailAndPassword(mail, password) {
        return this.userModel.findOne(
            {
                $and: [
                    {
                        email: mail
                    },
                    {
                        password: password
                    }
                ]
            }
        );
    }


    addRole(body) {
        return this.userRoleModel.create(body);
    }

    findUserRoles() {
        return this.userRoleModel.find();
    }

    findUserRolesByID(id) {
        return this.userRoleModel.findById(id);
    }

    updateRole(body) {
        return this.userRoleModel.findByIdAndUpdate(body._id, body, { new: true });
    }

    deleteRole(id) {
        return this.userRoleModel.findOneAndRemove({ _id: id }).exec();
    }
}