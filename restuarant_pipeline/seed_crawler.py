import os
import sys
import random
import requests

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mysql_client as mc

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import INFO

db = mc.MySQLClient(INFO.MYSQL_HOST, INFO.MYSQL_PORT, INFO.MYSQL_USERNAME, INFO.MYSQL_PASSWORD, INFO.MYSQL_UNIX_SOCKET, INFO.MYSQL_DBNAME)

import zip_codes_info
import food_generics_info

ZIP_CODES = zip_codes_info.zip_codes
FOOD_GENERICS = food_generics_info.food_generics

SOURCE_URL = "https://www.yelp.com"

USER_AGENTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'key', 'user_agents.txt')
USER_AGENTS = []

with open(USER_AGENTS_FILE, 'rb') as uaf:
    for ua in uaf.readlines():
        if ua:
            USER_AGENTS.append(ua.strip()[1:-1])

random.shuffle(USER_AGENTS)

sys.path.append(os.path.join(os.path.dirname(__file__), 'scraper'))
import url_scraper as us

ua = random.choice(USER_AGENTS)
result = us.scrape(ua, ZIP_CODES[0], FOOD_GENERICS[0])
print(result)