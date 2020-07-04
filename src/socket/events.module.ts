import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EmployeeModule } from 'src/employee/employee.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports:[EmployeeModule],
  providers: [ChatGateway],
})
export class EventsModule {}
