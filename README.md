<picture>
<img alt="serendipidance" src="/static/img/serendipidance.png">
</picture>
<p>
Serendipidance is a web app that provides a platform for dance students to schedule classes to take and dance studios to schedule classes to offer. The goal of the app is to consolidate and display all of the dance classes that are currently being offered by participating studios so that students can always find the information they need in one place. Student and studio users will have personalized views of their schedules where studios can effeectively offer or cancel classes, and students can easily add or remove classes from their customized training schedules.
</p>

<hr>

<h3>Contents</h3>
<ul>
<li><a href="#tech">Tech Stack</a></li>
<li><a href="#feat">Features</a></li>
<li><a href="#upcoming">Upcoming Feature</a></li>
<li><a href="#install">Installation</a></li>
</ul>

<hr>

<h3 id="tech">Tech Stack</h3>
<ul>
<li>Python</li>
<li>Flask</li>
<li>Javascript</li>
<li>jQuery</li>
<li>PostgreSQL</li>
<li>SQLAlchemy ORM</li>
<li>HTML</li>
<li>CSS</li>
<li>Bootstrap</li>
</ul>

<hr>

<h3 id="feat">Features</h3>
<h4>All Classes</h4>
<p>
Serendipidance serves as a hub to view all upcoming classes offered by participating studios in hopes of encouraging the users to discover new classes, instructors, and studios that join the dance community. Users can click on the names to visit the websites of the studios.
<picture>
<img alt="feature1" src="https://j.gifs.com/36XNYO.gif">
</picture>
<h4>Create A User</h4>
<p>
When creating an account, a new user can choose to be a student or a studio. New studio users will be required to provide a website so that students will always have access to additional studio information.
</p>
<picture>
<img alt="feature2" src="https://j.gifs.com/lRg18g.gif">
</picture>
<h4>Students</h4>
<p>
Student users have a personalized schedule view where they can add classes that interests them from the hub. The schedule acts as a planner for the students to allow for flexibility in their time management; thus, the add button does not automatically enroll the students in the dance class. The schedule view also assists the students in keeping track of the total cost of their classes as well as any classes that they've previously taken. 
</p>
<picture>
<img alt="feature3" src="https://j.gifs.com/gpE073.gif">
</picture>
<h4>Studios</h4>
<p>
Studio users can offer more classes to the hub by completing the form in their schedule view. They have the option of adding one-time or weekly classes, and can cancel classes by removing them from their schedule. The studio schedule also keeps track of current and past classes offered.
</p>
<picture>
<img alt="feature4" src="https://j.gifs.com/mqj579.gif">
</picture>


<hr>

<h3 id="upcoming">Upcoming Features</h3>
<p>
For the next round of features, Serendipidance will have an instructor user type that includes the option for instructors to provide video and social media references of their style. Students will also be able to "like" and "comment" on classes so that instructors and studios can view the performance for each class.
</p>

<hr>

<h3 id="install">Installation</h3>
<p>To run Serendipidance:</p>
<ol>
    <li>Clone or fork this repository</li>
    <li>Create and activate a virtual environment:</li>
    ~~~
    virtualenv env
    source env/bin/activate
    ~~~
    <li>Install the dependencies:</li>
    ```
    pip install -r requirements.txt
    ```
    <li>Create and seed the database:</li>
    ```
    python3 seed_database.py
    ```
    <li>Run the app:</li>
    ```
    python3 server.py
    ```
    <li>Navigate to http://localhost:5000/ and enjoy!</li>
</ol>