install:
		npm install
lint:
		npx eslint .

publish:
		npm publish --dry-run

gendiff:
		node bin/bin-genDiff.js

test:
		npx --experimental-vm-modules jest

test-coverage:
		npx jest --coverage