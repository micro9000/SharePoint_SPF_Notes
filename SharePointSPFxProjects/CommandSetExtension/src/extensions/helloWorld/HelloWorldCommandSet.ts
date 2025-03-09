import { Log } from "@microsoft/sp-core-library";
import {
  BaseListViewCommandSet,
  RowAccessor,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
  type ListViewStateChangedEventArgs,
} from "@microsoft/sp-listview-extensibility";
import { Dialog } from "@microsoft/sp-dialog";
import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = "HelloWorldCommandSet";

export default class HelloWorldCommandSet extends BaseListViewCommandSet<IHelloWorldCommandSetProperties> {
  sp = spfi().using(SPFx(this.context));

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, "Initialized HelloWorldCommandSet");

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand("COMMAND_1");
    compareOneCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(
      this,
      this._onListViewStateChanged
    );

    return Promise.resolve();
  }

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
      default:
        throw new Error("Unknown command");
    }
  }

  private _onListViewStateChanged = (
    args: ListViewStateChangedEventArgs
  ): void => {
    Log.info(LOG_SOURCE, "List view state changed");

    const compareOneCommand: Command = this.tryGetCommand("COMMAND_1");
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible =
        this.context.listView.selectedRows?.length === 1;
    }

    const updateRemarksCommand: Command = this.tryGetCommand(
      "COMMAND_UpdateRemarks"
    );
    if (updateRemarksCommand) {
      // This command should be hidden unless exactly one row is selected.
      updateRemarksCommand.visible =
        (this.context.listView.selectedRows &&
          this.context.listView.selectedRows?.length > 1) ??
        false;
    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  };
}
