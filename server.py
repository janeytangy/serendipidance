"""Server for dance class scheduling app"""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db, db
import crud
import datetime
import os

app = Flask(__name__)


@app.route("/")
def homepage():
    """Homepage"""

    return render_template("homepage.html", secret=os.environ["DANCE"])

@app.route("/<path>")
def schedule(path):
    """Schedule"""
    
    return render_template("homepage.html")


@app.route("/login", methods=['POST'])
def login():
    """Login"""

    email = request.json.get('email')
    password = request.json.get('password')

    user = crud.get_user_by_email(email)

    if user:
        if user.password == password:
            session['user'] = user.user_id
            return jsonify({
                "id": user.user_id,
                "fname": user.fname,
                "lname": user.lname,
                "email": user.email,
                "password": user.password,
                "usertype": user.usertype,
                "sname": user.sname,
                "website": user.website
            })

        else:
            return "", "401 Incorrect password."

    else:
        return "", "401 Incorrect username & password."


@app.route("/logout", methods=['POST'])
def logout():
    """Logout"""
    
    session.pop('user', None)

    return redirect("/")
    

@app.route("/create", methods=['POST'])
def create_account():
    """Create New Account"""

    fname = request.json.get('fname')
    lname = request.json.get('lname')
    usertype = request.json.get('usertype')
    sname = request.json.get('sname')
    website = request.json.get('website')
    email = request.json.get('email')
    password = request.json.get('password')

    user = crud.get_user_by_email(email)

    if user:
        return jsonify({'error': 'Sorry, that email is already being used. Please try again with a different email.' }), 401
    else:
        user = crud.create_user(fname, lname, email, password, usertype, sname, website)
        db.session.add(user)
        db.session.commit()
        return jsonify({
                "id": user.user_id,
                "email": user.email
            })
    

@app.route('/api/classinstances')
def get_class_instances():
    classinstances = crud.get_classinstances()

    return jsonify({classinstance.classinst_id: classinstance.to_dict() for classinstance in classinstances})


# SCHEDULE - Student Usertype

@app.route('/<user_id>', methods= ['POST'])
def add_class_to_schedule(user_id):
    """Create userclass instance"""

    user_id = user_id
    class_id = request.json.get('class_id')

    if crud.check_classinstance(user_id, class_id):
        # return "", "401 You've already added this class."
        return class_id
    else:
        userclass = crud.create_userclass(user_id, class_id)
        db.session.add(userclass)
        db.session.commit()
        return redirect("/")


@app.route('/api/<user_id>')
def get_schedule_by_user_id(user_id):
    """View schedule by student user id"""

    userclasses = crud.get_classinstances_by_user_id(user_id)

    return jsonify(userclasses)

@app.route('/<user_id>/<class_id>', methods= ['POST'])
def remove_class(user_id, class_id):
    """Remove class for student user"""

    userclass = crud.get_userclass_by_user_id(user_id, class_id)

    db.session.delete(userclass)
    db.session.commit()

    return redirect("/")


# SCHEDULE - Studio Usertype

@app.route('/studio/<user_id>', methods= ['POST'])
def add_classinstance_to_schedule(user_id):
    """Create new class instance"""
    
    start_date = datetime.datetime.strptime(request.json.get('start_date'), "%Y-%m-%d")
    end_date = datetime.datetime.strptime(request.json.get('end_date'), "%Y-%m-%d")
    start_time = datetime.datetime.strptime(request.json.get('start_time') + ' PST', "%H:%M %Z")
    end_time = datetime.datetime.strptime(request.json.get('end_time') + ' PST', "%H:%M %Z")
    price = request.json.get('price')
    style = request.json.get('style')
    level = request.json.get('level')
    instructor = request.json.get('instructor')
    sname = request.json.get('sname')
    website = request.json.get('website')
    timedelta = datetime.timedelta(days=7)

    new_classes = crud.create_classevent(start_date, end_date, start_time, end_time, price, style, level, instructor, sname, website, timedelta)

    db.session.add_all(new_classes)
    db.session.commit()
    return redirect("/")

@app.route('/api/studio/<user_id>')
def get_schedule_by_studio_id(user_id):
    """View schedule by studio user id"""

    studio_classes = crud.get_class_instances_by_studio(user_id)

    return jsonify({studio_class.classinst_id: studio_class.to_dict() for studio_class in studio_classes})

@app.route('/studio/<user_id>/<class_id>', methods= ['POST'])
def remove_studio_class(user_id, class_id):
    """Remove class for studio user"""

    classinstance = crud.get_class_instance_by_id(class_id)
    userclasses = crud.get_userclasses_by_class_id(class_id)

    for userclass in userclasses:
        db.session.delete(userclass)

    db.session.delete(classinstance)
    db.session.commit()

    return redirect("/")



if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)