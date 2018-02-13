
url = "https://www.yelp.com/search?find_desc=spanish&find_loc=92111"
ua = "Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)"

import url_scraper as us

ret = us.scrape(url, ua)
print(ret)