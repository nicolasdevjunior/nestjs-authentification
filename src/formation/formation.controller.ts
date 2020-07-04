import { Controller, Post, Body, Res, HttpStatus, UseGuards, Put, Delete, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FormationService } from './formation.service';
import { json } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FormationsCategoryDto, FormationContentDto, FormationSectionsDto, FormationsDto, FormationCoursDto } from './dto/formations.dto';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { ValidObjectIdPipe } from '../shared/valid-object-id.pipe';

@Controller('formation')
export class FormationController {

    constructor(private formationSVC: FormationService) { }

    //category
    @UseGuards(JwtAuthGuard)
    @Post()
    addCategory(@Body() data: FormationsCategoryDto, @Res() res) {
        let tag = data.categoryName;
        data.tagName = tag.replace(new RegExp("[^0-9a-zA-Z]", "g"), "_").toLowerCase();
        this.formationSVC.addCategory(data).then((resp) => {
            if (resp != null) {
                res.status(HttpStatus.OK).json(resp);
            } else {
                return res.status(HttpStatus.FOUND).json({ msg: 'Categorie dejà présent...' });
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    updateCategory(@Body() data, @Res() res) {
        let tag = data.categoryName;
        data.tagName = tag.replace(new RegExp("[^0-9a-zA-Z]", "g"), "_");
        this.formationSVC.updateCategory(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteCategory(@Param('id',new ValidObjectIdPipe()) id, @Res() res) {
        this.formationSVC.deleteCategory(id).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCategory(@Res() res) {
        this.formationSVC.getCategory().then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    //formations
    @UseGuards(JwtAuthGuard)
    @Post('/formation')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    addFormation(@Body() data: FormationsDto, @UploadedFile() file, @Res() res) {
        // console.log(data);
        let tag = data.formationName;
        data.tagName = tag.replace(new RegExp("[^0-9a-zA-Z]", "g"), "_");
        data.image = file.filename;
        this.formationSVC.addFormation(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/formation')
    updateFormation(@Body() data, @Res() res) {
        let tag = data.formationName;
        data.tagName = tag.replace(new RegExp("[^0-9a-zA-Z]", "g"), "_").toLowerCase();
        this.formationSVC.updateFormation(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/formation/:id')
    deleteFormation(@Param('id',new ValidObjectIdPipe()) id, @Res() res) {
        this.formationSVC.deleteFormation(id).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/formations')
    getFormation(@Res() res) {
        this.formationSVC.getFormations().then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/formations/:id/:tagName')
    getFormationByID(@Param('tagName') tagName,@Param('id',new ValidObjectIdPipe) id, @Res() res) {
        this.formationSVC.getCoursTagName(tagName).then((cat) => {
            if(cat == null){
                res.status(HttpStatus.NOT_FOUND).json({msg : "TagName n'existe pas..."});
            }else{
                this.formationSVC.getFormationByID(id).then((resp) => {
                    if(resp == null){
                        res.status(HttpStatus.NOT_FOUND).json({msg : "Categorie n'existe pas..."});
                    }
                    res.status(HttpStatus.OK).json(resp);
                });
            }
        });
    }

    //cours

    @UseGuards(JwtAuthGuard)
    @Post('/cours')
    addCours(@Body() data: FormationCoursDto, @Res() res) {
        // console.log(data);
        this.formationSVC.addCours(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/cours')
    updateCours(@Body() data, @Res() res) {
        this.formationSVC.updateCours(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/cours/:id')
    deleteCours(@Param('id',new ValidObjectIdPipe()) id, @Res() res) {
        this.formationSVC.deleteCours(id).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/cours/:idFormation')
    get(@Param('idFormation',new ValidObjectIdPipe()) idFormation, @Res() res) {
        this.formationSVC.getCours(idFormation).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    //sections
    @UseGuards(JwtAuthGuard)
    @Post('/section')
    addSection(@Body() data: FormationSectionsDto, @Res() res) {
        this.formationSVC.addSection(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/section')
    updateSection(@Body() data, @Res() res) {
        this.formationSVC.updateFormation(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/section/:id')
    deleteSection(@Param('id',new ValidObjectIdPipe()) id, @Res() res) {
        this.formationSVC.deleteSection(id).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/sections')
    getSection(@Res() res) {
        this.formationSVC.getSection().then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    //contents
    @UseGuards(JwtAuthGuard)
    @Post('/content')
    addContent(@Body() data: FormationContentDto, @Res() res) {
        this.formationSVC.addContent(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/content')
    updateContent(@Body() data, @Res() res) {
        this.formationSVC.updateContent(data).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/content/:id')
    deleteContent(@Param('id',new ValidObjectIdPipe()) id, @Res() res) {
        this.formationSVC.deleteContent(id).then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/contents')
    getContent(@Res() res) {
        this.formationSVC.getContents().then((resp) => {
            res.status(HttpStatus.OK).json(resp);
        });
    }
}
