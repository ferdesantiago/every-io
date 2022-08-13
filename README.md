Instructions:
This project consist of 2 containers, please execute them in the next order:
1) Database: Under database folder. MySQL database with its schema ready (user and password for database is root)
    docker build -t my_db .
    docker run -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 my_db
2) Application: Under application folder. Logic of all the application
    docker compose -f docker-compose-dev.yml up
    npm run dev

You can run tests under the application folder executing:
    npm run test

You can also check the API library at postman by importing the following link:
    https://www.getpostman.com/collections/045999df53094b09ed04

Any questions feel free to contact me: desantiagofer.02@gmail.com
