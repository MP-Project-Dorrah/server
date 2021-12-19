# Real Estate Website

## Table of Contents
1. [ UML diagrm.](#uml)
2. [ ER diagrm. ](#er)
3. [ Models. ](#models)
4. [ Routes. ](#routes)
5. [ Installation. ](#installation)
6. [ Dependencies. ](#dep)


<a name="er"></a>

## ER diagram
![Untitled Diagram drawio-24](https://user-images.githubusercontent.com/92247950/146674221-5d3d6171-ac44-48ab-bd8e-e8e503882bf1.png)


<a name="uml"></a>

## UML diagram
![Untitled Diagram drawio-19](https://user-images.githubusercontent.com/92247950/146519206-914ec7dd-cdb9-4e63-b9a8-91ccc71ee83d.png)





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


<a name="routes"></a>

## Routes
HTTP Method   | authorize     |    Path                                |  Request Body         
------------- | -----------   | ---------------------------            |---------------------- 
POST          | everyone      |`/user/create`                          |{email, username, name, password, phoneNumber, img, nationalId, role}
POST          | everyone      |`/user/log`                             |{email or username, password}     
GET           | everyone      |`/user/`                                |                       
GET           | everyone      |`/user/confirmation/:email/:token`      |                       
PUT           | everyone      |`/user/forgetPassword`                  |{email}     
PUT           | everyone      |`/user/resetPassword`                   |{resetLink, newPassword}  
GET           | everyone      |`/user/:_id"`                           |                       
POST          | everyone      |`/user/googlelogin`                     |{idToken} 
DELETE        | user          |`/user/`                                |
POST          | user          |`/user/newRate`                         |{user , rate} 
PUT           | user          |`/propety/`                             |{by, onPost}
GET           | user          |`/propety/:onPropety`                   |
POST          | user          |`/Property/create`                      |{title, by, onPost}
DELETE        | user          |`/Property/delete/:_id`                 |
GET           | user          |`/posts/userProperty/:postedBy`         |
POST          | user          |`/interested`                           |{id , userId}
GET           | user          |`/interested/:_id`                      |
DELETE        | user          |`/SUBSCRIBE/:_id`                       |
POST          | user          |`/SUBSCRIBE/update`                     |{userId}
POST          | user          |`/appointment`                          |{onProperty ، client ، serviceProvider ، type }
DELETE        | user          |`/appointment/:_id`                     |
GET           | user          |`/appointment/:id`                      |
POST          | user          |`/room`                                 |{ user, sendToUser }
POST          | user          |`/message`                              | {content , user , room}
GET           | user          |`/message/:id`                          |


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


