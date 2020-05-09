build:
	docker build -t tese-frontend:latest ./frontend
	docker build -t tese-backend:latest ./backend

runCompose:
	docker-compose up