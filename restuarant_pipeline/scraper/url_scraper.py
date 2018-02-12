import requests

def get_headers(user_agent):
    headers = {
        "Connection": "close",
        "User-Agent": user_agent
    }
    return headers

def scrape(user_agent, generic, location):
    print(get_headers(user_agent))
    return [user_agent, generic, str(location)]