import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

  constructor (
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {

    return this.usersRepository.findOne(id);

  }

  update(id: number, data: Partial<UpdateUserDto>) {

    return this.usersRepository.update({ id }, data);

  }

  remove(id: number) {

     this.usersRepository.delete({ id });

    return { deleted: true };

  }

   findUser(query: any): Promise<Users> {
    return this.usersRepository.findOne(query);
}
}
