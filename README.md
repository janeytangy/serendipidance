![serendipidance](/static/img/serendipidance.png)
<p>
Serendipidance is a web app that provides a platform for dance students to schedule classes to take and dance studios to schedule classes to offer. The goal of the app is to consolidate and display all of the dance classes that are currently being offered by participating studios so that students can always find the information they need in one place. Student and studio users will have personalized views of their schedules where studios can effeectively offer or cancel classes, and students can easily add or remove classes from their customized training schedules.
</p>
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
<img alt="feature1" src="/static/img/feature1.gif">
<h4>Create A User</h4>
<p>
When creating an account, a new user can choose to be a student or a studio. New studio users will be required to provide a website so that students will always have access to additional studio information.
</p>
<img alt="feature2" src="/static/img/feature2.gif">
<h4>Students</h4>
<p>
Student users have a personalized schedule view where they can add classes that interests them from the hub. The schedule acts as a planner for the students to allow for flexibility in their time management; thus, the add button does not automatically enroll the students in the dance class. The schedule view also assists the students in keeping track of the total cost of their classes as well as any classes that they've previously taken. 
</p>
<img alt="feature3" src="/static/img/feature3.gif">
<h4>Studios</h4>
<p>
Studio users can offer more classes to the hub by completing the form in their schedule view. They have the option of adding one-time or weekly classes, and can cancel classes by removing them from their schedule. The studio schedule also keeps track of current and past classes offered.
</p>
<img alt="feature4" src="/static/img/feature4.gif">

<hr>

<h3 id="upcoming">Upcoming Features</h3>
<p>
For the next round of features, Serendipidance will have an instructor user type that includes the option for instructors to provide video and social media references of their style. Students will also be able to "like" and "comment" on classes so that instructors and studios can view the performance for each class.
</p>

<hr>

<h3 id="install">Installation</h3>
<h4>To run Serendipidance:</h4>
Clone or fork this repository:

```
https://github.com/janeytangy/serendipidance
```

Create and activate a virtual environment:
```
virtualenv env
source env/bin/activate
```
Install the dependencies:
```
pip install -r requirements.txt
```
Create and seed the database:
```
python3 seed_database.py
```
Run the app:
```
python3 server.py
```
Navigate to http://localhost:5000/ and have fun!