<p align="center"><img src="public/images/Logo_Progym_bez pozadia.png"></p>


## About Application
Web application for a Fitness Center for Diagnostic Testing and Client Data Analysis

- Identification and analysis of the key requirements for a fitness center application, including client management, collection of diagnostic data, and analytical functions.
- Examination of available solutions on the market focusing on client diagnostic testing. Analysis of their features, advantages, and shortcomings.
- Design of a data model for the application, which includes the structure of data related to clients, diagnostic tests, and analysis results, as well as the definition of relationships between entities.
- Technical design of the application, including user interfaces for trainers and clients, and design of backend solutions for data processing and storage.
- Implementation of the application according to the proposed technical plan. Verification of the application’s functionality using test data and evaluation of its ability to process and analyze diagnostic data.

## Using

This project utilizes the following technologies and tools:

- **Laravel:** A PHP framework for building web applications. It is used in the backend to manage routes, databases, authentication, and more.
- **React:** A JavaScript library for building user interfaces, particularly single-page applications (SPA). Used in the frontend for interactive UI components.
- **MySQL:** A relational database management system used for storing and managing data, including client and test information.
- **Composer:** A PHP dependency manager, essential for managing Laravel packages and libraries.
- **NPM: JavaScript** package managers used for managing frontend dependencies like React and other JavaScript libraries.
- **Git:** Version control system to manage project code and enable collaboration.

## Installation Guide for LINUX (I used UBUNTU WSL on Windows)
Youtube tutorial for installing LINUX on Windows:
https://www.youtube.com/watch?v=HrAsmXy1-78&ab_channel=LogicLambda
### Composer and Laravel Installation on UBUNTU
``` 
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo apt update
```


### NPM install
Use in local terminal (in PHPStorm):
``` 
npm install
```

### .env
Use in terminal:
``` 
cp .env.example .env
composer install
```

### Copy to .env

.evn settings:
``` 
APP_NAME='PROGYM Diagnostika'
APP_ENV=local
APP_KEY=base64:R+V17UTS4oJy//bZzmoRGjlbE7LX44JmHMTgvmywDOQ=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=progym_db
DB_USERNAME=user
DB_PASSWORD=password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

```

### Migration & Seeders
``` 
php artisan migrate
php artisan db:seed
```

### Launch
Run in terminal:
``` 
php artisan serve
npm run dev
```

### In Browser:
App URL: localhost:8000

Email login for example client:
``` 
client@example.com
```

Email login for example trainer:
```
trainer@example.com
```

Email login for example admin:
```
admin@example.com
```


Password for all:
```
password
```

