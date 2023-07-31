# Home Library Service

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-272727?logo=nodedotjs&logoColor=339933)
![Nest.js](https://img.shields.io/badge/Nest.js-101010?logo=nestjs&logoColor=E0234E)

REST API where `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Run server locally

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Downloading

```sh
git clone git@github.com:sashua/nodejs2023Q2-service.git
```

### Installing NPM modules

```sh
npm install
```

### Running application

```sh
npm start
```

### Testing

After application running open new terminal and enter:

| Script                                 | Description                                     |
| :------------------------------------- | :---------------------------------------------- |
| `npm run test`                         | run all tests without authorization             |
| `npm run test -- <path to suite>`      | run only one of all test suites                 |
| `npm run test:auth`                    | run all test with authorization                 |
| `npm run test:auth -- <path to suite>` | run only specific test suite with authorization |

## Notes

This project was created as part of the _"Node.js"_ course

[Assignment description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)

[![RS School](https://img.shields.io/badge/RS_School-Node.js_2023Q2-F8E856?style=flat)](https://rs.school)
