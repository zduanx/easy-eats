from cloudAMQP_client import CloudAMQPClient
import os
import sys
import time

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'key'))
import ENV

CLOUDAMQP_URL = ENV.YELP_INFO_TASK_QUEUE_URL
TEST_QUEUE_NAME = "test"

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sentMsg = {"test": "test"}
    client.sendMessage(sentMsg)

    receivedMsg = client.getMessage()

    assert sentMsg == receivedMsg
    print("test_basic passed!")

if __name__ == "__main__":
    test_basic()
