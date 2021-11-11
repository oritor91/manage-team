import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpRequest, OtpRequestSchema } from 'src/schemas/otpRequest/otpRequest.schema';
import { OtpRequestService } from './otpRequest.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: OtpRequest.name, schema: OtpRequestSchema }])
    ],
    providers: [OtpRequestService],
    exports: [OtpRequestService]
})
export class OtpRequestModule {}
