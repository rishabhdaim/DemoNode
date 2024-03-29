/**
 * Created by diam on 09/08/19.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 3
        }
    }, {
        timeStamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
