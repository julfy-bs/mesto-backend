import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  patchUserData,
  patchUserAvatar,
} from '../controllers/users';
import { validateCreateUser } from '../vendor/validation/validate-create-user';
import { validateGetUserId } from '../vendor/validation/validate-get-user-id';

const router = Router();
router.get('/users', getUsers);
router.get('/users/:userId', validateGetUserId, getUserById);
router.post('/users', validateCreateUser, createUser);
router.patch('/users/me', patchUserData);
router.patch('/users/me/avatar', patchUserAvatar);

export default router;
