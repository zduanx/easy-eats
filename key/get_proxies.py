# copied from http://pythongui.com/free-live-proxies-scraping-python/
from bs4 import BeautifulSoup as b
import lxml
import urllib.request as urllib
import time
import requests
import json
import re
import os

OUTPUT = "proxies.txt"
LOCAL_IP = "70.95.170.19"
REGEX = r".*" + LOCAL_IP + ".*"

def grabProxies():
    os.remove(OUTPUT)
    site = 'https://www.us-proxy.org/'
    hdr = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.Request(site,headers=hdr) #sending requests with headers
    url = urllib.urlopen(req).read() #opening and reading the source code
    html = b(url,"lxml")                #structuring the source code in proper format
    rows = html.findAll("tr")       #finding all rows in the table if any.
    proxies = []
    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text for ele in cols]
        try:
            ipaddr = cols[0]        #ipAddress which presents in the first element of cols list
            portNum = cols[1]       #portNum which presents in the second element of cols list
            proxy = ipaddr+":"+portNum  #concatinating both ip and port
            try:
                session_request = requests.session()
                prox = {"http": str(proxy)}
                dict = json.loads(re.sub('\n', '', session_request.get('http://httpbin.org/ip', proxies=prox, timeout=1).content.decode('utf-8')))
                if(re.match(REGEX, dict["origin"])):
                    raise Exception("original ip found")
                print("-----------------------------")
                print(dict["origin"])
                print("proxy tested and added: " + str(proxy))
                proxies.append(str(proxy)) #if yes then it appends the proxy with https
            except:
                pass
        except:
            pass
    file_handle = open(OUTPUT, 'w')
    for j in proxies:
        file_handle.write("%s\n" % j)
    file_handle.close()

grabProxies()