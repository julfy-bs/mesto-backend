import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  patchUserData,
  patchUserAvatar,
} from '../controllers/users';
import userValidation from '../vendor/validation/user';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', userValidation.findById, getUserById);
router.post('/users', userValidation.create, createUser);
router.patch('/users/me', userValidation.patchInfo, patchUserData);
router.patch('/users/me/avatar', userValidation.patchAvatar, patchUserAvatar);

export default router;
