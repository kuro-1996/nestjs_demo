import { Controller } from '@nestjs/common';

import { ProfileService } from './profile.service';

@Controller('users')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }
}
