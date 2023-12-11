# API Documentation - Air Rent Room

This document provides an overview of the API endpoints and their usage for our service.

### 1. Available endpoints for **_CMS Admin_**

- [**_POST_** /register](#1-post-register)
- [**_POST_** /login](#1-post-register)
- [**_POST_** /googleSignIn](#1-post-register)
- [**_GET_** /lodgings](#1-post-register)
- [**_POST_** /lodgings](#1-post-register)
- [**_DELETE_** /lodgings/:id](#1-post-register)
- [**_PATCH_** /lodgings/:id](#1-post-register)
- [**_PUT_** /lodgings/:id](#1-post-register)
- [**_GET_** /lodgings/:id](#1-post-register)

* [**_GET_** /types](#1-post-register)
* [**_POST_** /types](#1-post-register)
* [**_DELETE_** /types/:id](#1-post-register)

- [**_GET_** /logs](#1-post-register)
- [**_POST_** /logs](#1-post-register)

### 2. Available endpoints for **_Public_**

- [**_POST_** /public/register](#1-post-register)
- [**_POST_** /public/login](#1-post-register)
- [**_POST_** /public/googleLogin](#1-post-register)

* [**_GET_** /public/lodgings](#1-post-register)

- [**_POST_** /public/bookmark](#1-post-register)
- [**_POST_** /public/bookmark/:id](#1-post-register)

&nbsp;

<!-- ## 1. POST /register -->

## 1. POST /register

#### Request - Body

```json
{
  "email": "string",
  "password": "string"
}
```

<details>
<summary>
Click here for Response
</summary>

#### Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

</details>

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /movies

Description:

- Get all movie from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Venom: Let There Be Carnage",
    "overview": "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
    "rating": 8.1,
    "poster": "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"
  },
  {
    "id": 2,
    "title": "Halloween Kills",
    "overview": "Minutes after Laurie Strode, her daughter Karen and granddaughter Allyson left masked monster Michael Myers caged and burning in Laurie's basement, Laurie is rushed to the hospital with life-threatening injuries, believing she finally killed her lifelong tormentor.",
    "rating": 7.4,
    "poster": "https://image.tmdb.org/t/p/w500/qmJGd5IfURq8iPQ9KF3les47vFS.jpg"
  }
  ...,
]
```

&nbsp;

## 4. DELETE /movies/:id

Description:

- Delete movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Movie has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
