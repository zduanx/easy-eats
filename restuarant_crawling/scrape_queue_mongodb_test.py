# -*- coding: utf-8 -*-
# url = "https://www.yelp.com/biz/false-idol-san-diego?rh_count=8"
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import cloudAMQP_client
import mongodb_client
sys.path.append(os.path.join(os.path.dirname(__file__), 'scraper'))
import page_scraper as ps

url = "https://www.yelp.com/biz/mada-sao-%E4%B9%B0%E6%B1%B0%E7%83%A7-%E9%A9%AC%E5%A4%A7%E5%AB%82-san-diego-3?rh_count=8"
ua = "Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)"

import json
import datetime
from pprint import pprint
ret = ps.scrape(url, 'test', ua)

print(json.dumps(ret, indent = 2, default=str))
print("page scrape passed!")

CLOUDAMQP_URL = ENV.YELP_INFO_TASK_QUEUE_URL
TEST_QUEUE_NAME = "test"

client = cloudAMQP_client.CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)

sentMsg = ret
client.sendMessage(sentMsg)

receivedMsg = client.getMessage()

assert sentMsg == receivedMsg
print("queue test passed!")


db = mongodb_client.get_db('test')
db.test.drop()
assert db.test.count() ==  0

db.test.replace_one({'identifier': receivedMsg['identifier']}, receivedMsg, upsert=True)
assert db.test.count() == 1

data = db.test.find({'url': url})
for val in data:
    pprint(val)
    pprint(val['created_at'])
    pprint(val['url'])

db.test.drop()
assert db.test.count() == 0
print('mongo db test passed')

