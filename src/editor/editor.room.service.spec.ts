import { Test, TestingModule } from '@nestjs/testing';
import { EditorRoomService } from './editor.room.service';

describe('Editor.RoomService', () => {
  let service: EditorRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditorRoomService],
    }).compile();

    service = module.get<EditorRoomService>(EditorRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
