import { RoleError } from '@errors/RoleError';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/domain/roles/Role';
import { MongoRepository } from 'typeorm';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private roleRepository: MongoRepository<Role>

  async findRole(roleName: string) {
    const role = await this.roleRepository.findOne({
      where: {
        name: roleName
      }
    })

    if(!role) {
      throw new RoleError(RoleError.RoleNoFound, roleName)
    }

    return role
  }
}
