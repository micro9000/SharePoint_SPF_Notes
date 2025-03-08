There are few different ways on getting your SPFx extensions deployed and activated in SharePoint sites. The correct option depends on your business requirements and objectives. The primary options are as follows:

- Activate the extension on specific site(s) using the **Feature Framework-based activation** option once the solution is installed. This is the only model that supports [site level assets getting created or deployed](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/provision-sharepoint-assets) as part of the solution activation.
- Use the [tenant-scoped deployment option](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/tenant-scoped-deployment) and activate the extension on specific sites available SharePoint APIs and interfaces.
- Use the **tenant-wide deployment** option for extensions from app catalog. This capability was introduced in the SharePoint Framework v1.6.

Read more:
https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/serving-your-extension-from-sharepoint

`element.xml` file inside `sharepoint/assets` folder

the solution to be installed at the site level


`ClientSideInstance.xml` inside `sharepoint/assets` folder

**ClientSideInstance.xml** file is used with [Tenant Wide deployment of SharePoint Framework extensions](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/basics/tenant-wide-deployment-extensions). You can use this file to add an entry to the centralized **Tenant-Wide Extensions** list in the tenant app catalog site if you use the tenant-scoped deployment option.

## Deploy the extension to SharePoint Online and host JavaScript from local host

```console
gulp bundle
gulp package-solution

```
The `gulp package-solution` command creates the following package: **./sharepoint/solution/app-extension.sppkg**.

`gulp serve --nobrowser`

Go to the site where you want to test SharePoint asset provisioning. This could be any site collection in the tenant where you deployed this solution package.

Select the gear icon on the top navigation bar on the right, and then select **Add an app** to go to your Apps page

## Host an SPFx extension from the Microsoft 365 CDN

https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/hosting-extension-from-office365-cdn

### Update your solution project for the CDN URLs

Return to the previously created solution and open the **./config/package-solution.json** file. Notice that the `includeClientSideAssets` attribute has to be set to `true` for automatic asset hosting through Microsoft 365 CDN. This controls if the JavaScript assets and related files are included in the ***.sppkg** file* when solution is packaged for shipping.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "name": "app-extension-client-side-solution",
    "id": "831b6fac-7668-46b4-96c6-e2ee35559287",
    "version": "1.0.0.0",
    "includeClientSideAssets": true,
    ...
  }
}

```

### External CDN such as Microsoft Azure CDN

 Ensure that the `cdnBasePath` attribute is exactly as shown below. If it has any other entry, automatic hosting with Microsoft 365 Public CDN won't work.

```json
{
  "cdnBasePath": "<!-- PATH TO CDN -->"
}
```

`gulp bundle --ship`

`gulp package-solution --ship`

Upload or drag-and-drop the newly created client-side solution package to the tenant app catalog. When prompted, select the **Only enable this app** radio button and then select the **Enable app** button. Notice the domain definition is updated as **SharePoint Online** as your assets will be now automatically hosted with Microsoft 365 CDN: