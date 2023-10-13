import { Router } from 'express';
import {
  getUsers,
  getUserById,
  patchUserData,
  patchUserAvatar,
  getCurrentUser,
} from '../controllers/users';
import userValidation from '../vendor/validation/user';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userValidation.findById, getUserById);
router.patch('/me', userValidation.patchInfo, patchUserData);
router.patch('/me/avatar', userValidation.patchAvatar, patchUserAvatar);

export default router;
