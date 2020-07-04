import { Controller, UseGuards, Get, Param, Post, Put, Body, Res, HttpStatus, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from '../users.service';

@Controller('user-role')
export class UserRoleController {
    
    constructor(private userSvc:UsersService){

    }

    // @UseGuards(JwtAuthGuard)
    @Get('/:id')  
    getUserRole(@Param() param,@Res() res)
    {
        this.userSvc.findUserRolesByID(param.id).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        });
    }

    // @UseGuards(JwtAuthGuard)
    @Get()  
    getUsersRole(@Res() res)
    {
        this.userSvc.findUserRoles().then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        });
    }

    // @UseGuards(JwtAuthGuard)
    @Post()  
    async addUserRole(@Body() data,@Res() res)
    {
        return this.userSvc.addRole(data).then((data)=>{
            return res.json(data);
        });
    }

    // @UseGuards(JwtAuthGuard)
    @Put()  
    updateUserRole(@Body() data,@Res() res)
    { 
        return this.userSvc.updateRole(data).then((data)=>{
            return res.json(data); 
        });
    }

    // @UseGuards(JwtAuthGuard)
    @Delete('/:id')  
    deleteUserRole(@Param() params,@Res() res)
    { 
        return this.userSvc.deleteRole(params.id).then((data)=>{
            return res.json({
                msg : 'Donnée supprimé...'
            }); 
        });
    }

}
