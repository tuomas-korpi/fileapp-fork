# azure infra
## deploy
### main

#### create rg var
```bash
rg_name=rg-team-1-aug-dev-we
```

#### deploy complete
```bash
az deployment group create --template-file main.bicep --resource-group $rg_name --parameters main.parameters.json --mode Complete
```

# server web app
## .env
```
STOR_ACCOUNT="CHANGEME"
SHARED_KEY="CHANGEME"
SQL_USERNAME="CHANGEME"
SQL_PASSWORD="CHANGEME"
SQL_SERVER="CHANGEME"
SQL_DATABASE="CHANGEME"
```


# branches

feel free to check branches
1. [xuefeng_playground](https://github.com/beselamG/fileapp/tree/xuefeng_playground)


# Useful link

1. [blob REST api](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api)


2. develop functions using VS Code. The [first](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=csharp) one donesn't works for me but the [second](https://github.com/MicrosoftLearning/AZ-204-DevelopingSolutionsforMicrosoftAzure/blob/master/Instructions/Labs/AZ-204_lab_02.md) one works (the same as lab instruction).

3. [create functions using bicep](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-bicep?tabs=CLI), but only function plan and function services, no code.

4. [bicep parameter files](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameter-files), but one error, no need "@" when passing file path.

    WRONG:
    ```
    az deployment group create \
    --name ExampleDeployment \
    --resource-group ExampleGroup \
    --template-file storage.bicep \
    --parameters @storage.parameters.json
    ```
    RIGHT:
    ```
    az deployment group create \
    --name ExampleDeployment \
    --resource-group ExampleGroup \
    --template-file storage.bicep \
    --parameters storage.parameters.json
    ```