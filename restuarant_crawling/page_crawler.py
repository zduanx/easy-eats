# url = "https://www.yelp.com/biz/false-idol-san-diego?rh_count=8"
import os
import sys
import random

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import cloudAMQP_client
import crawling_server_client as client
import operations

sys.path.append(os.path.join(os.path.dirname(__file__), 'scraper'))
import page_scraper as ps


import json
import datetime
from pprint import pprint

SOURCE_URL = "https://www.yelp.com"

CLOUDAMQP_URL = ENV.YELP_INFO_TASK_QUEUE_URL
CLOUDAMQP_NAME = ENV.YELP_INFO_TASK_QUEUE_NAME

cloudAMQP_client = cloudAMQP_client.CloudAMQPClient(CLOUDAMQP_URL, CLOUDAMQP_NAME)

USER_AGENTS = operations.get_user_agents()

while True:
    jobs = client.get_jobs()
    if jobs is None:
        cloudAMQP_client.sleep(ENV.SLEEP_SCRAPING_IN_SECONDS)
        continue
    
    for url in jobs:
        loc = SOURCE_URL + url + "?rh_count=8"
        ua = random.choice(USER_AGENTS)

        """ start page scraping """
        ret = ps.scrape(loc, url, ua)
        if ret == {}:
            print("!!! FATAL ERROR")
            sys.exit()

        cloudAMQP_client.sendMessage(ret)
        client.update_hashcode(url, ret['hashcode'])

        cloudAMQP_client.sleep(ENV.SLEEP_SCRAPING_IN_SECONDS)
    
    cloudAMQP_client.sleep(ENV.SLEEP_SCRAPING_IN_SECONDS)
