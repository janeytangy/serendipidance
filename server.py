"""Server for dance class scheduling app"""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import ClassInstance, User, connect_to_db, db
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
                "email": user.email
            })

        else:
            return jsonify({'error': 'Incorrect password.' }), 401

    else:
        return jsonify({'error': 'Incorrect username & password.' }), 401


    

@app.route("/create", methods=['POST'])
def create_account():
    """Create New Account"""

    fname = request.json.get('fname')
    lname = request.json.get('lname')
    email = request.json.get('email')
    password = request.json.get('password')

    user = crud.get_user_by_email(email)

    if user:
        return jsonify({'error': 'Sorry, that email is already being used. Please try again with a different email.' }), 401
    else:
        user = crud.create_user(fname, lname, email, password)
        db.session.add(user)
        db.session.commit()
        return jsonify({
                "id": user.user_id,
                "email": user.email
            })

    return redirect("/")

    

@app.route('/api/classinstances')
def get_class_instances():
    classinstances = ClassInstance.query.all()
    return jsonify({classinstance.classinst_id: classinstance.to_dict() for classinstance in classinstances})

@app.route('/api/users')
def get_users():
    users = User.query.all()
    return jsonify({user.user_id: user.to_dict() for user in users})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)