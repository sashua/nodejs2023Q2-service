# Home Library Service

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-272727?logo=nodedotjs&logoColor=339933)
![Nest.js](https://img.shields.io/badge/Nest.js-101010?logo=nestjs&logoColor=E0234E)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)

REST API where `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Run application

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

### 1. Clone the repository and go to the directory

```sh
git clone git@github.com:sashua/nodejs2023Q2-service.git
```

### 2. Go to the project directory

```sh
cd nodejs2023Q2-service
```

### 3. Switch to `dev` branch and create `.env` file

```sh
git checkout dev
cp .env.example .env
```

### 4. Run docker containers

```sh
docker-compose up
```

To stop running containers execute the following command

```sh
docker-compose down
```

### \* Testing

After application running open new terminal and enter

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
