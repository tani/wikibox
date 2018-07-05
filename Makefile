MODE?=production

all: build

vuewiki-%.html:
	THEME=$(patsubst vuewiki-%.html,%,$@) $(shell npm bin)/webpack --mode=$(MODE)

.PHONY: test clean build

build: $(patsubst %,vuewiki-%.html,$(shell ls node_modules/bootswatch/dist/))

test: clean vuewiki-yeti.html
	python3 -m http.server

clean:
	rm -f docs/vuewiki-*.html
