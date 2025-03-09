## @microsoft/sp-http

https://www.npmjs.com/package/@microsoft/sp-http

This package defines the base communication layer for the SharePoint Framework, including the SPHttpClient API and typed interfaces for various SharePoint REST services.

_This package is part of the [SharePoint Framework](http://aka.ms/spfx), which is a collection of NPM packages that empower developers to create client-side experiences for [Microsoft SharePoint](https://products.office.com/en-us/sharepoint/collaboration). For more information, including complete API documentation and code samples, please visit the [SharePoint Framework](http://aka.ms/spfx) web site._

```javascript
import {HttpClient, HttpClientResponse} from '@microsoft/sp-http'
...


private getUserDetails(): Promise<any> {
	return this.context.httpClient.get(
		'https://jsonplaceholder.typicode.com/users/1',
		HttpClient.configuration.v1
	)
	.then((response: HttpClientResponse) => {
		return response.json();
	})
	.then(jsonResponse => {
		return jsonResponse
	}) as Promise<any>;
}

```