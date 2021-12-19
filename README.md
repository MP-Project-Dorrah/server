# Real Estate Website
Whether you’re buying, selling, or providing Evaluation Services, this website has something for you. if you want to sell any Property, you can subscribe to this website and start selling, if you are looking for a home you would love to live in, you can discover Properties and take an appointment to see it, if you are an architect, you can provide an evaluation service and get paid for it.

## Table of Contents
1. [ Models. ](#models)
2. [ ER diagrm. ](#er)
3. [ Routes. ](#routes)
4. [ UML diagrm.](#uml)
5. [ Installation. ](#installation)
6. [ Dependencies. ](#dep)
7. [ Additional information. ](#slid)



<a name="models"></a>

## Models

#### - Role model 
Key           |     Type               |  options           | default value
------------- | ---------------        | -----------        |------
role          |   String               | required, unique   | n/a


#### - User model 

Key                      |     Type               |  options           | default value
-------------            | ---------------        | -----------        |------
email                    |   String               | required, unique   | n/a
username                 |   String               | required, unique   | n/a
name                     |   String               | required           | n/a
password                 |   String               | required           | n/a
phoneNumber              |   String               | required, unique   | n/a
nationalId               |   String               | required, unique   | n/a
role                     |   ref.                 | required           | n/a
isDeleted                |   Boolean              |                    | false
img                      |   String               | required           | "https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg"
isVerified               |   Boolean              |                    | false
resetLink                |   String               |                    | ""
sellerRateArr            |   Array                |                    | []
providerRateArr          |   Array                |                    | []
providerAvailability     |   Boolean              |                    | true
providerCity             |   String               | required           | n/a
providerPrice            |   String               | required           | n/a
providerCertifacitonArr  |   Array                |                    | []



#### - Interested model 

Key           |     Type            |  options  | default value
------------- | ---------------     | --------- |------
by            |   ref               | required  | n/a
onProperty    |   ref               | required  | n/a


#### - Property model 

Key                  |     Type               |  options           | default value
-------------        | ---------------        | -----------        |------
imgArr               |   Array                |                    | ""
date                 |   Date                 |                    | new Date()
name                 |   String               | required           | n/a
price                |   Number               | required           | n/a
City                 |   String               | required           | n/a
location             |   String               | required           | n/a
describe             |   String               | required           | n/a
isDeleted            |   boolean              |                    | false
postedBy             |   ref                  | required           | n/a
propertyHighlights   |   Object               | required           | n/a


#### - Appointment model 

Key                  |     Type               |  options           | default value
-------------        | ---------------        | -----------        |------
onProperty           |   ref                  |  required          | n/a
date                 |   Date                 |                    | new Date()
isDeleted            |   Boolean              |                    | false
serviceProvider      |   ref                  | required           | n/a
client               |   ref                  | required           | n/a
isCanceled           |   Boolean              |                    | false



#### - Subscribe model 

Key                  |     Type               |  options           | default value
-------------        | ---------------        | -----------        |------
sellerRef            |   ref                  |  required          | n/a
amount               |   Number               |  required          | n/a
startDate            |   Date                 |                    | new Date()
endDate              |   Date                 |                    | n/a
isCanceled           |   Boolean              |                    | false


#### - Room model 

Key              |     Type               |  options           | default value
-------------    | ---------------        | -----------        |------
user1            |   ref                  |  required          | n/a
user2            |   ref                  |  required          | n/a
msgRef           |   ref                  |   required         | n/a



#### - Message model 
Key              |     Type               |  options           | default value
-------------    | ---------------        | -----------        |------
msgContent       |   String               |  required          | n/a
user1            |   ref                  |  required          | n/a
roomRef          |   ref                  |   required         | n/a




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
POST          | user          |`/SUBSCRIBE`                      |{amount, id  , userId}                                               | 200    |400
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
- [ Frontend Deployed Link. ](#slid)
- [ Backend Deployed Link. ](#slid)
- [ Frontend Repo ](https://github.com/MP-Project-Dorrah/client)
- [ Trello ](https://trello.com/b/bmMaTJII/mp-project-dorrah)
