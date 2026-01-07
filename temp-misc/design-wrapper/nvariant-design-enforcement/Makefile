SHELL := /bin/bash

.PHONY: assemble fingerprint patch remediate scan enforce clean

assemble:
	@./enforce/assemble.sh

fingerprint:
	@./enforce/fingerprint.sh

patch:
	@./enforce/patch.sh

remediate:
	@./enforce/remediate.sh

scan:
	@./enforce/scan.sh warn

enforce: assemble fingerprint patch remediate scan
	@echo "enforce complete"

clean:
	@rm -rf build/assembled reports/*
