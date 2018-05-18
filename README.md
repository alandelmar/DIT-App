# DIT-App
iOS app developed for the staff and students of the Dublin Institute of Technology.
Main features include geolocational data, database searches and third-party API's

To view this app on a device or Xcode simulator do the following steps:

1. Turn on server (I used MAMP)

2. Administer the database file to the sever, naming the schema collegeData

3. Import the file collegeDatabase.sql and administer the database to the server. By default, the DB user is root and the DB password is root. This has not been changed.

4. Drag and drop the folder named php into the server. All calls to the PHP files within the final packaged Cordova project point to http://localhost:8888/php/[FILE NAME]

5. Find the Xcode project file called HelloCordova.xcodeproj to open the project in Xcode, then run the simulator. The app is optimised for the iPhone 6s and upwards, but adapts to all iOS screen sizes

Sample student login:
Username: 123
Password: password1

Sample lecturer login:
Username: 123001
Password: password6
