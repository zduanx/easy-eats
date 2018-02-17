# -*- coding: utf-8 -*-
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import cloudAMQP_client
import mongodb_client

import json
import datetime
from pprint import pprint

CLOUDAMQP_URL = ENV.YELP_INFO_TASK_QUEUE_URL
CLOUDAMQP_NAME = ENV.YELP_INFO_TASK_QUEUE_NAME

TABLE_NAME = ENV.YELP_TABLE_NAME
DB_NAME = ENV.YELP_DB_NAME

cloudAMQP_client = cloudAMQP_client.CloudAMQPClient(CLOUDAMQP_URL, CLOUDAMQP_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        return
    print(">>> DB_SAVER: msg received:")
    pprint(msg)

    db = mongodb_client.get_db(DB_NAME)
    db[TABLE_NAME].replace_one({'identifier': msg['identifier']}, msg, upsert=True)
    return

while True:
    if cloudAMQP_client is not None:
        msg = cloudAMQP_client.getMessage()
        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print(e)
                pass

        cloudAMQP_client.sleep(ENV.SLEEP_SCRAPING_IN_SECONDS)
