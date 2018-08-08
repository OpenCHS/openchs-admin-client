deploy_to_prod:
	yarn build && aws s3 sync build/ s3://www.app.openchs.org