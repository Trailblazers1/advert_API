import { AdvertModel } from "../models/advert-models.js";
import { addAdvertValidator, updateAdvertValidator } from "../validators/advert-validators.js";

// add a new advert
export const addAdvert = async (req, res, next) => {

    try {
        //Check if user is logged in
        //Validate user input
        const { error, value } = addAdvertValidator.validate({
            ...req.body,
            icon: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // write todo to database
        await AdvertModel.create(
            // value
            {
             ...value,
             user: req.auth.id /*this was just added to prevent the frontends from inputing anything for the users, the users was added to the schema */
        }
        );

        res.status(201).json(value/*Advert has been added! */);

    } catch (error) {
        next(error);

    }
};


// get all ads
export const getAllAdverts = async (req, res, next) => {

    try {
        const { filter = "{}",sort="{}", limit = 10,
            skip = 0 } = req.query;
          // Get the vendor's ID from the authenticated user
        const vendorId = req.auth.id; // Ensure req.auth is set by the isAuthenticated middleware

        // Filter the adverts to only show those owned by the logged-in vendor
        const parsedFilter = { ...JSON.parse(filter), user: vendorId };
  
        // Fetch all Adverts from database
        const allAdverts = await AdvertModel.find(JSON.parse(filter)).sort(JSON.parse(sort)).limit(limit).skip(skip);
        // return response
        res.status(200).json(allAdverts);

    } catch (error) {
        next(error);

    }
};

export const countAdverts = async (req, res, next) => {

    try {
      const {filter= "{}"} = req.query
      // Count Advert in database
      const count = await AdvertModel.countDocuments(JSON.parse(filter));
      // Respond to request
      res.json({count});
    } catch (error) {
     next (error);
    }
   }
// get one advert by ID

export const getOneAdvert = async (req, res, next) => {

    try {
        const oneAdvert = await AdvertModel.findOne({_id: req.params.id, user: req.auth.id});/*findById(req.params.id);*/

        if(!advert){
            return res.status(404).json('Advert not found or you do not have permission to view it.');
        }
        res.status(201).json(oneAdvert);

    } catch (error) {
        next(error);

    }
};

// update an advert
export const updateAdvert = async (req, res, next) => {
    try {
        const { error, value } = updateAdvertValidator.validate({
            ...req.body,
            icon: req.file?.filename
        });

        if (error) {
            return res.status(422).json(error);
        }

      const advertUpdate=await AdvertModel.// findByIdAndUpdate(req.params.id, value, {new:true});
      findOneAndUpdate({
       _id:req.params.id,
       user: req.auth.id}, value, {new: true});

       if (!advertUpdate){
       return res.status(404).json('Ad not found')
       } /*do same for the delete*/
        
      return res.json(value);
    } catch (error) {
        next(error);
    }
};

// delete an advert
export const deleteAdvert = async (req, res, next) => {
    try {
        const advertDelete = await AdvertModel./*findByIdAndDelete(req.params.id);*/
        findOneAndDelete({
            _id:req.params.id,
            user: req.auth.id}/*, value, {new: true}*/);
            if (!advertDelete){
            return res.status(404).json('Advert not deleted !')
            }
            return res.status(200).json('Advert deleted successfully!')
        }
      
     catch (error) {
        next(error);
    }
};


