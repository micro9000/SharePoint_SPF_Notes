
override the `disableReactivePropertyChanges` method of the WebPart base class

In the `WebPart.ts` file

```javascript
protected get disableReactivePropertyChanges(): boolean {
	return true;
}

```

