DARKTHEMES = darkly slate superhero solar cyborg yeti
LIGHTTHEMES = cerulean litera materia sandstone cosmo flatly lumen minty simplex united journal lux pulse sketchy spacelab

all: $(foreach t, default $(DARKTHEMES) $(LIGHTTHEMES), build/$(t))

node_modules:
	NODE_ENV=development npm install

build/default: node_modules
	npm run build
	npx cleancss -o $@/lib/highlight.min.css node_modules/highlight.js/styles/atom-one-light.css


define build_darktheme
build/$(1): build/default
	cp -rf $$^ $$@
	cp -rf node_modules/bootswatch/dist/$(1)/*.min.css $$@/lib/
	npx cleancss -o build/$(1)/lib/highlight.min.css node_modules/highlight.js/styles/atom-one-dark.css
endef

define build_lighttheme
build/$(1): build/default
	cp -rf $$^ $$@
	cp -rf node_modules/bootswatch/dist/$(1)/*.min.css $$@/lib/
	npx cleancss -o build/$(1)/lib/highlight.min.css node_modules/highlight.js/styles/atom-one-light.css
endef

$(foreach t, $(DARKTHEMES), $(eval $(call build_darktheme,$(t))))
$(foreach t, $(LIGHTTHEMES), $(eval $(call build_lighttheme,$(t))))

.PHONY: clean

clean:
	rm -rf build

dist-clean: clean
	rm -rf node_modules
