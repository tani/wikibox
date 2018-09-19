THEMES = cerulean cosmo cyborg darkly flatly journal litera lumen lux materia minty pulse sandstone simplex sketchy slate solar spacelab superhero united yeti
PLATFORMS = php javascript common-lisp html

all: $(foreach p, $(PLATFORMS), build/$(p))

define build_platform
build/$(1): frontend/build $(shell find backend/$(1))
	mkdir -p $$@/
	cp -rf frontend/build/* $$@/
	for t in default $(THEMES); do sh -c "cp -f $(shell find backend/$(1) -type f) $$@/$$$$t/"; done
	for t in default $(THEMES); do sh -c "cd $$@/$$$$t/ && zip -r wikibox_$(1)_$$$$t.zip . && cd ../../"; done
endef

$(foreach p, $(PLATFORMS), $(eval $(call build_platform,$(p))))

frontend/build:
	cd frontend && make && cd ..

.PHONY: clean

clean:
	rm -rf build/

dist-clean: clean
	cd frontend && make dist-clean && cd ..