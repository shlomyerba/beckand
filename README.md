# Castor Template Service

The 'Template' service is a template service for all services in Castor.

## What does the project include?

- Service based Expressjs, TypeScript.
- DB of mysql with [Sequelize ORM v6](https://sequelize.org/master/manual/typescript.html).
- Environment variables based [Nodemon](https://nodemon.io/).

# Installation Guide

If you want to create a new service, you need to clone the template and expand it.

## Get the template

Clone the project to your computer.

```
git clone git@bitbucket.org:liozassa/service-template.git
```

## Template Setup

1. Install all the NPM packages.

```
npm i install
```

2. Create DB for the project, run the script in your DB management.

```
CREATE SCHEMA `template`;
```

3. Create nodemon.json file and add this code inside

```json
{
  "env": {
    "NODE_ENV": "development",
    "SERVICE_NAME": "template",
    "WHITE_LIST_DOMAIN": "http://localhost:3000",
    "DB_HOST": "localhost",
    "DB_NAME": "template",
    "DB_USER": "root",
    "DB_PASSWORD": "12345678",
    "DB_PORT": "3306",
    "DB_DRIVER": "mysql",
    "PORT": "8080"
  }
}
```

## Template Running

Run the project and check all work well.

```
npm run dev
```

## Template Using

Set the repository to your repository and expand your new service.

## Contact Me

If you have any questions or suggestions, please [send me mail](mailto:lioz@3dcastor.com)
