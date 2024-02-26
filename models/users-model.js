import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';
const AutoIncrement = sequence(mongoose);

const users = new mongoose.Schema({
    user_id: { type: Number, required: true, default: 0, unique: true },
    name: { type: String, required: true },
    token: { type: String, required: false, default: null },
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

users.plugin(AutoIncrement, { inc_field: 'user_id' });

users.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

// module.exports = mongoose.model('Locations', location);
const UserModel = mongoose.model('Users', users);
export default UserModel;
