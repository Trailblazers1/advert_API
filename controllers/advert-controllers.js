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
        await AdvertModel.create(value);

        res.status(201).json(value);

    } catch (error) {
        next(error);

    }
};


// get all ads
export const getAllAdverts = async (req, res, next) => {

    try {
        const { filter = "{}", limit = 10,
            skip = 0 } = req.query;
        // Fetch all Adverts from database
        const allAdverts = await AdvertModel.find(JSON.parse(filter)).limit(limit).skip(skip);
        // return response
        res.status(201).json(allAdverts);

    } catch (error) {
        next(error);

    }
};


// get one advert by ID

export const getOneAdvert = async (req, res, next) => {

    try {
        const oneAdvert = await AdvertModel.findById(req.params.id);
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

        await AdvertModel.findByIdAndUpdate(req.params.id, value, {new:true});
        res.json(value);
    } catch (error) {
        next(error);
    }
};

// delete an advert
export const deleteAdvert = async (req, res, next) => {
    try {
        const advertDelete = await AdvertModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Advert deleted Successfully!');
    } catch (error) {
        next(error);
    }
};


