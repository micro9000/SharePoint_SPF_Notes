```javascript
public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
	switch (event.itemId) {
	  case "COMMAND_1": {
		Dialog.alert(`${this.properties.sampleTextOne}`).catch(() => {
		  /* handle error */
		});
	
		const title: string = event.selectedRows[0].getValueByName("Title");
		const status: string = event.selectedRows[0].getValueByName("Status");
	
		Dialog.alert(
		  `Project Name: ${title} - Current Status: ${status}% done`
		).catch(() => {
		  /* handle error */
		});
		break;
	  }
	  case "COMMAND_2":
		Dialog.alert(`${this.properties.sampleTextTwo}`).catch(() => {
		  /* handle error */
		});
		break;
	  default:
		throw new Error("Unknown command");
	}
}


```


