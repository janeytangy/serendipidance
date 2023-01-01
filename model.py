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
    # usertype_id = db.Column(db.Integer, db.ForeignKey("usertype.usertype_id"))
    usertype = db.Column(db.String, nullable=False)

    # ONLY FOR STUDIO TYPE USER
    sname = db.Column(db.String, nullable=False)
    # address = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False)
    # instagram = db.Column(db.String, nullable=False)

    userclass = db.relationship("UserClass", back_populates="user")
    # usertype = db.relationship("UserType", back_populates="users")
    class_event = db.relationship("ClassEvent", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id} fname={self.sname} lname={self.lname} email={self.email} usertype={self.usertype}>'
    
    def to_dict(self):
        return {'user_id': self.user_id,
                'fname': self.fname,
                'lname': self.lname,
                'email': self.email
                }

class ClassEvent(db.Model):
    """Dance Class Event"""

    __tablename__ = "class_event"

    class_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    start_date =  db.Column(db.DateTime, nullable=False)
    end_date =  db.Column(db.DateTime, nullable=False) 
    start_time =  db.Column(db.DateTime, nullable=False)
    end_time =  db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    style = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    instructor = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    class_instances = db.relationship("ClassInstance", back_populates="class_event")
    user = db.relationship("User", back_populates="class_event")

    def __repr__(self):
        return f'<ClassEvent classinst_id={self.class_id} user={self.user_id}>'


class ClassInstance(db.Model):
    """Dance Class Instance"""

    __tablename__ = "class_instance"

    classinst_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date =  db.Column(db.DateTime, nullable=False) 
    start_time =  db.Column(db.DateTime, nullable=False)
    end_time =  db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    style = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    instructor =  db.Column(db.String, nullable=False)
    studio =  db.Column(db.String, nullable=False)

    
    class_id = db.Column(db.Integer, db.ForeignKey("class_event.class_id"))

    userclass = db.relationship("UserClass", back_populates="class_instance")
    class_event = db.relationship("ClassEvent", back_populates="class_instances")

    def __repr__(self):
        return f'<ClassInstance classinst_id={self.classinst_id} date={self.date} level={self.level}>'

    def to_dict(self):
        return {'classinst_id': self.classinst_id,
                'date': self.date,
                'start_time': self.start_time,
                'end_time': self.end_time,
                'price': self.price,
                'style': self.style,
                'level': self.level,
                'instructor': self.instructor,
                'studio': self.studio}



# class UserTypeChoices(Enum):
#     STUDENT = 'Student'
#     INSTRUCTOR = 'Instructor'
#     STUDIO = 'Studio'
    
# class UserType(db.Model):
#     """User Type"""

#     __tablename__ = "usertype"

#     usertype_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     type_name = db.Column(db.Enum(UserTypeChoices,
#         values_callable=lambda x: [str(member.value) for member in UserTypeChoices]))
#     type_name = db.Column(db.String, nullable=False)

#     users = db.relationship("User", back_populates="usertype")

#     def __repr__(self):
#         return f'<UserType usertype_id={self.usertype_id} type_name={self.type_name}>'



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
        return f'<UserClass userclass_id={self.userclass_id} class_id={self.classinst_id} paid={self.paid}>'

    def to_dict(self):
        return {'classinst_id': self.classinst_id,
                'date': self.class_instance.date,
                'start_time': self.class_instance.start_time,
                'end_time': self.class_instance.end_time,
                'price': self.class_instance.price,
                'style': self.class_instance.style,
                'level': self.class_instance.level,
                'instructor': self.class_instance.instructor,
                'studio': self.class_instance.studio}





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