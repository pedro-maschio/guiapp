# guiapp

# User Guide (and also a developer guide)

## How to Run Locally
To properly functioning, you need to have Node and MySQL installed. You will need to create a 
database named **guiapress**, don't add any table to it. After  doing this,
download the project. Inside the project folder, open you terminal and type **node install**,
this will install all dependencies necessary to running the system. Then go to **/categories/Category.js** and uncomment the line 15, then, 
inside the project folder, run "node index.js". Stop the server with Ctrl + C. 
After doing this, go to **/articles/Article.js** and uncomment the line 23. Then, do node index.js again
on terminal. At this point, you can go to localhost:8081 on your browser.

## Disclaimer
This project was done during the Covid-19 pandemic in the beginning of 2020 and it is not suitable for professional use, it was just for learning.  
For proper using the system, you will need to create an account in **localhost:8081/admin/users/create**, then the user should log in into it through **localhost:8081/login**, after choosing an email and password, the user should have access of all blog functionalities, that include:
    - Article Managing (register, update and delete)
        - in /admin/articles
    - Category Managing (register, update and delete)</li></a>
        - in /admin/categories

That's all.
