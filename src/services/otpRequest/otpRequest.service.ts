import { Injectable } from '@nestjs/common';
import { OtpRequest, OtpRequestDocument } from 'src/schemas/otpRequest/otpRequest.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOtpRequestDto } from './dto/createOtpRequest.dto';


@Injectable()
export class OtpRequestService {
    constructor(
        @InjectModel(OtpRequest.name) private otpRequestModel: Model<OtpRequestDocument>
      ) {}
    
    add_otprequest_record(createOtpRequest: CreateOtpRequestDto){
        const createdOtpRequest = new this.otpRequestModel(createOtpRequest);
        console.log(createdOtpRequest);
        return createdOtpRequest.save();
    }
}
