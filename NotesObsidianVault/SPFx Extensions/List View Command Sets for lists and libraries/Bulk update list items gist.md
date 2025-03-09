```javascript

  private async _updateRemarks(
    selectedRows: readonly RowAccessor[],
    remarks: string
  ): Promise<void> {
    // PnpJS SPFx and SP documentation: https://pnp.github.io/pnpjs/sp/items/
    const [batchedSP, execute] = this.sp.batched();

    const list = batchedSP.web.lists.getByTitle("Orders");

    selectedRows.forEach((selectedRow) => {
      list.items
        .getById(selectedRow.getValueByName("ID"))
        .update({ Remarks: remarks })
        .then((b) => {
          return b;
        })
        .catch((err) => {
          return err;
        });
    });

    await execute();

    return Promise.resolve();
  }
```

### onExecute method

```javascript
...
      case "COMMAND_UpdateRemarks":
        Dialog.prompt("Enter remarks")
          .then((value: string) => {
            this._updateRemarks(event.selectedRows, value)
              .then((r) => console.log(r))
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });

        break;
...
```