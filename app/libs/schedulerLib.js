const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const check = require('./checkLib');
const logger = require('./loggerLib')
require('./../models/Meeting');
require('./../models/User');

const MeetingModel = mongoose.model('Meeting')
const UserModel = mongoose.model('User')

let monitorMeetings = () => {
    MeetingModel.find((err, meetingDetails) => {
        if (err) {
            console.log(err)
        } else if (check.isEmpty(meetingDetails)) {
            logger.info('No meeting Found', 'schedularLib')
        } else {
            allMeetings = meetingDetails;

            let datenow = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000));
            let comingMeetings = allMeetings.filter(meeting => (datenow >= meeting.startAt - 60000
                && datenow <= meeting.startAt))
            if (!check.isEmpty(comingMeetings)) {
                for (var meeting of comingMeetings) {
                    UserModel.findOne({ userId: meeting.userId }, (err, userDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'socketLib: create-meeting', 10)
                        } else if (check.isEmpty(userDetails)) {
                            logger.info('No user Found with this user id', 'schedularLib')
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
                                subject: "Meeting planner - Upcoming Meeting in 1 minute", // Subject line
                                text: `You have a meeting in 1 minute. \n
                                    Please find the meeting details below:\n\n
                                    Title: ${meeting.title}\n
                                    Description:${meeting.description}\n
                                    Start At: ${new Date(new Date(meeting.startAt).getTime() + (new Date(meeting.startAt).getTimezoneOffset() * 60000))}\n
                                    End At: ${new Date(new Date(meeting.endAt).getTime() + (new Date(meeting.endAt).getTimezoneOffset() * 60000))}\n
                                    Place: ${meeting.place}\n\n
                                    `
                            }

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (err) => {
                                if (err) {
                                    console.log(err)
                                    logger.error(err.message, 'schedularLib', 10)
                                } else {
                                    console.log('mail sent successfully')
                                }
                            });
                        }

                    })
                }
            }
        }

    })
}

module.exports = {
    monitorMeetings: monitorMeetings
}