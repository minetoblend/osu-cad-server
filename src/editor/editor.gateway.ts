import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { EditorRoomService } from "./editor.room.service";

@WebSocketGateway({
  cors: {
    origin: "*"
  }, 
  path: "/api/edit/endpoint"
})
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly roomService: EditorRoomService) {
  }

  @WebSocketServer() server: Server;

  handleDisconnect(client: any) {
  }

  async handleConnection(client: Socket, ...args: any[]) {
    
    if (client.handshake.query.beatmap) {
      const room = await this.roomService.getOrCreateRoom(this.server, client.handshake.query.beatmap as string);
      room.join(client);
      client.on('message', () => {})
    } else {
      client.disconnect();
    }
  }

}
