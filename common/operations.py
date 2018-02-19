import os
import sys
import random

def get_user_agents():
    USER_AGENTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'key', 'user_agents.txt')
    USER_AGENTS = []

    with open(USER_AGENTS_FILE, 'rb') as uaf:
        for ua in uaf.readlines():
            if ua:
                USER_AGENTS.append(ua.strip()[1:-1])

    random.shuffle(USER_AGENTS)
    return USER_AGENTS

def get_proxies():
    PROXIES_FILE = os.path.join(os.path.dirname(__file__), '..', 'key', 'proxies.txt')
    PROXIES = []

    with open(PROXIES_FILE, 'r') as pf:
        for p in pf.readlines():
            if p:
                PROXIES.append(p.strip())

    random.shuffle(PROXIES)
    return PROXIES