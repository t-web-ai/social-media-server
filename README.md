# Social Meida Server

Implemented this project using mysql.
To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DATABASE_URL`
`JWT_ACCESS_SECRET`
`JWT_ACCESS_EXPIRE`
`JWT_REFRESH_SECRET`
`JWT_REFRESH_EXPIRE`
`BCRYPT_SALT_ROUND`
`DEFAULT_PAGE_LIMIT`
`MAX_PAGE_LIMIT`

https://imagekit.io/

`IMAGEKIT_PUBLIC_KEY`
`IMAGEKIT_PRIVATE_KEY`
`IMAGEKIT_URL_ENDPOINT`

## API Reference

#### Create a new user account

```text
   POST /auth/register
```

| Parameter  | Type     |
| :--------- | :------- |
| `username` | `string` |
| `password` | `string` |
| `email`    | `string` |

#### Log in and receive an access token

```text
   POST /auth/login
```

| Parameter  | Type     |
| :--------- | :------- |
| `email`    | `string` |
| `password` | `string` |

#### Profile

```text
  GET /users/me [ Bearer token is required ]
```

#### Refresh access token

```text
  GET /users/token/refresh [ Token cookie is required ]
```

#### Create a new post (JWT required)

```text
   POST /posts
```

| Parameter | Type                      |
| :-------- | :------------------------ |
| `content` | `string ( maximun 500 ) ` |
| `image`   | `file ( optional )`       |

#### List all posts with pagination support

```text
   GET /posts?page={number}&limit={number}
```

### Search posts with keyword

```text
   GET /posts/search?keyword={string}&page={number}&limit={number}
```

#### Retrieve a single post by ID

```text
   GET /posts/:id
```

#### Delete a post ( only the author can delete )

```text
   DELETE /posts/:id
```

#### Like a post

```text
   POST /posts/:id/like
```

#### Unlike a post

```text
   DELETE /posts/:id/like
```

#### Add comment to post

```text
   POST /posts/:id/comment
```

| Parameter | Type                     |
| :-------- | :----------------------- |
| `comment` | `string ( maximun 250 )` |

#### Get comments of a post with pagination support

```text
   GET /posts/:id/comments
```

#### Edit a comment

```text
   PATCH /comments/:id
```

| Parameter | Type                     |
| :-------- | :----------------------- |
| `comment` | `string ( maximun 250 )` |

#### Delete a comment

```text
   DELETE /comments/:id
```

## Tech Stack

`@prisma/client` `bcrypt` `cookie-parser` `dotenv` `express` `imagekit` `joi`
`jsonwebtoken` `multer` `mysql2` `prisma`

## Run Locally

Clone the project

```bash
  git clone https://github.com/t-web-ai/social-media-server
```

Go to the project directory

```bash
  cd social-media-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
