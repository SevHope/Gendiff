install:
		npm ci
lint:
		npx eslint .

publish:
		npm publish --dry-run

gendiff:
		node bin/bin-genDiff.js

test:
		node __fixtures__/test.js

test-coverage:
		npx jest --coverage