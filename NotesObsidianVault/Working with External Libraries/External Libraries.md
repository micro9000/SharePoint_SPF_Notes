References: 
https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/add-an-external-library

## Bundle a script

By default, the web part bundler automatically includes any library that is a dependency of the web part module. This means that the library is deployed in the same JavaScript bundle file as your web part. This is more useful for smaller libraries that aren't used in multiple web parts.

`npm install validator --save`

Create a file in your web part's folder called `validator.d.ts` and add the following:
```typescript
declare module "validator" {
    export function isEmail(email: string): boolean;
    export function isAscii(text: string): boolean;
}
```
In your web part file, import the type declarations:

`import * as validator from 'validator';

Use the validator library in your web part code:

`validator.isEmail('someone@example.com');`

## Share a library among multiple web parts

`npm install marked --save`

Type declaration package

`npm install @types/marked --save-dev`


Edit the **config/config.json**, and add an entry to the `externals` map. This is what tells the bundler to put this in a separate file. This prevents the bundler from bundling this library:

`"marked": "node_modules/marked/marked.min.js"`

Add the statement to import the **marked** library in your web part now that we've added the package and type declarations for the library:

`import * as marked from 'marked'`

Use the library in your web part:

`console.log(marked('I am using __markdown__.'));`

## Load a script from a CDN

Instead of loading the library from an NPM package, you might want to load a script from a Content Delivery Network (CDN). To do so, edit the **config.json** file to load the library from its CDN URL.

E.g.
Install the type declarations for jQuery:

`npm install --save-dev @types/jquery`

Update the **config.json** in the **config** folder to load jQuery from CDN. Add an entry to the `externals` field:

`"jquery": "https://code.jquery.com/jquery-3.1.0.min.js"`

Import jQuery in your web part:

`import * as $ from 'jquery';`

Use jQuery in your web part:

`alert( $('#foo').val() );`


## Load a non-AMD module

Some scripts follow the legacy JavaScript pattern of storing the library on the global namespace. This pattern is now deprecated in favor of [Universal Module Definitions (UMD)](https://github.com/umdjs/umd)/[Asynchronous Module Definitions (AMD)](https://en.wikipedia.org/wiki/Asynchronous_module_definition) or [ES6 modules](https://github.com/lukehoban/es6features/blob/master/README.md#modules). However, you might need to load such libraries in your web part.

read the documentation...

## Load a library that has a dependency on another library

read the documentation...