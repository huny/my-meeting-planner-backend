const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');

/* Models */
const MeetingModel = mongoose.model('Meeting')

//create a new meeting
let createMeeting = (req, res) => {
    if (check.isEmpty(req.body.title) || check.isEmpty(req.body.description) || check.isEmpty(req.body.startAt)
        || check.isEmpty(req.body.endAt) || check.isEmpty(req.body.place) || check.isEmpty(req.body.userId)
        || check.isEmpty(req.body.createdBy)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'One or more required parameters are missing', 403, null)
        res.send(apiResponse)
    } else {

        let meetingId = shortid.generate()

        console.log(req.body.startAt)
        let newMeeting = new MeetingModel({
            meetingId: meetingId,
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            startAt: req.body.startAt,
            endAt: req.body.endAt,
            place: req.body.place,
            createdBy: req.body.createdBy

        }) // end new meeting model

        newMeeting.save((err, meetingDetails) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting created successfully', 200, meetingDetails)
                res.send(apiResponse)
            }
        }) // end new meeting save
    }

}//end createMeeting

/* Get meeting details of a user*/
let getMeetingByUserId = (req, res) => {
    //MeetingModel.find({ 'userId': req.params.userId, 'startAt': {"$gte": req.params/startAt, "$lt": req.params.endAt}})
    MeetingModel.find({
        $and: [
            { 'userId': req.params.userId },
            {
                $or: [
                    { 'startAt': { "$gte": req.params.startDate, "$lt": req.params.endDate } },
                    { 'endAt': { "$gte": req.params.startDate, "$lt": req.params.endDate } }]
            }
        ]
    })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeetingByUserId', 10)
                let apiResponse = response.generate(true, 'Failed To Find meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No meeting Found', 'Meeting Controller:getMeetingByUserId')
                let apiResponse = response.generate(true, 'No meeting Found', 202, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getMeetingByUserId

/* Get details of a single meeting*/
let getMeetingByMeetingId = (req, res) => {
    MeetingModel.findOne({ 'meetingId': req.params.meetingId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeetingByMeetingId', 10)
                let apiResponse = response.generate(true, 'Failed To Find meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No meeting Found', 'Meeting Controller:getMeetingByMeetingId')
                let apiResponse = response.generate(true, 'No meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getMeetingByMeetingId

//delete a meeting
let deleteMeeting = (req, res) => {

    MeetingModel.remove({ 'meetingId': req.params.meetingId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Meeting Controller: deleteMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'Meeting Controller: deleteMeeting')
            let apiResponse = response.generate(true, 'No meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the meeting successfully', 200, result)
            res.send(apiResponse)
        }
    });// end deleteMeeting


}// end delete user

//edit details of a meeting
let editMeeting = (req, res) => {
    let options = req.body;
    MeetingModel.update({ 'meetingId': req.params.meetingId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To edit meeting details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'Meeting Controller: editMeeting')
            let apiResponse = response.generate(true, 'No meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            MeetingModel.findOne({ 'meetingId': req.params.meetingId })
                .select('-__v -_id')
                .lean()
                .exec((err, meetingDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Meeting Controller: editMeeting', 10)
                        let apiResponse = response.generate(true, 'Failed To Find meeting Details', 500, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Meeting Details Found', 200, meetingDetails)
                        res.send(apiResponse)
                    }
                })
        }
    });
}// end editMeeting

module.exports = {
    createMeeting: createMeeting,
    getMeetingByUserId: getMeetingByUserId,
    getMeetingByMeetingId: getMeetingByMeetingId,
    deleteMeeting: deleteMeeting,
    editMeeting: editMeeting
}