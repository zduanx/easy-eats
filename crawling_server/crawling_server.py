import os
import sys

from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV

SERVER_HOST = ENV.CRAWLING_SERVER_HOST
SERVER_PORT = ENV.CRAWLING_SERVER_PORT

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mysql_client as mc

db = mc.MySQLClient(ENV.MYSQL_HOST, ENV.MYSQL_PORT, ENV.MYSQL_USERNAME, ENV.MYSQL_PASSWORD, ENV.MYSQL_UNIX_SOCKET, ENV.MYSQL_DBNAME)

def add_items(urls):
    for url in urls:
        db.add_url(url)
    return

def delete_items(urls):
    for url in urls:
        db.delete_url(url)
    return

def count_items():
    return db.get_row_count()

# Threading HTTP Server
RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add_items, 'add_items')
RPC_SERVER.register_function(delete_items, 'delete_items')
RPC_SERVER.register_function(count_items, 'count_items')

print("Starting HTTP server on %s:%d" % (SERVER_HOST, SERVER_PORT))

RPC_SERVER.serve_forever()
