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

# Create studios, store them in list to convert to set
studios_in_file = []

for dance in danceclass_data:

    # read data
    price, style, level, instructor, studio = (dance["price"],
        dance["style"],
        dance["level"],
        dance["instructor"],
        dance["studio"])

    studios_in_file.append((dance["studio"], dance["website"]))

    date = datetime.datetime.strptime(dance["date"], "%Y-%m-%d")
    start_time = datetime.datetime.strptime(dance["start_time"], "%H:%M %Z")
    end_time = datetime.datetime.strptime(dance["end_time"], "%H:%M %Z")

    danceclass_in_db.append(crud.create_classinstance(date, 
            start_time, end_time, price, style, level, instructor, studio))
    

model.db.session.add_all(danceclass_in_db)
model.db.session.commit()


# Create studio profiles

studios = set(studios_in_file)

studios_in_db = []

for i, studio in enumerate(studios):
    email = f'user{i}@test.com'
    password = 'test'
    studios_in_db.append(crud.create_user("", "", email, password, "studio", studio[0], studio[1]))


model.db.session.add_all(studios_in_db)
model.db.session.commit()