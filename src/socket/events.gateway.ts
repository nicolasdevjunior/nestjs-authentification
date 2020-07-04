import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, MessageBody, ConnectedSocket, OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    constructor(private svc:EmployeeService){}
    
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('EventsGateway');
   
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.svc.getEmployee().then((res)=>{
            this.server.emit('msgToClient', res);
        });
    }
   
    afterInit(server: Server) {
        // console.log('jfdkjf')
     this.logger.log('Init');
    }
   
    handleDisconnect(client: Socket) {
     this.logger.log(`Client disconnected: ${client.id}`);
    }

    sendMessageToAll(username){
        this.server.broadcast.emit('user joined', {
            username: this.server.username,
            // numUsers: numUsers
        });
    }
   
    handleConnection(client: Socket, ...args: any[]) {
     this.logger.log(`Client connected: ${client.id}`);
    }
}
