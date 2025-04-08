> [!warning]
> A preload for 'https://localhost:4321/dist/hello-world-command-set.js' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.


![[Pasted image 20250309123420.png]]


StackExchange entry for this error:

https://sharepoint.stackexchange.com/questions/313993/spfx-commandbar-buttons-and-context-menu-are-not-working-with-microsoft-list-loo


GitHub Issues:

https://github.com/SharePoint/sp-dev-docs/issues/9514
https://github.com/SharePoint/sp-dev-docs/issues/9711

## Workaround

> [!Warning]
> Not working

https://sharepoint.stackexchange.com/a/314014

This is the open issue in SPFx. There is one comment that has one workaround to resolve this issue.

**Resolution:** Go to list settings --> Advanced settings --> disable "Allow items from this list to be downloaded to offline clients?" and save the changes.

This will disable the new Microsoft Lists UI in the SharePoint Online site and commandbar & context menu will start working.

Until Microsoft resolves this, we can use the above workaround or we can move command bar & context menu customizations at SPFx custom form level.

Reference: [https://github.com/SharePoint/sp-dev-docs/issues/9514#issuecomment-2278145332](https://github.com/SharePoint/sp-dev-docs/issues/9514#issuecomment-2278145332)

