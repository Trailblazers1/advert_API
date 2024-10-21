import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const  localUpload = multer({ dest: "uploads/"});

export const advertIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/advert-api/adverts/*",
    }),
    preservePath: true
})

export const userAvaterUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "advert-api/users/*",
  }),
  preservePath: true  
})