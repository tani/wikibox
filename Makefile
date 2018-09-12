THEMES := cerulean cosmo cyborg darkly flatly journal litera lumen lux materia minty pulse sandstone simplex sketchy slate solar spacelab superhero united yeti
FRONTEND := index.html bundle.js bundle.js.map bundle.css bundle.css.map header.md footer.md index.md api.md
BACKEND_PHP := index.php .htaccess tokens.json
BACKEND_JAVASCRIPT := index.js package.json .htaccess tokens.json
BACKEND_COMMON-LISP := index.ros .htaccess tokens.json

all: $(foreach t, $(THEMES), docs/$(t)/php docs/$(t)/javascript docs/$(t)/common-lisp)

define docs_theme
docs/$(1)/php: $(foreach f, $(BACKEND_PHP), backend/php/$(f)) $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)) 
	cp $? docs/$(1)/php/

docs/$(1)/javascript: $(foreach f, $(BACKEND_JAVASCRIPT), backend/javascript/$(f)) $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)) 
	cp $? docs/$(1)/javascript/

docs/$(1)/common-lisp: $(foreach f, $(BACKEND_COMMON-LISP), backend/common-lisp/$(f)) $(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)) 
	cp $? docs/$(1)/common-lisp/
endef

$(foreach t, $(THEMES), $(eval $(call docs_theme, $(t))))

define frontend_build_theme
$(foreach f, $(FRONTEND), frontend/build/$(1)/$(f)):
	cd frontend && npm ci && THEME=$(1) npx webpack --mode=production && cd ..
endef

$(foreach t, $(THEMES), $(eval $(call frontend_build_theme, $(t))))