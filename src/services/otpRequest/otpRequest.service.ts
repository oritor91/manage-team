import { Injectable } from '@nestjs/common';
import { OtpRequest, OtpRequestDocument } from 'src/schemas/otpRequest/otpRequest.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOtpRequestDto } from './dto/createOtpRequest.dto';

const _MS_PER_MINUTE = 1000 * 60;

@Injectable()
export class OtpRequestService {
    constructor(
        @InjectModel(OtpRequest.name) private otpRequestModel: Model<OtpRequestDocument>
      ) {}
    
    async add_otprequest_record(createOtpRequest: CreateOtpRequestDto){
        const createdOtpRequest = new this.otpRequestModel(createOtpRequest);
        return createdOtpRequest.save();
    }

    async validate_otp_record(phone: string, code: Number){
        const doc = await this.otpRequestModel.findOne({phone: phone});
        if (doc){
            const currentTime = new Date();
            const diff = this.dateDiffInMinutes(doc['expiryTime'], currentTime);
            if (diff > 0 && code === doc['code']){
                console.log("code match!");
                return true;
            }
        }
        return false;
    }

    dateDiffInMinutes(a, b) {
        // Discard the time and time-zone information.
        const diff_in_minutes = (a - b) / (1000 * 60);
        return Math.floor(diff_in_minutes);
    }
}
