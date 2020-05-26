# Instagram_Clone

> Image social network for peoples

This is a MERN stack application. It is a small social network app that includes authentication, posts and notifications.

## Demo Live

### The App is live at [Netlify.com](https://tuong-instagram.netlify.app)

### The API is live at [Heroku.com](https://be-instagram.herokuapp.com)

---

# Functionality

## Auth

- Register user (Send email to verify)
- Confirmation email (Verify email)
- Login user
- Get logged in user
- Resend email to verify (If user miss email to verify)
- Forgot password (Send email to reset password)
- Reset password
- Prevent access Profile, Posts if not verify email

## Profile

- Update info
- Change password (Require current password)
- Change email (Require current password & send email to verify)
- Update avatar

## Posts

- Create post (upload photo)
- Get posts
- Get single post
- Delete post (if owner)
- Like & Unlike post
- Comment post
- Delete comment post (if owner)
- Get all posts of user logged in
- Get posts by user ID

## Notifications

- Get notifications when friends like or comment
- Mark read & unread notification
- Clear notification
- Mark all as read notifications
- Clear all notifications

---

# Quick Start

### Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_URI>",
  "jwtSecret: "secret",
  "SMTP_HOST": "",
  "SMTP_PORT": "",
  "SMTP_USER": "",
  "SMTP_PASSWORD": ""
}
```

### Install server dependencies

```
npm install
```

### Install client dependencies

```
cd client
npm install
```

### Run both Express & React from root

```
npm run dev
```

### Debug server

```
npm run debug
```

### Build for production

```
cd client
npm run build
```

---

## App Info

### Author

Tuong Huynh

### Version

1.0.0

### License

This project is licensed under the MIT License
