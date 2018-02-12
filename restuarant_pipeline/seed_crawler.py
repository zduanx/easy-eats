import os
import sys
import random
import requests

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

for zipcode in ZIP_CODES:
    for foodGene in FOOD_GENERICS:
        loc = SOURCE_URL + "/search?find_desc=" + foodGene + "&find_loc=" + str(zipcode)
        print(loc)

ua = random.choice(USER_AGENTS)
result = us.scrape(ua, ZIP_CODES[0], FOOD_GENERICS[0])
print(result)