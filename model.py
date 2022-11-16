"""Models for dance schedule app."""

from collections import UserString
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum

db = SQLAlchemy()


class User(db.Model):
    """User"""

    __tablename__ = "user"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    usertype_id = db.Column(db.Integer, db.ForeignKey("usertype.usertype_id"))

    # ONLY FOR STUDIO TYPE USER
    address = db.Column(db.String, nullable=True)
    website = db.Column(db.String, nullable=True)

    # ONLY FOR INSTRUCTOR TYPE USER
    instagram = db.Column(db.String, nullable=True, unique=True)

    userclass = db.relationship("UserClass", back_populates="user")
    usertype = db.relationship("UserType", back_populates="user")
    class_event = db.relationship("ClassEvent", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id} fname={self.fname} lname={self.lname} email={self.email}>'


class DanceStyles(Enum):
    KPOP = 'K-Pop'
    HIP HOP = 'Hip Hop'
    FOUNDATIONS = 'Foundations'

class DanceLevels(Enum):
    ALL = 'All Levels'
    BEGINNER = 'Beginner'
    INTERMEDIATE = 'Intermediate'
    ADVANCED = 'Advanced'
    MASTER = 'Master'

class ClassEvent(db.Model):
    """Dance Class Event"""

    __tablename__ = "class_event"

    class_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    start_date =  db.Column(db.DateTime, nullable=False)
    end_date =  db.Column(db.DateTime, nullable=False) 
    start_time =  db.Column(db.DateTime, nullable=False)
    end_time =  db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    style = db.Column(db.Enum(DanceStyles))
    level = db.Column(db.Enum(DanceLevels))

    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    class_instance = db.relationship("ClassInstance", back_populates="class_event")
    user = db.relationship("User", back_populates="class_event")


class ClassInstance(db.Model):
    """Dance Class Instance"""

    __tablename__ = "class_instance"

    classinst_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date =  db.Column(db.DateTime, nullable=False) 
    start_time =  db.Column(db.DateTime, nullable=False)
    end_time =  db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    style = db.Column(db.Enum(DanceStyles))
    level = db.Column(db.Enum(DanceLevels))

    # remove after implementing usertype conditions
    instructor =  db.Column(db.String, nullable=False)
    studio =  db.Column(db.String, nullable=False)
    
    
    class_id = db.Column(db.Integer, db.ForeignKey("class_event.class_id"))

    userclass = db.relationship("UserClass", back_populates="class_instance")
    class_event = db.relationship("ClassEvent", back_populates="class_instance")

    def __repr__(self):
        return f'<ClassInstance classinst_id={self.classinst_id} type_name={self.type_name}>'



class UserTypeChoices(Enum):
    STUDENT = 'Student'
    INSTRUCTOR = 'Instructor'
    STUDIO = 'Studio'
    
class UserType(db.Model):
    """User Type"""

    __tablename__ = "usertype"

    usertype_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type_name = db.Column(db.Enum(UserTypeChoices,
        values_callable=lambda x: [str(member.value) for member in UserTypeChoices]))

    user = db.relationship("User", back_populates="usertype")

    def __repr__(self):
        return f'<UserType usertype_id={self.usertype_id} type_name={self.type_name}>'



class UserClass(db.Model):
    """User Class"""

    __tablename__ = "userclass"

    userclass_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    paid = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))
    classinst_id = db.Column(db.Integer, db.ForeignKey("class_instance.classinst_id"))

    user = db.relationship("User", back_populates="userclass")
    class_instance = db.relationship("ClassInstance", back_populates="userclass")

    def __repr__(self):
        return f'<UserClass userclass_id={self.userclass_id} class_id={self.class_id} paid={self.paid}>'





def connect_to_db(flask_app, db_uri="postgresql:///dance", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

     
    connect_to_db(app)