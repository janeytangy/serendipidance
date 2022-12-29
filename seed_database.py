"""
Seed the Database
"""

import os
import json
from random import choice, randint
import datetime

import crud
import model
import server

os.system("dropdb dance")
os.system("createdb dance")

model.connect_to_db(server.app)
model.db.create_all()

#Load dance class data from JSON file
with open("data/danceclass.json") as f:
    danceclass_data = json.loads(f.read())

# Create dance classes, store them in list so we can use them
danceclass_in_db = []

for dance in danceclass_data:

    # read data
    price, style, level, instructor, studio = (dance["price"],
        dance["style"],
        dance["level"],
        dance["instructor"],
        dance["studio"])

    date = datetime.datetime.strptime(dance["date"], "%Y-%m-%d")
    start_time = datetime.datetime.strptime(dance["start_time"], "%H:%M")
    end_time = datetime.datetime.strptime(dance["end_time"], "%H:%M")

    danceclass_in_db.append(crud.create_classinstance(date, 
            start_time, end_time, price, style, level, instructor, studio))
    

model.db.session.add_all(danceclass_in_db)
model.db.session.commit()


# model.db.session.commit()