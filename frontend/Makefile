THEMES = cerulean cosmo cyborg darkly flatly journal litera lumen lux materia minty pulse sandstone simplex sketchy slate solar spacelab superhero united yeti

all: $(foreach t, default $(THEMES), build/$(t))

node_modules:
	NODE_ENV=development npm ci

build/default: node_modules
	npm run build

define build_theme
build/$(1): build/default
	cp -rf $$^ $$@
	cp -rf node_modules/bootswatch/dist/$(1)/*.min.css $$@/lib/
endef

$(foreach t, $(THEMES), $(eval $(call build_theme,$(t))))

.PHONY: clean

clean:
	rm -rf build

dist-clean: clean
	rm -rf node_modules