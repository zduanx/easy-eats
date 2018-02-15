"""mongo db client"""
from pymongo import MongoClient
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV

MONGO_DB_HOST = ENV.MONGO_DB_HOST
MONGO_DB_PORT = ENV.MONGO_DB_PORT

DB_NAME = ENV.YELP_DB_NAME

CLIENT = MongoClient(MONGO_DB_HOST, MONGO_DB_PORT)

def get_db(db=DB_NAME): # pylint: disable=invalid-name
    """get database"""
    db = CLIENT[db]
    return db
