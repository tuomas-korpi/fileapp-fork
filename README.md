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