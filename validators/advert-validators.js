import Joi from "joi";
export const advertValidate =(req,res,next)=>{
const advertValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    category: Joi.string(),
    image: Joi.string().required()
});

    try {
        const{error} = advertValidation.validate(req.body)
        if (error) { 
        return res.status(400).json(error)}
        else {
            next();
        }
        
    } catch (error) {
       next(error) 
    }
}



export const updateAdvertValidate =(req,res,next)=>{
const advertValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    category: Joi.string(),
    image: Joi.string().required()
});

    try {
        const{error} = advertValidation.validate(req.body)
        if (error) { 
        return res.status(400).json(error)}
        else {
            next();
        }
        
    } catch (error) {
       next(error) 
    }
}