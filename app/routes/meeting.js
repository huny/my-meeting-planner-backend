const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../../app/middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meeting`;

    //defining routes

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/create/:authToken api for creating new meeting.
     *
     * @apiParam {string} title title of the meeting. (body params) (required)
     * @apiParam {string} description description of the meeting. (body params) (required)
     * @apiParam {string} startAt start time of the meeting. (body params) (required)
     * @apiParam {string} endAt end time of the meeting. (body params) (required)
     * @apiParam {string} place place of the meeting. (body params) (required)
     * @apiParam {string} userId of the user of meeting. (body params) (optional)
     * @apiParam {string} createdBy user who created the meeting. (body params) (optional)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Meeting created successfully",
            "status": 200,
            "data": {
                "userId": "-E9zxTYA8"
                "meetingId": "huxygt32",
                "title": "Test",  
                "description": "For testing",                          
                "startAt": "2019-06-09T12:00:00.0000",
                "endAt": "2019-06-09T13:00:00.0000",
                "place": "Wakanda",
                "createdBy": "Alex-admin"
            }

        }
    */
    // params: title, description, startAt, endAt, place, userId, createdBy
    app.post(`${baseUrl}/create/:authToken`, auth.isAuthorized, auth.isAdmin, meetingController.createMeeting);

    
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/view/by/userId/:authToken/:userId/:startDate/:endDate api for getting meeting details by user id.
     *
     * @apiParam {string} authToken auth token of the logged in user. (query params) (required)
     * @apiParam {string} userId user id of the user of meeting. (query params) (required)
     * @apiParam {Date} startDate start date of the meeting's data. (query params) (required)
     * @apiParam {Date} endDate end date of the meeting's data (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Meeting Details Found",
            "status": 200,
            "data": {
                "userId": "-E9zxTYA8"
                "meetingId": "huxygt32",
                "title": "Test",  
                "description": "For testing",                          
                "startAt": "2019-06-09T12:00:00.0000",
                "endAt": "2019-06-09T13:00:00.0000",
                "place": "Wakanda",
                "createdBy": "Alex-admin"
            }

        }
    */
    // params: authToken, userId, startDate, endDate
    app.get(`${baseUrl}/view/by/userId/:authToken/:userId/:startDate/:endDate`, auth.isAuthorized, meetingController.getMeetingByUserId);


    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/view/by/meetingId/:authToken/:meetingId api for getting meeting details by meeting id.
     *
     * @apiParam {string} authToken auth token of the logged in user. (query params) (required)
     * @apiParam {string} meetingId id of the meeting. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Meeting Details Found",
            "status": 200,
            "data": {
                "userId": "-E9zxTYA8"
                "meetingId": "huxygt32",
                "title": "Test",  
                "description": "For testing",                          
                "startAt": "2019-06-09T12:00:00.0000",
                "endAt": "2019-06-09T13:00:00.0000",
                "place": "Wakanda",
                "createdBy": "Alex-admin"
            }

        }
    */
    // params: authToken, meetingId
    app.get(`${baseUrl}/view/by/meetingId/:authToken/:meetingId`, auth.isAuthorized, meetingController.getMeetingByMeetingId);


    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/delete/:authToken/:meetingId api for deleting the meeting.
     *
     * @apiParam {string} authToken auth token of the logged in user. (query params) (required)
     * @apiParam {string} meetingId id of the meeting. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Deleted the meeting successfully",
            "status": 200,
            "data": {
                
            }

        }
    */
    // params: authToken, meetingId
    app.post(`${baseUrl}/delete/:authToken/:meetingId`, auth.isAuthorized, auth.isAdmin, meetingController.deleteMeeting);


        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/edit/:authToken/:meetingId api for editing the meeting.
     *
     * @apiParam {string} authToken auth token of the logged in user. (query params) (required)
     * @apiParam {string} meetingId id of the meeting. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Updated the meeting successfully",
            "status": 200,
            "data": {
                
            }

        }
    */
    // params: authToken, meetingId
    app.put(`${baseUrl}/edit/:authToken/:meetingId`, auth.isAuthorized, auth.isAdmin, meetingController.editMeeting);

}