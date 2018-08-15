WORKDIR = /home/vagrant
SHELL = /bin/bash

redis/install:
	@echo "==> installing redis"
	cd $(WORKDIR) && \
	wget http://download.redis.io/redis-stable.tar.gz && \
	tar xvzf redis-stable.tar.gz && \
	cd redis-stable && make && \
	sudo make install && \
	cd .. && rm -rf redis-stable && rm redis-stable.tar.gz