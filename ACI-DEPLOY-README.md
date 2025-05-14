# Azure Container Instance Deployment Instructions

This README provides instructions on how to deploy this frontend application to Azure Container Instances (ACI).

## Prerequisites

1. Azure CLI installed
2. Docker installed
3. Access to an Azure Container Registry (ACR)

## Manual Deployment Steps

### 1. Fill in your environment variables

Edit the `azure-container-instance.yaml` file and update the environment variables:

```yaml
environmentVariables:
  - name: 'REACT_APP_BACKEND_URL'
    value: 'YOUR_BACKEND_URL'
  - name: 'REACT_APP_API_KEY'
    value: 'YOUR_API_KEY'
```

### 2. Set up GitHub Secrets (for automated deployment)

If you're using GitHub Actions, add the following secrets to your GitHub repository:

- `AZURE_CREDENTIALS`: JSON output from `az ad sp create-for-rbac`
- `ACR_USERNAME`: Your ACR username
- `ACR_PASSWORD`: Your ACR password
- `REACT_APP_BACKEND_URL`: Your backend URL
- `REACT_APP_API_KEY`: Your API key

### 3. Manual deployment

If you prefer to deploy manually:

1. Build your Docker image:
   ```bash
   docker build -t ontologyapp-aweufshed9eucdgx.azurecr.io/frontend:latest .
   ```

2. Push your Docker image:
   ```bash
   docker push ontologyapp-aweufshed9eucdgx.azurecr.io/frontend:latest
   ```

3. Deploy to Azure Container Instances:
   ```bash
   az container create --resource-group ontology --file azure-container-instance.yaml
   ```

## GitHub Actions Deployment

If you've set up the GitHub Actions workflow:

1. Push to the main branch or manually trigger the workflow.
2. The workflow will build the Docker image with your environment variables, push it to ACR, and deploy to ACI.

## Checking Deployment Status

```bash
az container show --resource-group ontology --name adax-frontend --query "{FQDN:ipAddress.fqdn,ProvisioningState:provisioningState}"
```

## Accessing the Frontend

Once deployed, your frontend should be accessible at:
```
http://<container-instance-fqdn>
```

You can get the FQDN with:
```bash
az container show --resource-group ontology --name adax-frontend --query "ipAddress.fqdn" -o tsv
``` 