"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
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
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
            providers: [
                {
                    provide: users_service_1.UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();
        controller = module.get(users_controller_1.UsersController);
        service = module.get(users_service_1.UsersService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should create a user', async () => {
            const createUserDto = {
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
            const updateUserDto = { name: 'Updated Name' };
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
//# sourceMappingURL=users.controller.spec.js.map