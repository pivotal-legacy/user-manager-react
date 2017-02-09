tests:
	npm test

start:
	npm start

start-integration:
	npm start -- --port=8081

stop-integration:
	kill $(shell lsof -t -i:8081)