import { Injectable } from '@nestjs/common';
import {
  OtpRequest,
  OtpRequestDocument,
} from 'src/schemas/otpRequest/otpRequest.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOtpRequestDto } from './dto/createOtpRequest.dto';

const _MS_PER_MINUTE = 1000 * 60;

@Injectable()
export class OtpRequestService {
  constructor(
    @InjectModel(OtpRequest.name)
    private otpRequestModel: Model<OtpRequestDocument>,
  ) {}

  async add_otprequest_record(createOtpRequest: CreateOtpRequestDto) {
    const createdOtpRequest = new this.otpRequestModel(createOtpRequest);
    return createdOtpRequest.save();
  }

  async validate_otp_record(phone: string, code: number): Promise<boolean> {
    const doc = await this.otpRequestModel.findOne({ phone, code });
    if (doc) {
      const currentTime = new Date();
      const diff = this.dateDiffInMinutes(doc['expiryTime'], currentTime);
      return diff > 0;
    }
  }

  dateDiffInMinutes(a, b) {
    // Discard the time and time-zone information.
    const diff_in_minutes = (a - b) / (1000 * 60);
    return Math.floor(diff_in_minutes);
  }
}
