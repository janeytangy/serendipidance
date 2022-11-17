"""Server for dance class scheduling app"""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import ClassInstance, connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = "serendipity"


@app.route("/")
def homepage():
    """Homepage"""

    return render_template("homepage.html")

@app.route('/api/classinstances')
def get_class_instances():
    classinstances = ClassInstance.query.all()
    return jsonify({classinstance.classinst_id: classinstance.to_dict() for classinstance in classinstances})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)