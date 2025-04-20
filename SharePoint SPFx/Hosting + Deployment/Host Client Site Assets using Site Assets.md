
## Location

> Site contents > Sit Assets > Folder

## Configuration Steps

### Run: 

`New-SPOPublicCdnOrigin -Url https://<tenant>.sharepoint.com/SiteAssets/<folder>`

### Verify: 

`New-SPOPublicCdnOrigin -Url https://<tenant>.sharepoint.com/SiteAssets/<folder>`

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


