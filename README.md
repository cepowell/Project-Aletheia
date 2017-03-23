### What is Project Aletheia
---
In the United States, approximately 19\% of women and 6\% of men will be sexually assaulted while attending college or university. Federal legislation currently exists to protect the rights of survivors and to regulate how school administrations respond to and handle complains of sexual assault, but such legislation is not always adequate. Survivors of campus sexual assault are frequently unaware of how to report their assaults, disbelieved or mistreated by campus officials, re-traumatized by the disciplinary process, and subjected to marginalizing reactions from campus communities after disclosure of their assaults. And although existing technological interventions can offer online reporting options to survivors and mobile safety tools to potential victims, no application yet exists that allows survivors from the same institution to discuss the reporting process on their campus, suggest local resources, share their stories anonymously, and offer emotional support to one another.  Aletheia, a web-based application built using the JavaScript MEAN stack, fills these gaps by offering student users the ability to share resources and stories with other survivors on their campuses. It also encourages transparency on the part of the university by tallying up and displaying all assaults reported on a given campus through the application.   

### Using Project Aletheia
---
You can access the working prototype at [URL](https://www.google.com).

### Developing for Project Aletheia
---

1. Download repository and install Node.JS
2. Navigate to the root directory and run `npm install`
3. Install MongoDB and create a database called _aletheiadb_
4. In a new terminal window, run the `mongod` command
5. To start the server, run `npm start` and navigate to _localhost:3000_ in your browser
6. To run unit tests, run `karma start`. To re-run tests after updating the test code, just save the test code. The tests will re-run automatically.
7. To lint JavaScript via gulp, run `gulp`. Add gulp tasks to the gulpfile as needed to minify, concatenate, or preprocess.

### Credits
---
Developed and created by Cait Powell. Submitted in partial fulfillment of the requirements for the degree of Master of Arts in Interdisciplinary Computer Science at Mills College, April 2017.
