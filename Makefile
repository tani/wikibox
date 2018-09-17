THEMES = cerulean cosmo cyborg darkly flatly journal litera lumen lux materia minty pulse sandstone simplex sketchy slate solar spacelab superhero united yeti
PLATFORMS = php javascript common-lisp html
FRONTEND = data bundle.js bundle.css index.html

all: $(foreach p, $(PLATFORMS), $(foreach t, $(THEMES), build/$(p)/$(t)))

define build_platform_theme
build/$(1)/$(2): $(foreach f,$(FRONTEND),frontend/build/$(2)/$(f)) $(shell find backend/$(1) -type f)
	mkdir -p build/$(1)/$(2)/
	cp -rf $$^ build/$(1)/$(2)/
	cp -rf README.md build/$(1)/$(2)/data/index.md
endef

$(foreach p, $(PLATFORMS), $(foreach t, $(THEMES), $(eval $(call build_platform_theme,$(p),$(t)))))

frontend/node_modules:
	cd frontend && npm ci && cd ..

define frontend_build_theme
$(foreach f,$(FRONTEND),frontend/build/$(1)/$(f)): frontend/node_modules $(shell find frontend/ -type d -name node_modules -prune -o -type d -name build -prune -o -type f)
	cd frontend && THEME=$(1) npm run build && cd ..
endef

$(foreach t, $(THEMES), $(eval $(call frontend_build_theme,$(t))))