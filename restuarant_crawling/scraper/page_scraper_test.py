
url = "https://www.yelp.com/biz/false-idol-san-diego?rh_count=8"
ua = "Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)"

import page_scraper as ps
import json

ret = ps.scrape(url, ua)
for key, val in ret:
    print(key)
    print(val)
print(json.dumps(ret, indent = 2))
    