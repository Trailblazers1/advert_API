import { AdvertModel } from "../models/advert-models.js";

// add a new advert
export const addAdvert = async ( req, res, next)=>{

try {
    const adPost = await AdvertModel.create(req.body);
    res.status(201).json(adPost);
    
} catch (error) {
    next(error);

}};


// get all ads
export const getAllAdverts = async ( req, res, next)=>{

    try {
        const allAdverts = await AdvertModel.create(req.body);
        res.status(201).json(allAdverts);
        
    } catch (error) {
        next(error);
    
    }};


// get one advert by ID

    export const getOneAdvert = async ( req, res, next)=>{

        try {
            const oneAdvert = await AdvertModel.create(req.body);
            res.status(201).json(oneAdvert);
            
        } catch (error) {
            next(error);
        
        }};

// update an advert
export const updateAdvert = async (req, res, next) => {
    try {
        const adUpdate = await AdvertModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(adUpdate);
    } catch (error) {
        next(error);
    }
};

// delete an advert
export const deleteAdvert = async (req, res, next) => {
    try {
        const advertDelete = await AdvertModel.findByIdAndDelete(req.params.id);
        res.status(200).json(advertDelete);
    } catch (error) {
        next(error);
    }
};


