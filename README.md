# MyDiary-Andela
MyDiary is an online journal where users can pen down their thoughts and feelings..

[![Build Status](https://travis-ci.com/Ntare22/MyDiary-Andela.svg?branch=develop)](https://travis-ci.com/Ntare22/MyDiary-Andela)
[![Coverage Status](https://coveralls.io/repos/github/Ntare22/MyDiary-Andela/badge.svg?branch=develop)](https://coveralls.io/github/Ntare22/MyDiary-Andela?branch=develop)
<a href="https://codeclimate.com/github/Ntare22/MyDiary-Andela/maintainability"><img src="https://api.codeclimate.com/v1/badges/9e615974dd614fe3736d/maintainability" /></a>


## Postman Tests
https://documenter.getpostman.com/view/9333876/SW12zHKd

## Link to the UI
- [github-pages link](https://ntare22.github.io/MyDiary-Andela/ui/)

## Server or API Tools and Technologies
> - [NodeJS](https://nodejs.org/) which is a JavaScript Runtime Environment
> - [ExpressJs](https://expressjs.com/) which is an unopinionated and minimalistic  Web Application Framework for node.js
> - `ESlint` for code linting
> - `Babel` for code transpiring from ES5 to ES6
> - [Mocha](https://mochajs.org/) which is as a JavaScript testing framework
> - [Chai](http://www.chaijs.com/) which is A BDD / TDD assertion library

## Required App Features
- Users can create an account
- User can sign in 
- Users can view all entries to their diary
- Users can view the contents of a diary entry
- Users can add entry
- Users can add or modify an entry
- Users can delete an entry

## API Endpoints

| Endpoint                    | Functionality        |
| --------------------------- | -------------------- |
| POST `/auth/signup`         | user signup      |
| POST `/auth/signin`          | user signin         |
| GET `/entries`              | Get all entries      |
| GET `/entries/:entryId`    | Get specific entry   |
| POST `/entries`             | Add Entry      |
| PATCH `/entries/:entryId`  | Modify Entry      |
| DELETE `/entries/:entryId` | Delete entry      |

### Author
Name :  Jim Ntare

Email : jim.ntare@gmail.com
