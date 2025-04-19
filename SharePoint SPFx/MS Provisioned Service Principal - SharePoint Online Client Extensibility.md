In SharePoint Online SPFx solution and in Azure Entra ID, the SharePoint Online Client Extensibility service principal is provisioned by Microsoft and is available in the Azure AD of all Microsoft 365 tenants In my SPFx solution, how can I create my own App Registration/service principal as a replacement for the SharePoint Online Client Extensibility service principal? so I can have full control on who can just use the permissions I will add to that app registration/service principal? like for example if in our company there are multiple teams developing SPFx solutions for different sharepoint sites, I want to control the app registration

###### ChatGPT said:

To achieve what you're describing—**replacing the default “SharePoint Online Client Extensibility” service principal with your own custom app registration in SPFx**—you can use **Application Permissions via Azure AD app registration** and **configure your SPFx solution to use it**. Here's a step-by-step breakdown of how to set it up and gain control over who can use the permissions of your own service principal.

---

## 🎯 Goal:

Use your **own Azure AD App Registration (service principal)** in your SPFx solution instead of the default Microsoft-provided **SharePoint Online Client Extensibility** service principal.

---

## ✅ Why This Matters

The default service principal (`00000003-0000-0ff1-ce00-000000000000`) is **shared across your entire tenant** and **all SPFx solutions** use it when requesting permission scopes in the `package-solution.json`. So:

- You can't control who uses what.
    
- If another team adds more permissions to it, they apply to _every SPFx solution_.
    
- You have **no isolation** between solutions or teams.
    

---

## 🛠️ How to Replace it with Your Own App Registration

### 1. **Create Your Own App Registration in Azure Entra ID**

1. Go to **Azure Portal** > **Azure Active Directory** > **App registrations**.
    
2. Click **New registration**.
    
3. Name it something like: `SPFx-Custom-App-For-TeamA`.
    
4. Choose `Accounts in this organizational directory only`.
    
5. Set the redirect URI as: `https://localhost` or leave blank for now.
    

---

### 2. **Configure API Permissions for Your App**

1. In the App Registration, go to **API permissions**.
    
2. Click **Add a permission**.
    
3. Choose **SharePoint**.
    
4. Choose **Delegated permissions** or **Application permissions**, depending on your use case.
    
    - Common permissions: `Sites.Read.All`, `Sites.FullControl.All`, etc.
        
5. **Click “Grant admin consent”** for your tenant.
    

---

### 3. **Expose an API (optional, but useful if you want role-based control)**

You can define your **own scopes/roles** in **Expose an API** section. This allows you to manage who can use the app in a more granular way.

---

### 4. **Update `package-solution.json` in your SPFx solution**

Now you need to **reference your custom app registration**, rather than the default service principal.

json

CopyEdit

`"webApiPermissionRequests": [   {     "resource": "SPFx-Custom-App-For-TeamA",     "scope": "Sites.Read.All"   } ]`

Note: The `resource` should match the **App Registration name** or App ID URI depending on how you're referencing it.

However, this approach **only works for web APIs you own**. If you're calling **Microsoft Graph or SharePoint Online**, SPFx is hardcoded to use the default service principal.

So the better alternative is...

---

## 🔁 Alternative: Use Your Own Backend/API as a Proxy

This is a **best practice** approach if you want **full control** over the API permissions.

### 🔒 Benefits:

- You isolate permissions to your own app registration.
    
- You can audit/limit who uses the API.
    
- You avoid permission scope sprawl across the tenant.
    

### How it works:

1. Create an **Azure Function or ASP.NET API** that acts as a **proxy or service layer**.
    
2. Secure it with **Azure AD Authentication** using **your app registration**.
    
3. Let SPFx solutions call this custom API.
    
4. The API calls Microsoft Graph or SharePoint Online using **application permissions** under your own service principal.
    
5. You control which SPFx solution or developer/team has access via role assignments or groups.
    

---

