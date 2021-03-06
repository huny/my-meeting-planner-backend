define({ "api": [
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/create/:authToken",
    "title": "api for creating new meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "startAt",
            "description": "<p>start time of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "endAt",
            "description": "<p>end time of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "place",
            "description": "<p>place of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user of meeting. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>user who created the meeting. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Meeting created successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"-E9zxTYA8\"\n        \"meetingId\": \"huxygt32\",\n        \"title\": \"Test\",  \n        \"description\": \"For testing\",                          \n        \"startAt\": \"2019-06-09T12:00:00.0000\",\n        \"endAt\": \"2019-06-09T13:00:00.0000\",\n        \"place\": \"Wakanda\",\n        \"createdBy\": \"Alex-admin\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "users",
    "name": "PostApiV1MeetingCreateAuthtoken"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/delete/:authToken/:meetingId",
    "title": "api for deleting the meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>auth token of the logged in user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>id of the meeting. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Deleted the meeting successfully\",\n    \"status\": 200,\n    \"data\": {\n        \n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "users",
    "name": "PostApiV1MeetingDeleteAuthtokenMeetingid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/edit/:authToken/:meetingId",
    "title": "api for editing the meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>auth token of the logged in user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>id of the meeting. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Updated the meeting successfully\",\n    \"status\": 200,\n    \"data\": {\n        \n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "users",
    "name": "PostApiV1MeetingEditAuthtokenMeetingid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/view/by/meetingId/:authToken/:meetingId",
    "title": "api for getting meeting details by meeting id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>auth token of the logged in user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>id of the meeting. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Meeting Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"-E9zxTYA8\"\n        \"meetingId\": \"huxygt32\",\n        \"title\": \"Test\",  \n        \"description\": \"For testing\",                          \n        \"startAt\": \"2019-06-09T12:00:00.0000\",\n        \"endAt\": \"2019-06-09T13:00:00.0000\",\n        \"place\": \"Wakanda\",\n        \"createdBy\": \"Alex-admin\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "users",
    "name": "PostApiV1MeetingViewByMeetingidAuthtokenMeetingid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/view/by/userId/:authToken/:userId/:startDate/:endDate",
    "title": "api for getting meeting details by user id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>auth token of the logged in user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user id of the user of meeting. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>start date of the meeting's data. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "endDate",
            "description": "<p>end date of the meeting's data (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Meeting Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"-E9zxTYA8\"\n        \"meetingId\": \"huxygt32\",\n        \"title\": \"Test\",  \n        \"description\": \"For testing\",                          \n        \"startAt\": \"2019-06-09T12:00:00.0000\",\n        \"endAt\": \"2019-06-09T13:00:00.0000\",\n        \"place\": \"Wakanda\",\n        \"createdBy\": \"Alex-admin\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "users",
    "name": "PostApiV1MeetingViewByUseridAuthtokenUseridStartdateEnddate"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>reset password token of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"successsfully validate user\",\n    \"status\": 200,\n    \"data\": 'c136937c5749f6b51349d669831cd06229fbd4f6'\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Mail sent successfully\",\n    \"status\": 200,\n    \"data\": 'someemail@example.com'\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImZRTzI5MTlVYSIsImlhdCI6MTU1ODczMDM4MzE1MywiZXhwIjoxNTU4ODE2NzgzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktwWnF4X3JsZCIsImZpcnN0TmFtZSI6ImhpbWFuc2h1IiwibGFzdE5hbWUiOiJhcm9yYSIsImVtYWlsIjoiaGltYW5zaC5hcm9yYTcxNkBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjkwOTA5MDkwOTA5MCwiY291bnRyeUNvZGUiOjkxfX0.ixnjNKg9tXnqwaTAYKHXS7-5KKp8RlKo2zdcHXP7uTo\",\n\"userDetails\": {\n    \"userId\": \"KpZqx_rld\",\n    \"firstName\": \"himanshu\",\n    \"lastName\": \"arora\",\n    \"email\": \"someemail@example.com\",\n    \"mobileNumber\": 909090909090,\n    \"countryCode\": 91\n}\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authorization token of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset/:token",
    "title": "to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>reset password token of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>confirm password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Pssword reset successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetToken"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>true,if user is an admin, else false. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminPasscode",
            "description": "<p>admin passcode, if isAdmin is true  (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"-E9zxTYA8\"\n        \"firstName\": \"Alex\",\n        \"lastName\": \"Yadav\",  \n        \"email\": \"someone@mail.com\",                          \n        \"mobileNumber\": 2234435524,\n        \"isAdmin\": true,\n        \"userName\": \"Alex-admin\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/users/all",
    "title": "to get all user details",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All user details found\",\n    \"status\": 200,\n    \"data\": [{\n        \"userId\": \"-E9zxTYA8\"\n        \"firstName\": \"Alex\",\n        \"lastName\": \"Yadav\",  \n        \"email\": \"someone@mail.com\",                          \n        \"mobileNumber\": 2234435524,\n        \"isAdmin\": true,\n        \"userName\": \"Alex-admin\"\n    }]\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUsersAll"
  }
] });
