import os
import sys
import time

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import INFO
import mysql_client as mc

db = mc.MySQLClient(INFO.MYSQL_HOST, INFO.MYSQL_PORT, INFO.MYSQL_USERNAME, INFO.MYSQL_PASSWORD, INFO.MYSQL_UNIX_SOCKET, INFO.MYSQL_DBNAME)

import zip_codes_info
import food_generics_info

zip_codes = zip_codes_info.zip_codes
food_generic = food_generics_info.food_generics
print(db)
print(zip_codes)
print(food_generic)


