# Project - SafeWalk

## Description

This is a full-stack application that allows users to find and add warnings about the safest routes in cities.

## Installation

1. Clone the repository

```bash
git clone
```

2. Install the dependencies

```bash
npm install
```

3. Create a .env file in the root folder and add the following environment variables:

```bash
PORT=3001
ORIGIN= http://localhost:3000
```

4. Run the server to develop locally

```bash
npm run dev
```




# API Routes

//AQUÍ IRÍAN EL RESTO DE RUTAS GENERALES?




## **User routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /safemap                    | GET               | [safemap]                         | Get Safemap with all the warnings|

| /contributions              | GET               | [contributions]                   | Your contributions to the SafeMap |

## **Auth routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /auth/signup                | POST              | [signup]                          | Create a new user             |
| /auth/login                 | POST              | [login]                           | Log user in                   |

## **Upload routes**:   

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /safemap/:added             | POST              | [safemap/:added]                  | Warning added on the SafeMap 
                                                                                        and prior contributions list  |
| /safemap                    | POST              | [safemap]                         | Send coordinates and input 
                                                                                        through Safemap
                                                                                        
                                                                                        
                                                                                        
                                                                                         