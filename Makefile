DARKTHEMES = darkly slate superhero solar cyborg yeti
LIGHTTHEMES = cerulean litera materia sandstone cosmo flatly lumen minty simplex united journal lux pulse sketchy spacelab

all: $(foreach t, $(DARKTHEMES) $(LIGHTTHEMES), build/$(t))

node_modules:
	NODE_ENV=development npm install

define build_darktheme
build/$(1):
	THEME="$(1)" BRIGHTNESS="dark" npm run build
endef

define build_lighttheme
build/$(1):
	THEME="$(1)" BRIGHTNESS="light" npm run build
endef

$(foreach t, $(DARKTHEMES), $(eval $(call build_darktheme,$(t))))
$(foreach t, $(LIGHTTHEMES), $(eval $(call build_lighttheme,$(t))))

.PHONY: clean

clean:
	rm -rf build

dist-clean: clean
	rm -rf node_modules
