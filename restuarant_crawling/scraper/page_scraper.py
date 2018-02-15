GET_ADDRESS_XPATH = """//div[@class="mapbox-text"]//address/text()"""
GET_WEBSITE_XPATH = """//div[@class="mapbox-text"]//span[contains(@class, "biz-website")]/a/text()"""
GET_PHONE_XPATH = """//div[@class="mapbox-text"]//span[contains(@class, "biz-phone")]/text()"""
GET_REVIEW_HIGHLIGHT = """//div[@class="review-highlights-content"]//p"""
GET_STAR_RATING = """//div[contains(@class, "rating-info")]//div[contains(@class, "i-stars")]//@title"""
GET_REVIEW_COUNT = """//div[contains(@class, "rating-info")]//span[contains(@class, "review-count")]/text()"""
GET_KEY_WORDS = """//div[contains(@class, "biz-page-header")]//div[@class="price-category"]//span[@class="category-str-list"]"""
GET_HOURS = """//div[contains(@class, "biz-hours")]//table//tr/td[@class=""]"""

SCRAPER = [
    ["address", GET_ADDRESS_XPATH],
    ["website", GET_WEBSITE_XPATH],
    ["phone", GET_PHONE_XPATH],
    ["reviews", GET_REVIEW_HIGHLIGHT],
    ["rating", GET_STAR_RATING],
    ["count", GET_REVIEW_COUNT],
    ["keywords", GET_KEY_WORDS],
    ["hours", GET_HOURS]
]

import requests
import sys
import os
import time
from lxml import html

sys.path.append(os.path.join(os.path.dirname(__file__), '../..', 'key'))
import ENV

def get_headers(user_agent):
    headers = {
        "User-Agent": user_agent
    }
    return headers

def scrape(url, user_agent):
    info = {}

    try:
        session_request = requests.session()
        response = session_request.get(url, headers=get_headers(user_agent))

        tree = html.fromstring(response.content)

        for name, xpathstr in SCRAPER:
            vals = tree.xpath(xpathstr)
            if vals:
                print(name)    
                print(xpathstr)
                print(vals)
                info[name] = vals
        
    except Exception as err:
        print("<<< ERROR: " + str(err))
    
    return info