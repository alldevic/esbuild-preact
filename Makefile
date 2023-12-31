.PHONY: up down logs dist
.DEFAULT_GOAL := dist

SHELL = /bin/bash
CURRENT_UID := $(shell id -u):$(shell id -g)

export CURRENT_UID

up:
	docker compose up -d --renew-anon-volumes --force-recreate --build --remove-orphans

down:
	docker compose down -v

logs:
	docker compose logs -f

dist:
	docker compose run --rm dev yarn build
	find . -maxdepth 1 -type d -empty -print -delete -name 'node_modules'

stats:
	docker compose run --rm dev yarn stats
	find . -maxdepth 1 -type d -empty -print -delete -name 'node_modules'