import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';
import { AuthModule } from './auth/auth.module';
import { LeadModule } from './lead/lead.module';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LeadsModule, AuthModule, LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
