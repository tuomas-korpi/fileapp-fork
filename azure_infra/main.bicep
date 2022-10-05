@description('The name of the SQL logical server.')
param serverName string = uniqueString('sql', resourceGroup().id)

@description('The name of the SQL Database.')
param sqlDBName string = 'testDB'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('The administrator username of the SQL logical server.')
@secure()
param administratorLogin string

@description('The administrator password of the SQL logical server.')
@secure()
param administratorLoginPassword string

@description('name of the storage account')
param storageAccountName string = 'stor${uniqueString(resourceGroup().id)}'

@description('storage sku')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_ZRS'
  'Premium_LRS'
])
param storageSkuName string = 'Standard_LRS'

@description('app sevice plan sku')
@allowed([
  'F1'
])
param appServicePlanSku string = 'F1'

@description('name of the web app')
param webAppAccountName string = 'app${uniqueString(resourceGroup().id)}'

@description('name of the web app')
param appServicePlanName string = 'appplan${uniqueString(resourceGroup().id)}'

module sqlModule 'modules/sql.bicep' = {
  name: 'sqlDeploy'
  params: {
    serverName: serverName
    sqlDBName: sqlDBName
    location: location
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
  }
}

module storageModule 'modules/storage.bicep' = {
  name: 'storageDeploy'
  params: {
    location: location
    storageAccountName: storageAccountName
    storageSkuName: storageSkuName
  }
}

module webAppModule 'modules/web_app.bicep' = {
  name: 'webAppDeploy'
  params: {
    location: location
    appServicePlanSku: appServicePlanSku
    webAppAccountName: webAppAccountName
    appServicePlanName: appServicePlanName
  }
}
