.PHONY: up down logs
.DEFAULT_GOAL := up

SHELL = /bin/bash
CURRENT_UID := $(shell id -u):$(shell id -g)

export CURRENT_UID

up:
	docker compose up -d --renew-anon-volumes --force-recreate --build --remove-orphans

down:
	docker compose down -v

logs:
	docker compose logs -f