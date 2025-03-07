export class MyVeryFirstSpFxLibraryLibrary {
  public getCurrentTime(): string {
    return (
      "The current time as returned from the corporate library is " +
      new Date().toTimeString()
    );
  }
}
