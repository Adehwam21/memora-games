import { getUserProfile, updateUserProfile } from "../../controllers/auth.controller";
import { Router } from "express";
import { verifyToken } from "../../middleware/auth";

export const userRouter = Router();


userRouter.route('/profile')
  .get(verifyToken, getUserProfile)
  .put(verifyToken, updateUserProfile)

// userRouter.route('/profile/update-password')
//   .put(verifyToken, updateUserPassword)