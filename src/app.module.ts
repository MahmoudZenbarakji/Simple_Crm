import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [AuthModule, LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
