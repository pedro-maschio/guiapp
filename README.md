# guiapp

    <h1 class="text-center">User Guide (and also a developer guide)</h1>

    <h3>How to Run Locally</h3>
    <p class="text-justified">
        To properly functioning, you need to have Node and MySQL installed. You will need to create a 
        database named <strong>guiapress</strong>, don't add any table to it. After  doing this,
        download the project. Inside the project folder, open you terminal and type <strong>node install</strong>,
        this will install all dependencies necessary to running the system. Then go to <strong>/categories/Category.js</strong> and uncomment the line 15, then, 
        inside the project folder, run "node index.js". Stop the server with <kbd>Ctrl + C</kbd>. 
        After doing this, go to <strong>/articles/Article.js</strong> and uncomment the line 23. Then, do node index.js again
        on terminal. At this point, you can go to localhost:8081 on your browser.
    </p>
    <hr>
    <h3>Disclaimer</h3>
    <p class="text-justified">This project was done during the Covid-19 pandemic in the beginning of 2020 and it is not suitable for professional use, it was just for learning.  
        For proper using the system, you will need to create an account <a href="/admin/users/create" target="_blank">here</a>, then
        the user should log in into it through <a href="login" target="_blank">this link</a>, after choosing an email and password, the user should have access of all blog functionalities, that include:
        <ul>
            <a href="admin/articles" target="_blank"><li>Article Managing (register, update and delete)</li></a>
            <a href="admin/categories" target="_blank"><li>Category Managing (register, update and delete)</li></a>
        </ul>
        
        That's all. Best regards, Pedro.
    </p>
