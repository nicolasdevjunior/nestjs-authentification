
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interface/user.interface';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(user){
      const checkPassword = await bcrypt.compare(pass,user.password);
      if (checkPassword === true) {
        const { password, ...result } = user;
        return result;
      }
      throw new NotFoundException('Mot de passe incorrect');
    }
    throw new NotFoundException('Email incorrect');


   

  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    // let dataUser:User =user._doc;
    let dataUser ={
      _id : user._doc._id,
      username : user._doc.username,
      firstname : user._doc.firstname,
      email: user._doc.email,
      role : user._doc.role
    }
    
    return {
      access_token: this.jwtService.sign(payload),
      user : dataUser
    };
  }
}  