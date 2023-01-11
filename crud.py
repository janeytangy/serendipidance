"""CRUD operations."""

from model import (db,
    User, UserClass,
    ClassInstance, 
    connect_to_db)

import datetime


# USER-RELATED

def create_user(fname, lname, email, password, usertype, sname, website):
    """Create and return a new user."""

    return User(fname=fname, lname=lname, email=email, password=password, usertype=usertype, sname=sname, website=website)
    
def get_user_by_id(user_id):
    """Return user info by id"""

    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user with inputted email"""

    return User.query.filter(User.email == email).first()

def get_classinstances_by_studio_id(user_id):
    """Return all class instances of a studio user id"""

    studios = ClassEvent.query.filter(ClassEvent.user_id==user_id).all()

    return {studio.classinst_id: studio.to_dict() for studio in studios}


# CLASS EVENT-RELATED

def create_classevent(start_date, end_date, start_time, end_time, price, style, level, instructor, studio, website, timedelta):
    """Create and return a new class event."""

    new_classes = []

    while True:
        date = start_date
        new_classes.append(create_classinstance(date, start_time, end_time, price, style, level, instructor, studio, website))
        new_date = start_date + timedelta
        start_date = new_date
        if start_date > end_date:
            break

    return new_classes


# CLASS INSTANCE-RELATED

def create_classinstance(date, start_time, end_time, price, style, level, instructor, studio, website):
    """Create and return a new class instance."""

    return ClassInstance(
        date=date, 
        start_time=start_time, 
        end_time=end_time,
        price=price,
        style=style,
        level=level,
        instructor=instructor, 
        studio=studio,
        website=website          
    )

def get_classinstances():
    """Returns all class instances"""

    return ClassInstance.query.all()

def get_class_instance_by_id(classinst_id):
    """Return class instance info by id"""

    return ClassInstance.query.get(classinst_id)

def get_class_instances_by_studio(user_id):
    """Return all class instances of a studio"""

    q = User.query.filter(User.user_id == user_id).first()

    studio_name = q.sname

    return ClassInstance.query.filter(ClassInstance.studio==studio_name).all()


# USERCLASS-RELATED

def create_userclass(user_id, classinst_id):
    """Create userclass"""
    return UserClass(user_id=user_id, classinst_id=classinst_id)

def get_classinstances_by_user_id(user_id):
    """Return all class instances of a user id"""

    userclasses = UserClass.query.filter(UserClass.user_id==user_id).all()

    return {userclass.classinst_id: userclass.to_dict() for userclass in userclasses}

def check_classinstance(user_id, class_id):
    """Checks if user already added a class"""

    userclass = UserClass.query.filter(UserClass.user_id==user_id, UserClass.classinst_id==class_id).all()

    if len(userclass) > 0:
        return True
    else:
        return False

def get_userclass_by_user_id(user_id, class_id):
    """Retrieve userclass by user and class ids"""

    return UserClass.query.filter(UserClass.user_id==user_id, UserClass.classinst_id==class_id).first()

def get_userclasses_by_class_id(class_id):
    """Retrieve all userclasses with a specific class_id"""

    return UserClass.query.filter(UserClass.classinst_id==class_id).all()
        

if __name__ == '__main__':
    from server import app
    connect_to_db(app)
