
## Location

> Site contents > Sit Assets > WebPart Folder

## Configuration Steps

### Run: 

`New-SPOPublicCdnOrigin -Url https://<tenant>.sharepoint.com/SiteAssets/<webpart-folder>`

### Verify: 

`New-SPOPublicCdnOrigin -Url https://<tenant>.sharepoint.com/SiteAssets/<webpart-folder>

### Get Id

`Get-SPOPublicCdnOrigins | Format-list`

Sample output

![[Pasted image 20250420101229.png]]

### Copy the Id and construct the CDN URL below

`https://publiccdn.sharepointonline.com/<tenant>.sharepoint.com/<Id>`

### Paste the CDN URL in `cdnBasePath` property

`<spfx-solution>/config/write-manifests.json`

```JSON
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
  "cdnBasePath": "<!-- PATH TO CDN -->"
}
```

## Upload Assets

```Bash
gulp build
gulp bundle --ship
gulp package-solution --ship
```

A `/temp` folder will be created inside your SPFx solution, go to that folder, inside that folder there is a `/deploy` folder, drag and drop all the files inside that folder into `https://<tenant>.sharepoint.com/SiteAssets/<webpart-folder>

### Uploaded the `sppkg` file

Once you uploaded the package, this will be the message

![[Pasted image 20250420103033.png]]

