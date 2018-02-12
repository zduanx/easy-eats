import mysql_client as mc
import os
import sys
import time

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV

def basic_test1():
    db = mc.MySQLClient(ENV.MYSQL_HOST, ENV.MYSQL_PORT, ENV.MYSQL_USERNAME, ENV.MYSQL_PASSWORD, ENV.MYSQL_UNIX_SOCKET, ENV.MYSQL_DBNAME)
    db.disconnect()
    print("basic_test1 passed")

def basic_test2():
    db = mc.MySQLClient(ENV.MYSQL_HOST, ENV.MYSQL_PORT, ENV.MYSQL_USERNAME, ENV.MYSQL_PASSWORD, ENV.MYSQL_UNIX_SOCKET, ENV.MYSQL_DBNAME)
    db.readall()
    db.add_url("1234")
    print(db.get_row_count())
    db.readall()
    db.delete_url("1234")
    print(db.get_row_count())
    db.disconnect()
    print("basic_test2 passed")

def basic_test3():
    db = mc.MySQLClient(ENV.MYSQL_HOST, ENV.MYSQL_PORT, ENV.MYSQL_USERNAME, ENV.MYSQL_PASSWORD, ENV.MYSQL_UNIX_SOCKET, ENV.MYSQL_DBNAME)
    db.delete_url("111")
    db.add_url("111")
    db.readall()
    db.update_hashcode("1111", "hashcode")
    db.update_hashcode("111", "hashcode")

    # db.delete_url("111")
    db.disconnect()
    print("basic_test3 passed")

def basic_test4():
    db = mc.MySQLClient(ENV.MYSQL_HOST, ENV.MYSQL_PORT, ENV.MYSQL_USERNAME, ENV.MYSQL_PASSWORD, ENV.MYSQL_UNIX_SOCKET, ENV.MYSQL_DBNAME)
    db.delete_url("111")
    db.delete_url("222")
    db.delete_url("333")
    db.delete_url("444")
    db.add_url("111")
    db.add_url("222")
    db.add_url("333")
    db.add_url("444")
    db.update_hashcode("333", "hashcode")
    db.update_hashcode("444", "hashcode")
    db.readall()

    time.sleep(1)
    urls = db.get_jobs()
    print(urls)
    assert urls == ['111', '222']

    db.update_hashcode("111", "hash")
    db.update_hashcode("222", "hash")


    db.disconnect()
    print("basic_test4 passed")


if __name__ == "__main__":
    basic_test1()
    # basic_test2()
    # basic_test3()
    basic_test4()