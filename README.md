# Real Estate Website
Whether you’re buying, selling, or providing Evaluation Services, this website has something for you. if you want to sell any Property, you can subscribe to this website and start selling, if you are looking for a home you would love to live in, you can discover Properties and take an appointment to see it, if you are an architect, you can provide an evaluation service and get paid for it.

## Table of Contents
1. [ Models. ](#models)
2. [ ER diagrm. ](#er)
3. [ Routes. ](#routes)
4. [ UML diagrm.](#uml)
5. [ Installation. ](#installation)
6. [ Dependencies. ](#dep)



<a name="models"></a>

## Models
#### - Role model 
```
{
  role: { type: String, required: true },
}
```
#### - User model 
```
{
  email: { type: String, required: true, unique: true, validate: { validator: validator.isEmail, message: "{VALUE} is not a valid email"}},
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String },
  phoneNumber: { type: String },
  nationalId: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  isDeleted: { type: Boolean, default: false },
  img: {type: String, default:"https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg"},
  isVerified: { type: Boolean, default: false },
  resetLink: {data: String, default: ""},
  sellerRateArr: {type: array, default: []},
  providerRateArr:  {type: array, default: []},
  providerAvailability : { type: Boolean, default: true },
  providerCity: {data: String, default: ""},
  providerPrice: {data: Number, default: ""},
  providerCertifacitonArr : {type: array , default: []}
}

```
#### - Interested model 
```
{
  by: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  onProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
}
```
#### - Property model 
```
{
  imgArr: { type: array, defult: "" },
  date: { type: Date, default: new Date() },
  name: { type: String, required: true },
  price: { data: Number, default: "" },
  City : { type: String, required: true }
  location :{ type: String, required: true }
  describe : { type: String, required: true }
  isDeleted : { type: boolean, defult: false }
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user"  }
  propertyHighlights: {type: Object}
  
}
```
#### - Appointment model 
```
{
  onProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property"  },
  isDeleted: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "user"  },
  client: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
  isCanceled: { type: Boolean, default: false },
}
```

#### - Subscribe model 
```
{
  sellerRef: { type: mongoose.Schema.Types.ObjectId, ref: "user"  },
  amount: { },
  startDate: { type: Date, default: new Date() },
  endDate: {type: Date , defult:new Date() },
  isCanceled: { type: Boolean, default: false },
}
```

#### - Room model 
```
{
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "user"  },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  msgRef: {  type: mongoose.Schema.Types.ObjectId, ref: "Message"  },

}
```

#### - Message model 
```
{
  msgContent: { type: String, required: true },
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  roomRef: {  type: mongoose.Schema.Types.ObjectId, ref: "Room"  },

}
```


<a name="er"></a>

## ER diagram
![Untitled Diagram drawio-24](https://user-images.githubusercontent.com/92247950/146674221-5d3d6171-ac44-48ab-bd8e-e8e503882bf1.png)

<a name="routes"></a>

## Routes
HTTP Method   | authorize     |    Path                          |  Request Body                                                       |Success | Error
------------- | -----------   | ---------------------------      |----------------------                                               |--------|-----------
POST          | everyone      |`/user/create`                    |{email, username, name, password,phoneNumber, img, nationalId, role} | 200    |400           
POST          | everyone      |`/user/log`                       |{email or username, password}                                        | 201    |400
GET           | everyone      |`/user/`                          |                                                                     | 200    |400
GET           | everyone      |`/user/confirmation/:email/:token`|                                                                     | 200    |400
PUT           | everyone      |`/user/forgetPassword`            |{email}                                                              | 200    |400
PUT           | everyone      |`/user/resetPassword`             |{resetLink, newPassword}                                             | 200    |400
GET           | everyone      |`/user/:_id"`                     |                                                                     | 200    |400
POST          | everyone      |`/user/googlelogin`               |{idToken}                                                            | 200    |400
DELETE        | user          |`/user/`                          |                                                                     | 200    |400
POST          | user          |`/user/newRate`                   |{user , rate}                                                        | 200    |400
PUT           | user          |`/propety/`                       |{by, onPost}                                                         | 200    |400
GET           | user          |`/propety/:onPropety`             |                                                                     | 200    |400                                                       
POST          | user          |`/Property/create`                |{title, by, onPost}                                                  | 200    |400
DELETE        | user          |`/Property/delete/:_id`           |                                                                     | 200    |400
GET           | user          |`/posts/userProperty/:postedBy`   |                                                                     | 200    |400
POST          | user          |`/interested`                     |{id , userId}                                                        | 200    |400
GET           | user          |`/interested/:_id`                |                                                                     | 200    |400
DELETE        | user          |`/SUBSCRIBE/:_id`                 |                                                                     | 200    |400
POST          | user          |`/SUBSCRIBE/update`               |{userId}                                                             | 200    |400
POST          | user          |`/appointment`                    |{onProperty ، client ، serviceProvider ، type }                      | 200    |400 
DELETE        | user          |`/appointment/:_id`               |                                                                     | 200    |400
GET           | user          |`/appointment/:id`                |                                                                     | 200    |400 
POST          | user          |`/room`                           |{ user, sendToUser }                                                 | 200    |400
POST          | user          |`/message`                        | {content , user , room}                                             | 200    |400
GET           | user          |`/message/:id`                    |                                                                     | 200    |400                                                          



<a name="uml"></a>

## UML diagram
![Untitled Diagram-Page-2 drawio](https://user-images.githubusercontent.com/92247950/146674658-f3f4aaff-6e9c-42a6-aada-494fdf9bfdbf.png)



<a name="installation"></a>

## Installation
- Clone this folder locally
- Install all packages using `npm install` command
- Run `npm run dev` in your command line


<a name="dep"></a>
## dependencies
- Express
- nodemon
- dotenv
- mongoose
- bcrypt
- jsonwebtoken
- cors
- google-auth-library
- nodemailer
- socket.io
- validator
- stripe


<a name="slid"></a>


## for more information
- [ Slides. ](#slid) 
- [ Deployed App Link. ](#slid)
- [ Frontend Repo ](https://github.com/MP-Project-Dorrah/client)
