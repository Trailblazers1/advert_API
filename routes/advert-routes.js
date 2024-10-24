import { Router } from "express";
import { addAdvert, countAdverts, deleteAdvert, getAllAdverts, getOneAdvert, updateAdvert } from "../controllers/advert-controllers.js";
import { advertIconUpload } from "../middlewares/upload-middlewares.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth-middlewares.js";


// create a router for the router
const advertRouter = Router();


// define routes 
advertRouter.post("/adverts", isAuthenticated,hasPermission('add_advert'), advertIconUpload.single("icon"), addAdvert);

advertRouter.get("/adverts",  getAllAdverts);

advertRouter.get("/adverts/count", isAuthenticated,hasPermission('count_advert'), countAdverts);

advertRouter.get("/adverts/:id", getOneAdvert);

advertRouter.patch("/adverts/:id", isAuthenticated,hasPermission( 'update_advert') ,advertIconUpload.single("icon"), updateAdvert);

advertRouter.delete("/adverts/:id", isAuthenticated, hasPermission('delete_advert'),deleteAdvert);

// Export router
export default advertRouter;


