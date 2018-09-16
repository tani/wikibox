THEMES = cerulean cosmo cyborg darkly flatly journal litera lumen lux materia minty pulse sandstone simplex sketchy slate solar spacelab superhero united yeti
FRONTEND = index.html bundle.js bundle.css
BACKEND_PHP = $(shell ls -A backend/php/)
BACKEND_JAVASCRIPT = $(shell ls -A backend/javascript/)
BACKEND_COMMON-LISP = $(shell ls -A backend/common-lisp/)

all: $(foreach t, $(THEMES), build/$(t))

define build_theme
build/$(1): build/$(1)/php build/$(1)/javascript build/$(1)/common-lisp

build/$(1)/php: $(foreach f, $(BACKEND_PHP), backend/php/$(f)) $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f))
	mkdir -p build/$(1)/php/
	cp $$^ build/$(1)/php/
	cp data build/$(1)/php/data
	cp README.md build/$(1)/php/data/index.md

build/$(1)/javascript: $(foreach f, $(BACKEND_JAVASCRIPT), backend/javascript/$(f)) $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)) 
	mkdir -p build/$(1)/javascript/
	cp $$^ build/$(1)/javascript/
	cp data build/$(1)/javascript/data
	cp README.md build/$(1)/javascript/data/index.md

build/$(1)/common-lisp: $(foreach f, $(BACKEND_COMMON-LISP), backend/common-lisp/$(f)) $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)) 
	mkdir -p build/$(1)/common-lisp/
	cp $$^ build/$(1)/common-lisp/
	cp data build/$(1)/common-lisp/data
	cp README.md build/$(1)/common-lisp/data/index.md
endef

$(foreach t, $(THEMES), $(eval $(call build_theme,$(t))))

define frontend_build_theme
frontend/build/$(1): $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f))

$(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)): frontend/node_modules $(shell find frontend/src/ -name '*.ts*')
	cd frontend && THEME=$(1) npm run build && cd ..
endef

frontend/node_modules:
	cd frontend && npm ci && cd ..

$(foreach t, $(THEMES), $(eval $(call frontend_build_theme,$(t))))