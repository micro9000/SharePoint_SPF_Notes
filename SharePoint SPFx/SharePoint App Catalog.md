https://learn.microsoft.com/en-us/sharepoint/dev/general-development/site-collection-app-catalog

## Why site collection app catalogs

Previously, all add-ins and SharePoint Framework solutions had to be managed centrally in the tenant app catalog. While tenant administrators could delegate the access to other people in the organization, a deployed package was visible on all site collections. SharePoint offered no supported way of deploying add-ins and SharePoint Framework solutions only to specific sites.

With the introduction of site collection app catalogs, tenant administrators can enable app catalog on the specific sites. Once enabled, site collection administrators can deploy SharePoint add-ins and SharePoint Framework solutions that will be available only in that particular site collection.