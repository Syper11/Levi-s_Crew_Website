from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin
from secrets import token_hex
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

class  User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    Address = db.Column(db.String(100), nullable=False)
    Zip_code = db.Column(db.Integer, nullable=False)
    City = db.Column(db.String(100), nullable=False)
    State = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(12), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    apitoken = db.Column(db.String)
    cart = db.relationship("Cart", lazy=True, cascade="all, delete")
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, first_name, last_name, Address, Zip_code, City, State, phone_number, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.Address = Address
        self.Zip_code =Zip_code
        self.City =City
        self.State =State
        self.phone_number =phone_number
        self.email = email
        self.password = generate_password_hash(password)
        self.apitoken = token_hex(16)

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'email' : self.email,
            'apitoken' : self.apitoken
        }
    
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, size,user_id, product_id):
        self.size = size
        self.user_id = user_id
        self.product_id = product_id
        

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()

    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    img_url = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10,2))
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    

    def __init__(self, product_name, img_url, price):
        self.product_name = product_name
        self.img_url = img_url
        self.price = price

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()

    def saveChanges(self):
        db.session.commit()

    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'img_url': self.img_url,
            'date_created': self.date_created,
            'price': self.price,
            'key': str(self.id) + (self.product_name)
        }
    
