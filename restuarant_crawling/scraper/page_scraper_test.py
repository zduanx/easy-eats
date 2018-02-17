# -*- coding: utf-8 -*-
# url = "https://www.yelp.com/biz/false-idol-san-diego?rh_count=8"
url = "https://www.yelp.com/biz/mada-sao-%E4%B9%B0%E6%B1%B0%E7%83%A7-%E9%A9%AC%E5%A4%A7%E5%AB%82-san-diego-3?rh_count=8"
ua = "Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)"

import page_scraper as ps
import json

ret = ps.scrape(url, ua)

print(json.dumps(ret, indent = 2, default=str))
print("page scrape passed!")
