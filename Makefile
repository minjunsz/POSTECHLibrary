# make a new container
up-app:
	docker-compose up -d --force-recreate app
up-server:
	docker-compose up -d --force-recreate server
up-db:
	docker-compose up -d --force-recreate db
up-redis:
	docker-compose up -d --force-recreate redis

up: up-redis up-db up-server up-app


# show logs in the container
logs:
	docker-compose logs -f

# load dependencies into the node_modules folder via temporary container
install-app:
	docker-compose run --rm app "npm install"
install-server:
	docker-compose run --rm server "npm install"

install: install-server install-app


into-app:
	docker-compose exec app bash
into-server:
	docker-compose exec server bash
into-db:
	docker-compose exec db bash
into-redis:
	docker-compose exec redis bash

# files created by docker container are belong to root user
# we have to unrootify in order to make it writable
unrootify:
	sudo chown -R $$(id -u):$$(id -g) .

rm-app:
	docker-compose rm -sf app
rm-server:
	docker-compose rm -sf server
rm-db:
	docker-compose rm -sf db
rm-redis:
	docker-compose rm -sf redis
rm-all: rm-app rm-server rm-db rm-redis