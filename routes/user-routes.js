import { Router } from "express";
import { getProfile, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user-controllers.js";
import { userAvaterUpload } from "../middlewares/upload-middlewares.js";

// Create router
const userRouter = Router();

// Define routes
userRouter.post("/users/register",registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("users/me", getProfile);

userRouter.post("/users/logout", logoutUser);

userRouter.patch("/users/me", userAvaterUpload.single('avatar'), updateProfile);

// export Router
export default userRouter;