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

- **Podman:** A container management tool that serves as an alternative to Docker, used to run and manage containers in a more secure and rootless way.
- **Laravel:** A PHP framework for building web applications. It is used in the backend to manage routes, databases, authentication, and more.
- **React:** A JavaScript library for building user interfaces, particularly single-page applications (SPA). Used in the frontend for interactive UI components.
- **MySQL:** A relational database management system used for storing and managing data, including client and test information.
- **HTML/CSS/JavaScript:** Core web technologies used for the frontend structure and styling.
- **Bootstrap:** A popular CSS framework used to speed up frontend development and ensure responsive design.
- **Composer:** A PHP dependency manager, essential for managing Laravel packages and libraries.
- **NPM: JavaScript** package managers used for managing frontend dependencies like React and other JavaScript libraries.
- **Node.js:** JavaScript runtime environment used to run the React application.
- **Git:** Version control system to manage project code and enable collaboration.

## Installation Guide

### Composer and Laravel
``` 
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### NPM
``` 
sudo apt install nodejs npm

npm install
```

### Database
Installation MySQL:
``` 

```

.evn settings:
``` 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Migration
``` 
php artisan migrate
```
### React
``` 
composer require laravel/breeze --dev
php artisan breeze:install react

npm install
```

### Launch
Run in terminal:
``` 
php artisan server
npm run dev
```
