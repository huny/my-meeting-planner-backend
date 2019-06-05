// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImViVTRlYlFzVCIsImlhdCI6MTU1ODg3MjA3NzQyMSwiZXhwIjoxNTU4OTU4NDc3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6InAyT0xGU1ZzcCIsImZpcnN0TmFtZSI6Ikh1bnkiLCJsYXN0TmFtZSI6IiIsImVtYWlsIjoiYW5lbWFpbEBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjkwOTA5MDkwOTAsImNvdW50cnlDb2RlIjo5MSwiaXNBZG1pbiI6dHJ1ZSwidXNlck5hbWUiOiJIdW55LWFkbWluIn19.4Vzc2rAVlrBiYhZhr7fzHZqIBIMhc6_EyoPXhdejWBU"
const userId= "p2OLFSVsp"

let chatSocket = () => {

  let snooze = true;

  let meetingDetails = {
    userId: 'p2OLFSVsp',
    title: 'New meeting',
    description: 'Testing',
    startAt: '30-May-2019 7:30 PM',
    endAt: '30-May-2019 8:30 PM',
    place: 'Alexandria'
  }

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

    //socket.emit('create-meeting', meetingDetails);

    //socket.emit('edit-meeting', meetingDetails);

  });


  socket.on(userId, (data) => {

    console.log("you received a message")
    console.log(data)

  });

  socket.on(`create-meeting-${userId}`, (data) => {

    console.log("New meeting created")
    console.log(data)

  });

  socket.on(`edit-meeting-${userId}`, (data) => {

    console.log("Meeting details updated")
    console.log(data)

  });

  socket.on(`show-meeting-alert-${userId}`, (meeting) => {

    console.log("You have a meeting in a minute")
    console.log(meeting)

    //if(snooze){
      socket.emit("snooze", meeting);
    //}

  });



}// end chat socket function

chatSocket();
