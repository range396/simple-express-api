import LocationModel from '../models/location-model.js';
import paginate from 'express-paginate';

function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function hasCategoryParam(req) {
    let category_filtered = {};
    if(req.query.category) {
        category_filtered.category = req.query.category;
    }
    return category_filtered;
}

// Retrieve with paginate and params include category query param
export const locationServiceAll = async (req, res) => {
    try {
        const [results, itemCount] = await Promise.all([
            LocationModel.find(hasCategoryParam(req))
                .limit(req.query.page_size || 10)
                .skip(req.skip) //
                .exec(),
            LocationModel.countDocuments({}),
        ]);

        const pageCount = Math.ceil(itemCount / (req.query.page_size || 10));

        res.json({
            has_more: paginate.hasNextPages(req)(pageCount),
            locations: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(10, pageCount, req.query.page),
        }).status(200);

    } catch (err) {
        // Handle error
        console.log(' Error to fetch records by filter (locationServiceAll): ' + err);
        res.json({ success: false, message: ' Error to fetch records by filter: ' + err }).status(501);
    }
};

// Create record
export const locationServiceCreate = async (req, res) => {
   try {
       let result = await LocationModel.create({
           name: createRandomString(6),
           category: 'jb4rza6u',//createRandomString(8)
       }).orFail();
       res.json({ locationId: result.location_id ?? null }).status(200);
   } catch(err) {
       // Handle error
       console.log(' Error to create record (locationServiceCreate): ' + err);
       res.json({ success: false, message: ' Error to create record: ' + err }).status(501);
   }
};

// Retrieve specific one
export const locationServiceSpecific = async (req, res) => {
  try {
      let response = await LocationModel.findOne({location_id: req.params.location_id}).orFail().exec();
      res.json({
          foundLocation: response
      }).status(200);
  } catch(err) {
      // Handle error
      console.log(' Error to find record (locationServiceSpecific): ' + err);
      res.json({ success: false, message: ' Error to find record : ' + err }).status(501);
  }
};

// Update By Id
export const locationServiceUpdateById = async (req, res) => {
   try {
       let updated = await LocationModel.updateOne({
           location_id: req.params.location_id
       },{
           ...req.body
       }, {upsert: true}).orFail();
       let result = {};
       if(updated.acknowledged) {
            result = await LocationModel.findOne({location_id: req.params.location_id});
       }
       res.json({ success: true, data: result }).status(200);
   } catch(err) {
       // Handle error
       console.log(' Error to update record by id (locationServiceUpdateById): ' + err);
       res.json({ success: false, message: ' Error to update record by id: ' + err }).status(501);
   }
};

// Update batch records by category name
export const updateBatchLocationsByCategoryName = async (req, res) => {
    try {
        let result = await LocationModel.updateMany({
            category: req.query.category
        },{
            $set: {
                ...req.body
            }
        });
        let final = {};
        if(result.acknowledged) {
            final = await LocationModel.find({category: req.query.category});
        }

        res.json({success: true, data: final, modifiedCount: result.modifiedCount }).status(200);
    } catch(err) {
        console.log(' Error to update records by category name (updateBatchLocationsByCategoryName): ' + err);
        res.json({ success: false, message: ' Error to update records by category name: ' + err }).status(501);
    }
};

// Remove record by id
export const removeLocationById = async (req, res) => {
    try {
        let result = await LocationModel.deleteOne({ location_id: req.params.location_id })
            .orFail();
        res.json({
            success: true,
            data: result
        }).status(200);
    } catch(err) {
        console.log(' Error to delete record by id (removeLocationById): ' + err);
        res.json({ success: false, message: ' Error to delete record by id: ' + err }).status(501);
    }
};