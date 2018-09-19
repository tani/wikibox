THEMES = cerulean cosmo cyborg darkly flatly journal litera lumen lux materia minty pulse sandstone simplex sketchy slate solar spacelab superhero united yeti
PLATFORMS = php javascript common-lisp html

all: $(foreach p, $(PLATFORMS), build/$(p))

define build_platform
build/$(1): frontend/build $(shell find backend/$(1) -type f)
	mkdir -p $$@/
	cp -rf frontend/build/* $$@/
	echo $(THEMES) | xargs -P 1 -I % cp -rf backend/$(1) $$@/%/
endef

$(foreach p, $(PLATFORMS), $(eval $(call build_platform,$(p))))

frontend/build:
	cd frontend && make && cd ..

.PHONY: clean

clean:
	rm -rf build/

dist-clean: clean
	cd frontend && make dist-clean && cd ..