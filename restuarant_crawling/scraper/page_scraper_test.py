# -*- coding: utf-8 -*-
url = "https://www.yelp.com/biz/false-idol-san-diego?rh_count=8"
# url = "https://www.yelp.com/biz/mada-sao-%E4%B9%B0%E6%B1%B0%E7%83%A7-%E9%A9%AC%E5%A4%A7%E5%AB%82-san-diego-3?rh_count=8"
# ua = "Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)"
# url = "https://www.yelp.com/biz/amame-desserts-san-diego-6?rh_count=8"
ua = "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/534.14 (KHTML, like Gecko) Ubuntu/10.10 Chromium/9.0.600.0 Chrome/9.0.600.0 Safari/534.14"
proxies = "207.237.127.13:3128"
url = "https://www.yelp.com/biz/shaka-hawaiian-grinds-la-mesa?rh_count=8"
import page_scraper as ps
import json

ret = ps.scrape(url, url, ua, proxies)

print(json.dumps(ret, indent = 2))
print("page scrape passed!")
