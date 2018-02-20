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

GEO_SERVER_HOST = ENV.GEO_SERVER_HOST
GEO_SERVER_PORT = ENV.GEO_SERVER_PORT

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
import API_KEY
GOOGLE_API_KEY = API_KEY.GOOGLE_API

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mongodb_client
from bson.objectid import ObjectId
from bson.json_util import dumps

TABLE_NAME = ENV.YELP_TABLE_NAME
DB_NAME = ENV.YELP_DB_NAME

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

@app.route('/geoencode', methods=['GET'])
def get_geo_location():
    loc = request.args.get('location')
    if loc is None:
        raise InvalidUsage("Invalid input", status_code=400)
    
    session_request = requests.session()
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + loc + "&components=country:US&key=" + GOOGLE_API_KEY
    try:
        response = json.loads(session_request.get(url).text)
        print(response)
        if response["status"] != "OK":
            raise Exception("err")

    except Exception:
        raise InvalidUsage("Invalid input", status_code=400)

    result = {}
    result["location"] = response["results"][0]["geometry"]
    result["address"] = response["results"][0]["formatted_address"]
    return jsonify(result)

if __name__ == '__main__':
    port = GEO_SERVER_PORT
    app.run(port=port, threaded=True, debug=True)