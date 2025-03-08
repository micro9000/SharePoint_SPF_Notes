Field customizers can be used to change the default rending logic of a field in SharePoint lists or libraries using JavaScript. They enable complex rendering options of the value – for example showing graphical presentation of the field value rather than simply rendering the numeric value of the field.

Field customizers are only supported in the read-only mode, which means that you cannot override the editing experience of the field with it.

Here’s an example image with the field customizer rendering

![[Pasted image 20250308232419.png]]

## Code your Field Customizer
https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-field-customizer


## Debug your Field Customizer

> [!IMPORTANT]
> You can't use the local Workbench to test SharePoint Framework Extensions. You need to test and develop them directly against a live SharePoint Online site. You don't have to deploy your customization to the app catalog to do this, which makes the debugging experience simple and efficient.

## List column

1. Create a new list
2. Add columns. E.g. Numeric type column `Percent`
3. Update `pageUrl` in `<your-solution-folder>/config/serve.json` with the URL of your list. e.g.`https://{tenantDomain}/sites/SPFxTrainingSite/Lists/Orders/AllItems.aspx`
4. Replace `InternalFieldName` property under `fieldCustomizers`
```json
...
"pageUrl": "https://{tenantDomain}/sites/SPFxTrainingSite/Lists/Orders/AllItems.aspx",
  "fieldCustomizers": {
	"Percent": {
	  "id": "d2a0823f-17ce-4d8c-b919-304b97ecd1ec",
	  "properties": {
		"sampleText": "Value"
	  }
	}
  }
...
```

