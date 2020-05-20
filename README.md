# Instagram_Clone

> Image social network for peoples

This is a MERN stack application. It is a small social network app that includes authentication, posts and notifications.

## Demo Live

### The App is live at [Heroku.com]()

### The API is live at [getpostman.com](https://documenter.getpostman.com/view/6870044/Szt5gXEP?version=latest)

---

# Quick Start

### Add a default.json file in config folder with the following

Create account https://mailtrap.io/ to get SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD

```
{
  "mongoURI": "<your_mongoDB_URI>",
  "jwtSecret: "secret",
  "default_avatar": "<your_link>",
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
