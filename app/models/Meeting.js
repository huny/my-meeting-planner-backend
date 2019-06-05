/**
 * Module Dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let meetingSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    meetingId: {
        type: String,
        default: '',
        index:true,
        unique:true
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    startAt: {
        type: Date,
        default: ''
    },
    endAt: {
        type: Date,
        default: ''
    },
    place: {
        type: String,
        default:''
    },
    createdBy: {
        type:String,
        default:''
    }
})


mongoose.model('Meeting', meetingSchema)