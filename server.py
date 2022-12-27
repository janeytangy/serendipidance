"""Server for dance class scheduling app"""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import User, connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = "serendipity"


@app.route("/")
def homepage():
    """Homepage"""

    return render_template("homepage.html")

@app.route("/<path>")
def dashboard(path):
    """Dashboard"""
    
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
                "usertype": user.usertype
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
    email = request.json.get('email')
    password = request.json.get('password')

    user = crud.get_user_by_email(email)

    if user:
        return jsonify({'error': 'Sorry, that email is already being used. Please try again with a different email.' }), 401
    elif usertype =="" or fname=="" or lname=="" or email=="" or password=="":
        return jsonify({'error': 'Please complete all fields.'}), 400
    else:
        user = crud.create_user(fname, lname, email, password, usertype)
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

# @app.route('/api/users')
# def get_users():
#     users = User.query.all()
#     return jsonify({user.user_id: user.to_dict() for user in users})

@app.route('/<user_id>', methods= ['POST'])
def add_class_to_schedule(user_id):
    """Create userclass instance"""

    user_id = user_id
    class_id = request.json.get('class_id')

    if crud.check_classinstance(user_id, class_id):
        return "", "401 You've already added this class."
    else:
        userclass = crud.create_userclass(user_id, class_id)
        db.session.add(userclass)
        db.session.commit()
        return redirect("/")


@app.route('/api/<user_id>')
def get_schedule_by_user_id(user_id):
    """View schedule by user id"""

    userclasses = crud.get_classinstances_by_user_id(user_id)

    return jsonify(userclasses)

@app.route('/<user_id>/<class_id>', methods= ['POST'])
def remove_class(user_id, class_id):
    """Remove class for user"""

    userclass = crud.get_userclass(user_id, class_id)

    db.session.delete(userclass)
    db.session.commit()

    return redirect("/")




if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)