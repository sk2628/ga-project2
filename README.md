## Project 2 Readme

### Project Background

This is a simple app aim to keep track of user food and calories intake. It was developed using MVC pattern on Express and Node.JS framework. This app allow all basic CRUD functions; such as creating a meal intake, updating a meal intake, view meal intake and deleting a meal intake. This app cater for individual user, hence it has a login and sign-up features, only a logon user are allow to creating, editing or deleting the meal intake. User will only be able to access to the diet data belongs to themselves.

Finally, this app is published on Heroku cloud platform, making it accessible to the general public.

### CRUD Routes
This app adhere to the basic CRUD application design guidelines, which we have created 7 routes  in the main diet.controller. They are: 
| Route Name | URL | HTTP Verb | Description |
| ------ | ------ | ------ | ------ |
| Index | /diets | GET | Display a list of all meals
| New | /diets/new | GET | Show form to create new meal
| Create | /diets | POST | Add new meal to database, then redirect
| Show | /diets/:id | GET | Show info about one meal
| Edit | /diets/:id/edit | GET | Show edit form for one meal
| Update | /diets/:id | PUT | Updating a particular meal, then redirect
| Destroy | /diets/:id | DELETE | Delete a particular meal, then redirect

### Technologies 
| Type | Technology | 
| ------ | ------ | 
| Express | Framework | 
| Node.JS | JS Run-Time Environment | 
| MongoDB | NoSQL Database | 
| Mongoose | Object Data Modelling | 
| EJS | Front-end template language |
| Javascript | Front-End/Back-End | 
| CSS | Front-End | 
| Bootstrap | Front-End |
| Material Design | Front-End | 
| Heroku | Cloud App Hosting | 

The completed app is accessible via following link:
https://ga-seif-sg-dietapps.herokuapp.com/diets

### Screenshots
![image](https://i.ibb.co/xYLVFyR/Screenshot-2019-11-25-at-11-40-22-PM.png)
![image](https://i.ibb.co/p4t9yrC/Screenshot-2019-11-25-at-11-37-59-PM.png)
![image](https://i.ibb.co/GvzwhhG/Screenshot-2019-11-25-at-11-38-20-PM.png)

