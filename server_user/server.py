from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
import os
import sys
import requests

sys.dont_write_bytecode = True

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV

USER_SERVER_HOST = ENV.USER_SERVER_HOST
USER_SERVER_PORT = ENV.USER_SERVER_PORT

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mongodb_client
from bson.json_util import dumps

TABLE_NAME = ENV.USER_TABLE_NAME
DB_NAME = ENV.USER_DB_NAME

app = Flask(__name__)
CORS(app)

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route('/')
def hello():
   return 'hello world'

@app.route('/userlocation', methods=['POST'])
def record_user_location():
    data  = request.get_json()
    if 'email' not in data or 'address' not in data or 'location' not in data:
        raise InvalidUsage("Invalid input", status_code=400)
    
    db = mongodb_client.get_db(DB_NAME)
    try:
        db[TABLE_NAME].replace_one({'email': data['email']}, data, upsert=True)
    except Exception as err:
        raise InvalidUsage("No id found", status_code=404)
    
    return jsonify(data)

@app.route('/getuserlocation', methods=['POST'])
def get_user_info():
    data = request.get_json()
    if 'email' not in data:
        raise InvalidUsage("Invalid input", status_code=400)
    
    db = mongodb_client.get_db(DB_NAME)
    try:
        result = dumps(db[TABLE_NAME].find_one({'email': data["email"]}))
        if result != "null":
            data = result
    except Exception as err:
        pass

    return jsonify(data)

if __name__ == '__main__':
    port = USER_SERVER_PORT
    app.run(port=port, threaded=True, debug=True)