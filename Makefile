all: build

docs/vuewiki-%.html:
	THEME=$(patsubst docs/vuewiki-%.html,%,$@) $(shell npm bin)/webpack

.PHONY: test clean build

build: $(patsubst %,docs/vuewiki-%.html,$(shell ls node_modules/bootswatch/dist/))
	cp docs/vuewiki-yeti.html docs/index.html

test: clean docs/vuewiki-yeti.html
	python3 -m http.server

clean:
	rm -f docs/vuewiki-*.html
