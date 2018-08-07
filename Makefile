deploy_to_prod:
	aws s3 sync build/ s3://www.app.openchs.org