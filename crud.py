"""CRUD operations."""

from model import (db,
    User, UserClass,
    ClassEvent, ClassInstance, 
    connect_to_db)


# USER-RELATED

def create_user(fname, lname, email, password, usertype, sname, website):
    """Create and return a new user."""

    return User(fname=fname, lname=lname, email=email, password=password, usertype=usertype, sname=sname, website=website)

# def get_users():
#     """Returns all users"""

#     return User.query.all()
    
def get_user_by_id(user_id):
    """Return user info by id"""

    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user with inputted email"""

    return User.query.filter(User.email == email).first()


# CLASS EVENT-RELATED

def create_classevent(start_date, end_date, start_time, end_time, price, style, level):
    """Create and return a new class event."""

    return ClassEvent(
        start_date=start_date, 
        end_date=end_date, 
        start_time=start_time, 
        end_time=end_time,
        price=price,
        style=style,
        level=level
    )

def get_classevent():
    """Returns all class events"""

    return ClassEvent.query.all()


# CLASS INSTANCE-RELATED

def create_classinstance(date, start_time, end_time, price, style, level, instructor, studio):
    """Create and return a new class instance."""

    return ClassInstance(
        date=date, 
        start_time=start_time, 
        end_time=end_time,
        price=price,
        style=style,
        level=level,
        instructor=instructor, 
        studio=studio           
    )

def get_classinstances():
    """Returns all class instances"""

    return ClassInstance.query.all()

def get_class_instance_by_id(classinst_id):
    """Return class instance info by id"""

    return ClassInstance.query.get(classinst_id)


# USERTYPE-RELATED

# def create_usertype(type_name):
#     """Create usertypes"""

#     return UserType(type_name=type_name)


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

def get_userclass(user_id, class_id):
    """Retrieve userclass by user and class ids"""

    return UserClass.query.filter(UserClass.user_id==user_id, UserClass.classinst_id==class_id).first()
        

if __name__ == '__main__':
    from server import app
    connect_to_db(app)
