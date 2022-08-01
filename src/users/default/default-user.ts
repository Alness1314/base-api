import { ConfigKeys } from './../../utils/keys/config.keys';
import { ConfigService } from '@nestjs/config';
import { getRepository, getTreeRepository } from "typeorm";
import { User } from "../entities/user.entity";

export const setDefaultUser = async (config: ConfigService) => {
    const _userRepository = getRepository<User>(User)

    const defaultUser = await _userRepository.findOneBy({email: config.get(ConfigKeys.DEFAULT_USER_EMAIL)})


  if (!defaultUser) {
    const adminUser = _userRepository.create({
      email: config.get(ConfigKeys.DEFAULT_USER_EMAIL),
      password: config.get(ConfigKeys.DEFAULT_USER_PASS),
      roles: [],
    });

    return await _userRepository.save(adminUser);
  }
};

