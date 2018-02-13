import requests
import sys
import os
import time
from lxml import html

sys.path.append(os.path.join(os.path.dirname(__file__), '../..', 'key'))
import ENV


GET_URL_XPATH = """//span[@class="indexed-biz-name"]/*/@href"""

def get_headers(user_agent):
    headers = {
        "User-Agent": user_agent
    }
    return headers

def scrape(url, user_agent):
    urls = []

    try:
        for x in range(0, 21, 10):
            postfix = "&start=" + str(x)
            newurl = url + postfix
            print(">>> crawling: " + newurl)
            session_request = requests.session()
            response = session_request.get(newurl, headers=get_headers(user_agent))

            tree = html.fromstring(response.content)
            vals = tree.xpath(GET_URL_XPATH)
            if not vals:
                break
            
            urls.extend(vals)
            time.sleep(ENV.SLEEP_CRAWLING_IN_SECONDS)
    except Exception as err:
        print("<<< ERROR: " + str(err))
    
    urls = list(set(urls))
    
    return list(map(lambda x:x.split("?")[0], urls))