"""Server for dance class scheduling app"""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db, db
import crud

app = Flask(__name__)
# app.secret_key = "serendipity"


"""Insert Code"""


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)