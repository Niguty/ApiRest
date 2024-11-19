import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';




@Injectable()
export class UsersService {
  private users: User[] = []; 

  create(createUserDto: CreateUserDto): string {
    const newUser = new User();
    newUser.id = this.users.length + 1;
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;

    this.users.push(newUser);

    return `Usuario ${newUser.name} criado com sucesso!`;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | string {
    const user = this.users.find((user) => user.id === id);

    if(!user) {
      return `Usuário com ID ${id} não encontrado.`;
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): string {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return `Usuário com ID ${id} não encontrado.`;
    }

    const updatedUser = { ...this.users[userIndex], ...updateUserDto };
    this.users[userIndex] = updatedUser;

    return `Usuário com ID ${id} atualizado com sucesso!`;
  }

  remove(id: number): string {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return `Usuário com ID ${id} não encontrado.`;
    }

    this.users.splice(userIndex, 1);

    return `Usuário com ID ${id} removido com sucesso!`;
  }
}