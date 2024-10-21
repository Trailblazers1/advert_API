import { Router } from "express";
import { addAdvert, deleteAdvert, getAllAdverts, getOneAdvert, updateAdvert } from "../controllers/advert-controllers.js";
import { advertIconUpload } from "../middlewares/upload-middlewares.js";
// import { advertValidate, updateAdvertValidate } from "../validators/advert-validators.js";

// create a router for the router
const advertRouter = Router();


// define routes 
advertRouter.post("/adverts", advertIconUpload.single("icon"), addAdvert);

advertRouter.get("/adverts", getAllAdverts);

advertRouter.get("/adverts/:id", getOneAdvert);

advertRouter.patch("/adverts/:id", advertIconUpload.single("icon"), updateAdvert);

advertRouter.delete("/adverts/:id", deleteAdvert);

// export router
export default advertRouter;


