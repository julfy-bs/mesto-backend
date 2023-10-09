import { validateCreateUser } from './validate-create-user';
import { validateGetUserId } from './validate-get-user-id';
import { validatePatchUserAvatar } from './validate-patch-user-avatar';
import { validatePatchUserData } from './validate-patch-user-data';

export default {
  findById: validateGetUserId,
  create: validateCreateUser,
  patchInfo: validatePatchUserData,
  patchAvatar: validatePatchUserAvatar,
}
