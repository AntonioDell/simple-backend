up:
	sudo docker-compose --env-file ./env/dev.env -f docker-compose.yml up -d

up-debug:
	sudo docker-compose --env-file ./env/dev.env -f docker-compose.yml up --build

up-prod:
	sudo docker-compose --env-file ./env/prod.env -f docker-compose.yml -f docker-compose.prod.yml up --build 

down: 
	sudo docker-compose --env-file ./env/dev.env down