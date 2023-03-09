from flask import Blueprint, request
from ...models import Product, Cart, User
from ..apiauthhelper import basic_auth_required, token_auth_required, basic_auth, token_auth

shop = Blueprint('shop', __name__)


@shop.route('/api/all_products')
def getProducts():
    products = Product.query.all()
    
    return {
        'status': 'ok',
        'totalResults': len(products),
        'products': [p.to_dict() for p in products]
    }


@shop.post('/api/cart/add')
@token_auth.login_required
def addToCartAPI():
    data = request.json
    user = token_auth.current_user()

    
    product_id = data['productId']
    product = Product.query.get(product_id)

    size = data['selectedSize']

    

    c = Cart( size, user.id, product_id)
    c.saveToDB()
    
    return {
    'status': 'ok',
    'message': f'Successfully added "{product.product_name}" in size "{size}" to your cart!'
}

@shop.get('/api/cart/get')
@token_auth.login_required
def getCartAPI():
    user = token_auth.current_user()
    my_cart = user.cart
    cart = [Product.query.get(c.product_id).to_dict() for c in my_cart]
    for i in range(len(cart)):
        cart[i]["size"] = my_cart[i].size

    return {
        'status': 'ok',
        'cart': cart
    }

@shop.post('/api/cart/remove')
@token_auth.login_required
def removeFromCartAPI():
    data = request.json
    user = token_auth.current_user()

    product_id = data['productId']
    size = data['size']

    c = Cart.query.filter_by( size=size, user_id=user.id, product_id=product_id).first()
    print(c)
    c.deleteFromDB()
    
    return {
        'status': 'ok',
        'message': f'Succesfully removed {size} from cart!'
    }