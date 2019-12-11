all: build

.PHONY: clean build build/default

clean:
	rm -rf build/

build/default:
	npm run build
	cp node_modules/bootstrap/dist/css/bootstrap.min.* build/default/lib/
	cp src/*.html build/default/

build: build/default
	for theme in $(shell ls node_modules/bootswatch/dist); do \
		cp -r build/default build/$$theme; \
		cp node_modules/bootswatch/dist/$$theme/bootstrap.min.css build/$$theme/lib/; \
	done