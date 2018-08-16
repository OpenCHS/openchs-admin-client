deploy_to_prod:
	yarn build-prod && aws s3 sync build/ s3://www.app.openchs.org