const { Schema, model } = require("mongoose");

const walkSchema = new Schema({
        startingPoint: {
            type: String,
            required: true
        },
        endPoint: {
            type: String,
            required: true,
            default: () =>  this.startingPoint
        },
        durationInMinutes: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Walk = model('Walk', walkSchema);

module.exports = Walk;
