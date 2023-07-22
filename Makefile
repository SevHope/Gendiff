install:
	npm ci

gendiff:
	node bin/genDiff.js

lint:
	npx eslint .

test:
	npx --experimental-vm-modules jest

test-coverage:
	npx jest --coverage