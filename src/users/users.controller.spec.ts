import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { Users, UsersRepository} from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let createUserDto: CreateUserDto;
  let updateUserDto: UpdateUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService, 
        UsersRepository,
        CreateUserDto,
        UpdateUserDto,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          },        
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    usersService = module.get<UsersService>(UsersService);
    createUserDto = module.get<CreateUserDto>(CreateUserDto);
    updateUserDto = module.get<UpdateUserDto>(UpdateUserDto);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findAll
  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      usersService.findAll = jest.fn();
      const data = controller.findAll();
      expect(controller.findAll()).toBe(data);
    });
  });

  // findOne
  describe('Find one Users', () => {
    it('should return one users', async () => {
      usersService.findOne = jest.fn();
      const data = controller.findOne('id');
      expect(controller.findOne('id')).toBe(data);
    });
  });

  // createuser
  describe('Create a user', () => {
    it('should create a user', async () => {
      usersService.create = jest.fn();
      const data = controller.create(createUserDto);
      expect(controller.create(createUserDto)).toBe(data);
    });
  });

  // createuser
  describe('Update a user', () => {
    it('should create a user', async () => {
      usersService.update = jest.fn();
      const data = controller.update(id, updateUserDto);
      expect(controller.update(id, updateUserDto)).toBe(data);
    });
  });

  // deleteuser
  describe('Delete a user', () => {
    it('should delelte a user', async () => {
      usersService.remove = jest.fn();
      const data = controller.remove();
      expect(controller.remove()).toBe(data);
    });
  });

});
