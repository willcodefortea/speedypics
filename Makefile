export DJANGO_SETTINGS_MODULE?=reincubate_billing_test.settings

bootstrap:
	pip install -e .
	pip install "file://`pwd`#egg=reincubate_billing[tests]"
	make setup-git

setup-git:
	git config branch.autosetuprebase always
	cd .git/hooks && ln -sf ../../hooks/* .

.PHONY: bootstrap setup-git
