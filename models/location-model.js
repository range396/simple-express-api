import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';
const AutoIncrement = sequence(mongoose);

const location = new mongoose.Schema({
    location_id: { type: Number, required: true, default: 0, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false },
    rating: { type: Number, required: false },
    review_count: { type: Number, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

location.plugin(AutoIncrement, { inc_field: 'location_id' });

location.pre('save', function(next){
    this.updated_at = Date.now();
    next();
});

// module.exports = mongoose.model('Locations', location);
const LocationModel = mongoose.model('Locations', location);

export default LocationModel;
