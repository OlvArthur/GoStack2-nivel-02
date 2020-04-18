import { Router } from 'express';
import multer from 'multer';
// import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';

import authMiddleware from '../middlewares/auth';

// import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

// usersRouter.get('/', async (request, response) => {
//   const userRepository = getRepository(User);

//   const users = await userRepository.find();

//   return response.json(users);
// });

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      name,
      password,
    });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
  },
);

export default usersRouter;
