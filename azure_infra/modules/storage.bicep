@description('location of the resources')
param location string = resourceGroup().location

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

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageSkuName
  }
  kind: 'StorageV2'
}

resource rStorageAccountContainer1 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-04-01' = {
  name: '${storageAccount.name}/default/testcontainer1'
  properties: {}
}

resource rStorageAccountContainer2 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-04-01' = {
  name: '${storageAccount.name}/default/testcontainer2'
  properties: {}
}

resource rStorageAccountContainer3 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-04-01' = {
  name: '${storageAccount.name}/default/testcontainer3'
  properties: {}
}
