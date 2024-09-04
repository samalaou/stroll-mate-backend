const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

const Message = model('Message', messageSchema);

module.exports = Message;
