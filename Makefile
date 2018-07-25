PROJECT=editor

dev:
	DEBUG=$(PROJECT):* npm run devstart

run:
	DEBUG=$(PROJECT):* npm run start
