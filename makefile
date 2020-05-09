build:
	docker build -t mrboas/tese-frontend:latest ./frontend
	docker build -t mrboas/tese-backend:latest ./backend

runCompose:
	docker-compose up