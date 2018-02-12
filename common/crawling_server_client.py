import jsonrpclib
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV
URL = "http://" + ENV.CRAWLING_SERVER_HOST + ":" + str(ENV.CRAWLING_SERVER_PORT)

client = jsonrpclib.ServerProxy(URL)

def add_items(urls):
    client.add_items(urls)
    return

def delete_items(urls):
    client.delete_items(urls)
    return

def count_items():
    return client.count_items()