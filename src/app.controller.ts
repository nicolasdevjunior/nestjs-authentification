
import { Controller, Get, Request, Post, UseGuards, Res, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req,@Res() res) {
      return this.authService.login(req.user).then((data)=>{
              return res.status(200).json(data);
      });
  }  

  //@UseGuards(LocalAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; 
  }


  @Get('show/:imgpath')
  getAllImg(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
  }

}