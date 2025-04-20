
1. Create a storage account
2. Create a container inside that storage account
3. Copy and take note the storage account access key (key1)
4. Populate the `deploy-azure-storage.json`

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json",
  "workingDir": "./release/assets/",
  "account": "<!-- STORAGE ACCOUNT NAME -->",
  "container": "crud-share-point-list",
  "accessKey": "<!-- ACCESS KEY -->"
}
```

5. In the Storage account to to Azure CDN blade
6. Create new endpoint

![[Pasted image 20250420104641.png]]

7. Copy and take note of the Origin hostname
8. Populate the `<spfx-solution/config/write-manifests.json`, replace the `cdnBasePath` with the Origin hostname of the Azure CDN endpoint

```
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
  "cdnBasePath": "https://<origin-hostname>/<stg-account-container-name>"
}
```

9. Upload assets
```Bash
gulp clean
gulp build
gulp bundle --ship
gulp package-solution --ship
```

A `/temp` folder will be created inside your SPFx solution, go to that folder, inside that folder there is a `/deploy` folder, drag and drop all the files inside into your storage account container

or you can just run the following command to automatically copy all the files into your storage account container

```
gulp deploy-azure-storage
```


10. Upload the `sppkg` file in App Catalog

![[Pasted image 20250420110637.png]]

11. Verify that the assets are retrieved from the Azure CDN (storage account)

![[Pasted image 20250420110834.png]]