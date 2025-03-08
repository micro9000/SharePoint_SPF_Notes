https://github.com/pnp/sp-starter-kit/blob/master/source/react-application-portal-footer/src/extensions/portalFooter/PortalFooterApplicationCustomizer.ts

### render method

```javascript

  private async _renderPlaceHolders(): Promise<void> {

    // check if the application customizer has already been rendered
    if (!this._bottomPlaceholder) {
      // create a DOM element in the bottom placeholder for the application customizer to render
      this._bottomPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Bottom, { onDispose: this._handleDispose });
    }

    // if the top placeholder is not available, there is no place in the UI
    // for the app customizer to render, so quit.
    if (!this._bottomPlaceholder) {
      return;
    }

    const links: ILinkGroup[] = await this.loadLinks();

    const element: React.ReactElement<IPortalFooterProps> = React.createElement(
      PortalFooter,
      {
        links: links,
        copyright: this.properties.copyright,
        support: this.properties.support,
        onLinksEdit: this._editLinks,
      }
    );

    // render the UI using a React component
    ReactDom.render(element, this._bottomPlaceholder.domElement);
  }
```