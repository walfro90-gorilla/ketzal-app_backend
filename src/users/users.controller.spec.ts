import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUsersService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue(mockUser),
  searchUsers: jest.fn().mockResolvedValue([mockUser]),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password',
      };
      const result = await controller.create(createUserDto);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('searchUsers', () => {
    it('should return users matching the criteria', async () => {
      const result = await controller.searchUsers('Test', 'test@example.com');
      expect(service.searchUsers).toHaveBeenCalledWith('Test', 'test@example.com');
      expect(result).toEqual([mockUser]);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const result = await controller.update('1', updateUserDto);
      expect(service.update).toHaveBeenCalledWith('1', updateUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });
  });
});
