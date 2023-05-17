lint:
	npx eslint .

publish:
	npm publish --dry-run

gendiff:
	node bin/bin-genDiff.js