from flask import Blueprint, request
from ...models import User
from ..apiauthhelper import basic_auth
from flask_cors import cross_origin
from flask import Flask, redirect, request
import stripe

api = Blueprint('api', __name__)

stripe.api_key = 'sk_test_51MbYtpEPaPduL1FXGUEeJxraiNVcULkDhnBJouF8JG8iXRFrzSO0cxDnIuQGyYfCLxYt2e4iPqacAzh1ml3tY452008KRR106k'


YOUR_DOMAIN = 'http://localhost:3000'

@api.post('/create-checkout-session')
def create_checkout_session():
    data = request.form
    line_items = []
    print(data)
    for string,qty in data.items():
        name,price = string.split('__')
        line_items.append({
                'quantity':int(qty),
                'price_data': {
                    'currency':'USD',
                    'unit_amount':int(float(price)*100),
                    'product_data':{
                        'name':name,
                    }
                }
                
                
                
            })

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items= line_items,
            mode='payment',
            success_url=YOUR_DOMAIN + '/CartSuccess',

            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)


@api.route('/api/signup', methods=["POST"])
def signupAPI():
    data = request.json

    first_name = data['first_name']
    last_name = data['last_name']
    Address = data['Address']
    Zip_code = data['Zip_code']
    City = data['City']
    State = data['State']
    phone_number = data['phone_number']
    email = data['email']
    password = data['password']
            

            # add user to database
    user = User(first_name, last_name, Address, Zip_code, City, State, phone_number, email, password)

    user.saveToDB()

    return {
        'status': 'ok',
        'message': "Succesffuly created an account!"
    }


@api.route('/api/login', methods=["POST"])
@basic_auth.login_required
def getToken():
    user = basic_auth.current_user()
    return {
        'status': 'ok',
        'user': user.to_dict(),
    }