install: 
	npm i

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

make lint:
	npx eslint .