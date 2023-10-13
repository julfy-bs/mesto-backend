import { validateCreateUser } from './validate-create-user';
import { validateGetUserId } from './validate-get-user-id';
import { validateLogin } from './validate-login';
import { validatePatchUserAvatar } from './validate-patch-user-avatar';
import { validatePatchUserData } from './validate-patch-user-data';

export default {
  findById: validateGetUserId,
  patchInfo: validatePatchUserData,
  patchAvatar: validatePatchUserAvatar,
  login: validateLogin,
  signup: validateCreateUser,
}
