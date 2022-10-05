@description('app sevice plan sku')
@allowed([
  'F1'
])
param appServicePlanSku string = 'F1'

@description('location of the resources')
param location string = resourceGroup().location

@description('name of the web app')
param webAppAccountName string = 'app${uniqueString(resourceGroup().id)}'

@description('name of the web app')
param appServicePlanName string = 'appplan${uniqueString(resourceGroup().id)}'

resource appServicePlan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: appServicePlanSku
    capacity: 1
  }
}

resource webApplication 'Microsoft.Web/sites@2021-01-15' = {
  name: webAppAccountName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
  }
}
