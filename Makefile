up:
	sudo docker-compose up -d

up-prod:
	sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down: 
	sudo docker-compose down