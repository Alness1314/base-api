import { ValidRoles } from './../../auth/interfaces/validRoles';
import { ConfigService } from '@nestjs/config';
import { Role } from './../../roles/entities/role.entity';
import { getRepository } from "typeorm"

export const setDefaultRoles = async (config: ConfigService) => {
    const _roleRepository = getRepository<Role>(Role)

    const defaulRole = await _roleRepository.findOneBy({name: ValidRoles.admin})
    if(!defaulRole){
        const adminRole =  _roleRepository.create({
            name: ValidRoles.admin,
        })

        return await _roleRepository.save(adminRole);
    }
}