import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidObjectIdPipe implements PipeTransform {
  async transform(value:string,metadata: ArgumentMetadata)
  {
    // console.log(value);
     const isValid = mongoose.Types.ObjectId.isValid(value);
     if(!isValid)
     {
         throw new BadRequestException('Invalid id...');
     }
      return value;
  }
}
