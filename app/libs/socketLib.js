/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const nodemailer = require('nodemailer')
const UserModel = mongoose.model('User')
const MeetingModel = mongoose.model('Meeting')

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const time = require('./timeLib')

let setServer = (server) => {

    let allOnlineUsers = []

    let allMeetings = []

    let excludedMeetings = [];

    let io = socketio.listen(server);

    let myIo = io.of('')

    let monitorMeetingTime;

    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            console.log(authToken)
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`

                    let userObj = { userId: currentUser.userId, fullName: fullName }
                    allOnlineUsers.push(userObj)
                    console.log(allOnlineUsers)

                    MeetingModel.find({ userId: currentUser.userId }, (err, meetingDetails) => {
                        if (err) {
                            console.log(err)
                        } else if (check.isEmpty(meetingDetails)) {
                            logger.info('No meeting Found for the user', 'socketLib')
                        } else {
                            allMeetings = meetingDetails
                            console.log(meetingDetails)
                        }

                    })

                    monitorMeetingTime = setTimeout(function checkMeetingTime() {
                        let datenow = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000));
                        let comingMeetings = allMeetings.filter(meeting => (datenow >= meeting.startAt - 60000
                            && datenow <= meeting.startAt && !excludedMeetings.includes(meeting)))
                        if (!check.isEmpty(comingMeetings)) {
                            excludedMeetings = comingMeetings;
                            for (var meeting of comingMeetings) {
                                myIo.emit(`show-meeting-alert-${meeting.userId}`, meeting);
                            }
                        }
                        monitorMeetingTime = setTimeout(checkMeetingTime, 20000);
                    }, 20000);

                    monitorMeetingTime;


                }


            })

        }) // end of listening set-user event


        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            clearTimeout(monitorMeetingTime)
            // console.log(socket.connectorName);
            console.log(socket.userId);
            var removeIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex, 1)
            console.log(allOnlineUsers)


        }) // end of on disconnect

        socket.on('create-meeting', (meeting) => {
            console.log('create-meeting called')
            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(meeting.userId)
            if (userOnlineIndex >= 0) {
                myIo.emit(`create-meeting-${meeting.userId}`, meeting)
            }
            console.log(meeting.userId)
            UserModel.findOne({ userId: meeting.userId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'socketLib: create-meeting', 10)
                } else if (check.isEmpty(userDetails)) {
                    logger.info('No user found with this user id', 'socketLib: create-meeting')
                } else {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: 'hunyrandom@gmail.com',
                            pass: process.env.GMAILPW
                        }
                    });

                    let mailOptions = {
                        from: 'hunyrandom@gmail.com', // sender address
                        to: userDetails.email, // list of receivers
                        subject: "Meeting planner - New Meeting created for you", // Subject line
                        text: `A new meeting has been created for you. \n
                Please find the meeting details below:\n\n
                Title: ${meeting.title}\n
                Description:${meeting.description}\n
                Start At: ${meeting.startAt}\n
                End At: ${meeting.endAt}\n
                Place: ${meeting.place}\n\n
                `
                    }

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'socketLib: create-meeting', 10)
                        } else {
                            console.log('mail sent successfully')
                        }
                    });
                }

            })

            MeetingModel.find({ userId: meeting.userId }, (err, meetingDetails) => {
                if (err) {
                    console.log(err)
                } else if (check.isEmpty(meetingDetails)) {
                    logger.info('No meeting Found for the user', 'socketLib')
                } else {
                    allMeetings = meetingDetails
                    console.log(meetingDetails)
                }

            })



        })

        socket.on('edit-meeting', (meeting) => {
            console.log('edit-meeting called')
            let userOnlineIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(meeting.userId)
            console.log(userOnlineIndex)
            if (userOnlineIndex >= 0) {
                myIo.emit(`edit-meeting-${meeting.userId}`, meeting)
            }

            UserModel.findOne({ userId: meeting.userId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'socketLib: create-meeting', 10)
                } else if (check.isEmpty(userDetails)) {
                    logger.info('No user Found with this user id', 'socketLib: edit-meeting')
                } else {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: 'hunyrandom@gmail.com',
                            pass: process.env.GMAILPW
                        }
                    });

                    let mailOptions = {
                        from: 'hunyrandom@gmail.com', // sender address
                        to: userDetails.email, // list of receivers
                        subject: "Meeting planner - Meeting details updated", // Subject line
                        text: `Meeting details has been updated for one of your meeting. \n
                Please find the meeting details below:\n\n
                Title: ${meeting.title}\n
                Description:${meeting.description}\n
                Start At: ${meeting.startAt}\n
                End At: ${meeting.endAt}\n
                Place: ${meeting.place}\n\n
                `
                    }

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'socketLib: edit-meeting', 10)
                        } else {
                            console.log('mail sent successfully')
                        }
                    });
                }

            })

            MeetingModel.find({ userId: meeting.userId }, (err, meetingDetails) => {
                if (err) {
                    console.log(err)
                } else if (check.isEmpty(meetingDetails)) {
                    logger.info('No meeting Found for the user', 'socketLib')
                } else {
                    allMeetings = meetingDetails
                    console.log(meetingDetails)
                }

            })



        })


    });

}

module.exports = {
    setServer: setServer
}
