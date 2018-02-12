import requests
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../..', 'key'))
import ENV

GET_URL_XPATH = """//span[@class="indexed-biz-name"]/*/@href"""

def get_headers(user_agent):
    headers = {
        "Connection": "close",
        "User-Agent": user_agent
    }
    return headers

def scrape(user_agent, generic, location):
    print(get_headers(user_agent))
    return [user_agent, generic, str(location)]