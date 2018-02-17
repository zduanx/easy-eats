"""cloud AMQP client""" # pylint: disable=invalid-name
import json
import pika

class CloudAMQPClient:
    """CloudAMQPClient class"""
    def  __init__(self, cloud_amqp_url, queue_name):
        """constructor"""
        self.cloud_amqp_url = cloud_amqp_url
        self.queue_name = queue_name
        self.parms = pika.URLParameters(cloud_amqp_url)
        self.parms.socket_timeout = 3
        self.connection = pika.BlockingConnection(self.parms)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)
        print("AMQP connected -> %s" % queue_name)

    # send a message
    def sendMessage(self, message):
        """send message"""
        self.channel.basic_publish(exchange='',
                                   routing_key=self.queue_name,
                                   body=json.dumps(message))
        print("[x] Sent message to %s:%s" % (self.queue_name, message))

    # get a message
    def getMessage(self):
        """get message"""
        method_frame, header_frame, body = self.channel.basic_get(self.queue_name) # pylint: disable=unused-variable
        return_value = None
        if method_frame:
            print("[x] Received message from %s:%s" %(self.queue_name, body))
            self.channel.basic_ack(method_frame.delivery_tag)
            return_value = json.loads(body.decode('utf-8'))
        else:
            # print("No message returned.")
            pass
        return return_value

    # A safer way to sleep than calling time.sleep() directly that would keep
    # the adapter from ignoring frames sent from the broker.
    # The connection will “sleep” or block the number of seconds specified
    # in duration in small intervals.
    def sleep(self, seconds):
        """sleep"""
        self.connection.sleep(seconds)