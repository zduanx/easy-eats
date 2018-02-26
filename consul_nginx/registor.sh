#!/bin/bash

# master
sudo ./consul agent -server -bootstrap-expect 1 -data-dir /var/lib/consul -config-dir /etc/consul.d -bind 127.0.0.1

sudo ./consul-template -template "consul_template/easyeats.conf.ctmpl:/etc/nginx/sites-enabled/easyeats:service nginx restart"