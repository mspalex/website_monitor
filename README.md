# Website monitoring application

This is a very simple web application to monitor the status of websites, built with the full *MEAN (Mongo,Express,Angular,Node)* application stack.

Features:
- Web interface to add, remove and edit websites to monitor,
- Monitor the HTTP Status Code of each site
- View the status of Keyword search on each site
- periodic server update of the information

- User cannot insert invalid information, such as malformed or empty fields
- websites that are not live cannot be inserted
-

Since i built this thing to be hosted on my home server, there are no logins or anything that resembles security measures.



### How to Install and Deploy

This app needs *MongoDB*, and *Node.js* with *Express* and a bunch of other packages that will be installed after cloning this repo.
The front-end library, *Angularjs*, is loaded from Google API from the client side.

Commands required to get the app running the first time, assuming that Node.js and MongoDB are in the same machine.
```bash
		sudo apt-get install mongodb
		sudo apt-get install nodejs
		npm -g install express

		# git clone ...
		cd <reponame>
		npm init # creates the folder node_modules
		npm install # install project dependencies

		# start the application
		npm start
```

How the Node connects with MongoDB on *localhost*
```javascript
		mongoose.connect('mongodb://localhost/site_monitordb');
```

Here is a sample image of the interface.

Index panel             |  Add new site Form
:-------------------------:|:-------------------------:
![](https://cloud.githubusercontent.com/assets/4175297/19244517/809576e2-8f14-11e6-8dbc-18ff92213baf.png)  |  ![](https://cloud.githubusercontent.com/assets/4175297/19244518/8097e17a-8f14-11e6-97c7-75484249e159.png)

## Built With

* Node-js - v5.6.0
* Express4 - 4.13.4
* Angular2 - 1.5.7
* MongoDB - 3.0.9

Node dependencies:
- valid-url https://www.npmjs.com/package/valid-url
- request
- node-schedule
- validator
- mongoose
- url

## Improvements

- get whois information to get remaining time of a domain register
- add logs and graphics to analyse them
    - monitor db size
- add multiple pages on each site
- add email alerts / periodic reports
