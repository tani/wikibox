all: build

.PHONY: clean build build/default

clean:
	rm -rf build/

build/default:
	npm run build
	cp node_modules/bootstrap/dist/css/bootstrap.min.* build/default/lib/
	cp -r src/index.html src/page build/default/

build: build/default
	for theme in $(shell ls node_modules/bootswatch/dist); do \
		cp -r build/default build/$$theme; \
		cp node_modules/bootswatch/dist/$$theme/bootstrap.min.css build/$$theme/lib/; \
	done