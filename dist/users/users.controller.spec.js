"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    searchUsers: jest.fn(),
};
describe('UsersController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
            providers: [
                { provide: users_service_1.UsersService, useValue: mockUsersService },
            ],
        }).compile();
        controller = module.get(users_controller_1.UsersController);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should call usersService.create with the correct data', async () => {
            const createUserDto = { name: 'Test', email: 'test@test.com', password: 'password' };
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
            const updateUserDto = { name: 'Test' };
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
//# sourceMappingURL=users.controller.spec.js.map