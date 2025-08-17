import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  searchUsers: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create with the correct data', async () => {
      const createUserDto: CreateUserDto = { name: 'Test', email: 'test@test.com', password: 'password' };
      await controller.create(createUserDto);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', async () => {
      await controller.findAll();
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with the correct id', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call usersService.update with the correct data', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = { name: 'Test' };
      await controller.update(id, updateUserDto);
      expect(mockUsersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with the correct id', async () => {
      const id = '1';
      await controller.remove(id);
      expect(mockUsersService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('searchUsers', () => {
    it('should call usersService.searchUsers with the correct data', async () => {
      const name = 'Test';
      const email = 'test@test.com';
      await controller.searchUsers(name, email);
      expect(mockUsersService.searchUsers).toHaveBeenCalledWith(name, email);
    });
  });
});