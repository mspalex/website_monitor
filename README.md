# Website monitoring application

This is a very simple web application to monitor the status of websites, built with the full *MEAN (Mongo,Express,Angular,Node)* application stack.

Features:
- Web interface to add, remove and edit websites to follow,
- Monitor the HTTP Status Code of each site
- View the status of Keyword search on each site

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
		npm install # installs the dependencies

		# start the application
		npm start
```

How the Node connects with MongoDB on *localhost*
```javascript
		mongoose.connect('mongodb://localhost/site_monitordb');
```

Here is a sample image of the interface.

![website_mon_screenshot](https://cloud.githubusercontent.com/assets/4175297/19132525/c461e04e-8b4b-11e6-85b2-c00d4740bfe3.png)

## Built With

* Node-js - v5.6.0
* Express4 - 4.13.4
* Angular2 - 1.5.7
* MongoDB - 3.0.9

## Improvements

- get whois information to get remaining time of a domain register
- add logs and graphics to analyse them
    - monitor db size
- add multiple pages on each site
- add email alerts / periodic reports
