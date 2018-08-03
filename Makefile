deploy_to_prod:
	aws s3 sync build/ s3://samanvay-app-prod

deploy_to_staging:
	aws s3 sync build/ s3://samanvay-app-staging
	
deploy_to_uat:
	aws s3 sync build/ s3://samanvay-app-uat