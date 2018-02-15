import os
import sys
import time
import random
import requests
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import crawling_server_client as client
sys.path.append(os.path.join(os.path.dirname(__file__), 'scraper'))
import url_scraper

import zip_codes_info
import food_generics_info

ZIP_CODES = zip_codes_info.zip_codes
FOOD_GENERICS = food_generics_info.food_generics

SOURCE_URL = "https://www.yelp.com"

USER_AGENTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'key', 'user_agents.txt')
USER_AGENTS = []

start_time = time.time()

with open(USER_AGENTS_FILE, 'rb') as uaf:
    for ua in uaf.readlines():
        if ua:
            USER_AGENTS.append(ua.strip()[1:-1])

random.shuffle(USER_AGENTS)

for zipcode in ZIP_CODES:
    for foodGene in FOOD_GENERICS:
        loc = SOURCE_URL + "/search?find_desc=" + foodGene + "&find_loc=" + str(zipcode)
        ua = random.choice(USER_AGENTS)
        urls = url_scraper.scrape(loc, ua)
        client.add_items(urls)
        time.sleep(ENV.SLEEP_CRAWLING_IN_SECONDS)

print("--- seed_crawler executed %s seconds ---" % (time.time() - start_time))