## 🧩 Key Notes

- **SPFx does not allow you to replace the built-in SharePoint Online Client Extensibility principal directly.**
    
- You can only request scopes that get added to that shared principal.
    
- **To gain full control**, you must go through your **own API/backend** registered as an app in Entra ID.
    

---

## ✅ Final Recommendation

If isolation and control are your goals:

- **Don’t try to replace** the SharePoint Online Client Extensibility principal.
    
- Instead, create your **own app registration + API**.
    
- Have your SPFx solution talk to that API instead of directly accessing SharePoint or Graph.
    
- Control access via roles, scopes, and app permissions on your own app registration.
    

---

Would you like an example of how to set up the custom API and call it from SPFx with authentication?

4o

##### You said:

But adding this in my package-solutions.json "webApiPermissionRequests": [ { "resource": "SPFx-Custom-App-For-TeamA", "scope": "Sites.Read.All" } ] will only add the SPFx-Custom-App-For-TeamA as another permissions to the SharePoint Online Client Extensibility, am I right?

###### ChatGPT said:

Yes, you're absolutely right — and **great observation**. Adding a custom entry like:

json

CopyEdit

`"webApiPermissionRequests": [   {     "resource": "SPFx-Custom-App-For-TeamA",     "scope": "Sites.Read.All"   } ]`

in your SPFx solution’s `package-solution.json` will **not** make SPFx use your custom `SPFx-Custom-App-For-TeamA` app registration. Instead, it does the following:

---

## 🔍 What Actually Happens

- The permissions you declare here get **requested for the default SharePoint Online Client Extensibility Web Application Principal**, which is the one with client ID: `00000003-0000-0ff1-ce00-000000000000`.
    
- Your declared `resource` and `scope` just help define what the default principal will request permission for.
    
- When you deploy and approve the package in the SharePoint Admin Center, it **grants those permissions to the default SPFx service principal**, not to your app registration.
    

---

## 🧠 Translation:

Even if you write `"resource": "SPFx-Custom-App-For-TeamA"`, it doesn’t use that app registration — it's **just a label**. Behind the scenes, it's **SharePoint’s own service principal** that gets those permissions, and **every SPFx solution in the tenant shares it**.

So yes — your understanding is 100% correct.

---

## 🛡️ What Can You Do Instead?

If your goal is to **fully control which apps or teams can use certain permissions**, then you’ll need to:

### ✅ **Create Your Own Azure AD App Registration**

With:

- Specific API permissions (Graph, SharePoint, etc.)
    
- Possibly restricted by conditional access or app roles
    

### ✅ **Build a Secure Custom API**

- Let your SPFx web parts **call this API** (instead of directly using `@microsoft/sp-http` to talk to Graph/SP).
    
- Secure your API with **Azure AD** and configure it to only trust tokens from your app registration.
    
- From the SPFx side, acquire the access token to your API using `AADHttpClient`.
    

### ✅ **Use `webApiPermissionRequests` Only for Your Custom API**

Here’s where it works: if you expose a custom web API secured with Azure AD, **then SPFx can request access tokens specifically for that app registration**.

Example:

json

CopyEdit

`"webApiPermissionRequests": [   {     "resource": "api://<client-id-of-your-app-registration>",     "scope": "access_as_user"   } ]`

In this case, **your SPFx solution is asking for a token to call your custom API**, and this does use your app registration. The default SPFx principal is still doing the requesting, but you can **validate access on your API** level using app roles, scopes, or groups.

---

## 🧩 Summary

|Scenario|Uses Your Custom App Registration?|Permissions Controlled by You?|
|---|---|---|
|Adding `webApiPermissionRequests` for Microsoft Graph / SharePoint|❌ No|❌ No|
|Adding `webApiPermissionRequests` for Your Own Azure AD API|✅ Yes|✅ Yes (at API level)|
|Want full control over access and roles|✅ Build a custom API + Secure with AAD|✅ Yes|