#!/bin/bash
sudo mkdir /etc/consul.d;
sudo mkdir /var/lib/consul;

apt-get install -y curl unzip
curl -OL https://releases.hashicorp.com/consul/1.0.6/consul_1.0.6_linux_amd64.zip
unzip consul_1.0.6_linux_amd64.zip 
mv consul /usr/local/bin/consul

curl -OL https://releases.hashicorp.com/consul-template/0.19.4/consul-template_0.19.4_linux_amd64.zip
unzip consul-template_0.19.4_linux_amd64.zip
mv consul-template /usr/local/bin/consul-template