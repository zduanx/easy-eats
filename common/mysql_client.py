import pymysql
import datetime
import time
import random

class MySQLClient:
    """
    SQL client driver

    Attributes:
        conn (:obj): database connection
        cur (:obj): database cursor
        table_name (str): default table_name
        job_limit (int): reload job limit
        COMMAND_* (str): SQL query command
    """
    def __init__(self, host, port, username, password, unix_socket, db):
        """
        Args:
            host (str): MySQL host name
            port (str): MySQL port name
            username (str): MySQL username
            password (str): MySQL password
            unix_socket (str): unix_socket directory
            db (str): default db name
        """

        self.conn = pymysql.connect(host=host, port=port, user=username, unix_socket=unix_socket, passwd=password, db=db, autocommit=True)
        self.cur = self.conn.cursor()
        self.table_name = "crawler"
        self.job_limit = 50
        self.COMMAND_insert = "INSERT INTO " + self.table_name + " (url, available_time) values (%s, NOW())"
        self.COMMAND_delete = "DELETE FROM " + self.table_name + " WHERE url = %s"
        self.COMMAND_rowcount = "SELECT COUNT(*) FROM " + self.table_name
        self.COMMAND_updatehashcode = "UPDATE " + self.table_name + " SET status = 'idle', available_time = ADDDATE(NOW(), %s), hashcode = %s WHERE url = %s"
        self.COMMAND_setallidle = "UPDATE " + self.table_name + " SET status = 'idle', marker = 0, available_time = NOW()"
        self.COMMAND_lockjobs = "UPDATE " + self.table_name + " SET status = 'working', marker = %s WHERE status = 'idle' AND available_time < NOW() ORDER BY available_time LIMIT " + str(self.job_limit) 
        self.COMMAND_queryjobs = "SELECT url FROM " + self.table_name + " WHERE marker = %s"
        self.COMMAND_cleanupjobs = "UPDATE " + self.table_name + " SET marker = 0 WHERE marker = %s"

    def add_url(self, url):        
        """
        Note:
            add one url item to db

        Args:
            url: url path

        Returns:
            void
        """

        try:
            self.cur.execute(self.COMMAND_insert, (url))
            print(">>> ITEM %s inserted" % (url))
        except (pymysql.err.ProgrammingError) as e1:
            print("!!! ERROR: " + str(e1))
        except (pymysql.err.IntegrityError) as e2:
            print("<<< Integrity: " + str(e2))

    def delete_url(self, url):
        """
        Note:
            delete one url item from db

        Args:
            url (str): url path

        Returns:
            void
        """
        try:
            self.cur.execute(self.COMMAND_delete, url)
            print(">>> ITEM %s deleted" % (url))
        except Exception as err:
            print("<<< " + str(err))

    def set_all_idle(self):
        """
        Note:
            set all row with idle status

        Args:
            void

        Returns:
            void
        """
        try:
            self.cur.execute(self.COMMAND_setallidle)
            print(">>> All row status set to ->idle<-")
        except Exception as err:
            print("<<< " + str(err))

    def get_jobs(self):
        """
        Note:
            reload 50 jobs when requested
            select from earliest 50 available idle jobs
            change status idle -> working

        Args:
            void

        Returns:
            list of strings
        """
        rand = random.randint(1, 30000)
        urls = []
        try:
            self.cur.execute(self.COMMAND_lockjobs, (rand))
            self.cur.execute(self.COMMAND_queryjobs, (rand))
            urls = [row[0] for row in self.cur]
            self.cur.execute(self.COMMAND_cleanupjobs, (rand))
        except Exception as err:
            print("<<< " + str(err))

        return urls

    def update_hashcode(self, url, hashcode):
        """
        Note:
            update hashcode for one item
            set status from working -> idle
            EVOLVE: exponential back-off

        Args:
            url (str): url path
            hashcode (str): hashcode

        Returns:
            void
        """
        try:
            self.cur.execute(self.COMMAND_updatehashcode, (7, hashcode, url))
            print(">>> UPDATE for url: %s; status: idle" % (url))
        except Exception as err:
            print("<<< " + str(err))

    def get_cursor(self):
        return self.cur

    def readall(self):
        self.cur.execute("SELECT * FROM crawler")
        print("-------------------- start read all ------------------------")
        for row in self.cur:
            print(row)
        print("-------------------- end read all ------------------------")

    def get_row_count(self):
        self.cur.execute(self.COMMAND_rowcount)
        ret = 0
        for row in self.cur:
            ret = row[0]
        return ret

    def _get_current_time(self):
        return time.strftime('%Y-%m-%d %H:%M:%S')
    
    def _string_to_datetime(self, string):
        return datetime.datetime.strptime(string, '%Y-%m-%d %H:%M:%S')
    
    def _datetime_to_string(self, datetime_object):
        return datetime_object.strftime('%Y-%m-%d %H:%M:%S')

    def disconnect(self):
        self.cur.close()
        self.conn.close()