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
def login(path):
    """Login"""

    return render_template("homepage.html")

@app.route("/create", methods=['POST'])
def create_account():
    """Create New Account"""

    fname = request.get_json(force=True).get('fname')
    lname = request.get_json(force=True).get('lname')
    email = request.get_json(force=True).get('email')
    password = request.get_json(force=True).get('password')

    print('*'*35)
    print('fname=', fname, ' lname=', lname, ' email=', email, ' password=', password)

    user = crud.get_user_by_email(email)

    if user:
        flash('Sorry, that email is already being used. Please try again with a different email.')
    else:
        user = crud.create_user(fname, lname, email, password)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, your account has been created and you can now login!')

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