import { Controller, Get, Post, Body, Res, HttpStatus, NotFoundException, Param, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { response, json } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { UserDto } from './dto/user.dto';
import { User } from '../../../frontend/src/app/_interfaces/user.interface';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Controller('users')
export class UsersController {
    
    constructor(private userSvc:UsersService){ }

    @Get()
    getAllUser() 
    {
        return this.userSvc.getUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile/:id')  
    getOneUser(@Param() param,@Res() res)
    {
        return this.userSvc.getOneUser(param.id).then((data:User)=>{
            let dataFormated = {
                id : data.id,
                username : data.username,
                firstname : data.firstname,
                nickname : data.nickname,
                adress : data.adress,
                number : data.number,
                birth : data.birth,
                email : data.email,
                cover : data.cover,
                profil : data.profil
            }
            res.status(HttpStatus.OK).json(dataFormated);    
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('setPassword/:id')  
    setPassword(@Body() body,@Param() param,@Res() res)
    {
        console.log("id:",param.id,body);
        const self = this;
        return bcrypt.genSalt(saltRounds, async function (err, salt) {
            return bcrypt.hash(body.newPassword, salt, async function (err, hash) {
                self.userSvc.setPassword(param.id,body.currentPassword,hash).then((data)=>{
                    console.log(data);
                    // return res.status(200).json(data);
                });
            });
        });
    } 

    @Get('one/Bymail/:mail')
    getMail(@Param() param)
    {
        return this.userSvc.getMail(param.mail);
    }

    @Get('one/BymailAndPassword/:mail/:password')
    getMailAndPassword(@Param() param)
    {
        console.log(param);
        return this.userSvc.getMailAndPassword(param.mail,param.password);
    } 

    @UseGuards(JwtAuthGuard)
    @Put()
    updateProfil(@Body() body:UserDto,@Res() res) { 
        body.nickname = body.nickname.toLowerCase();
        body.username = body.username.toLowerCase();
        this.userSvc.update(body).then((val)=>{
            if(val != null){ 
                return res.status(HttpStatus.OK).json(val);
            }
        }); 
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('files',3, {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        }),
    )
    async signup(@Body() data:UserDto,@UploadedFiles() files,@Res() res)
    {
        console.log(data);
        data.cover = files[0].filename;
        data.profil = files[1].filename;  
        data.piece = files[2].filename; 
        const self = this;
        var checkMail =await  this.userSvc.getMail(data.email);
        if(checkMail == null)
        {
                await bcrypt.genSalt(saltRounds, async function (err, salt) {
                    await bcrypt.hash(data.password, salt, async function (err, hash) {
                        data.password = hash;
                        console.log(data);
                        
                            self.userSvc.addUser(data).then((donnee)=>{
                                res.status(HttpStatus.OK).json(donnee);
                            });
                    });
                });
        }else{
                // return res.json({ message :"email dejà utilisé"});
            throw new NotFoundException('email dejà utilisé');
        }
    }

    
    @UseGuards(JwtAuthGuard)
    @Post('profil/update')
    @UseInterceptors(
        FileInterceptor('profil', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        }),
    ) 
    addProfil(@Body() body,@UploadedFile() file,@Res() res) {
        body.profil =file.filename;   
        console.log(body);     
        this.userSvc.updateProfil(body.id,body.profil).then((val)=>{
            if(val != null){ 
                return res.status(HttpStatus.OK).json(val.profil);
            }
        }); 
    }
    

    
    @UseGuards(JwtAuthGuard)
    @Post('cover/update')
    @UseInterceptors(
        FileInterceptor('cover', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        }),
    ) 
    addCover(@Body() body,@UploadedFile() file,@Res() res) {
        body.cover =file.filename;   
        // console.log(body);     
        this.userSvc.updateCover(body.id,body.cover).then((val)=>{
            if(val != null){ 
                return res.status(HttpStatus.OK).json(val.cover);
            }
        }); 
    }

    hashPassword(password){
        bcrypt.genSalt(saltRounds, async function (err, salt) {
            await bcrypt.hash(password, salt, async function (err, hash) {
                console.log(hash);
                return hash;
            });
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('getDate')
    getDate(@Res() res)
    {
        return res.json(Date());
    }
}
