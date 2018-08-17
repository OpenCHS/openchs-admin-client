deploy_to_prod:
	yarn build-prod && aws s3 sync build/ s3://www.app.openchs.org


deps:
	yarn install

build_staging: deps
	yarn build-staging

build_prod: deps
	yarn build-prod

deploy_staging: build_staging
	aws s3 sync build/ s3://app.staging.openchs.org