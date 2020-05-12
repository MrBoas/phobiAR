build:
	docker build -t tese-frontend:latest ./frontend
	docker build -t tese-backend:latest ./backend

runCompose:
	docker-compose up

restart:
    docker container stop phobiar_frontend_1 phobiar_backend_1  phobiar_mongo_1
    docker-compose up -d

stop:
    docker container stop phobiar_frontend_1 phobiar_backend_1 phobiar_mongo_1
start:
    docker-compose up -d