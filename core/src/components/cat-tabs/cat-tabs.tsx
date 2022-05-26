import { Component, h, Element, State, Watch, Listen, Host, Prop } from '@stencil/core';

/**
 * @part tab - The header of the tab.
 */
@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: true
})
export class CatTabs {
  private tabs: HTMLCatTabElement[] = [];
  private buttons: HTMLCatButtonElement[] = [];

  @Element() hostElement!: HTMLElement;

  @State() activeTabId?: string;

  /**
   * The ID of the active tab.
   */
  @Prop() activeTab = '';

  /**
   * The tabs alignment
   */
  @Prop() tabsAlign: 'left' | 'center' | 'justify' = 'left';

  @Watch('activeTabId')
  onActiveTabChanged(newActiveTab: string): void {
    const activeTab = this.tabs.find(value => value.id === newActiveTab);
    activeTab?.click();
  }

  componentWillLoad(): void {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    if (this.tabs.length > 0) {
      let nextUniqueId = 0;
      this.tabs.forEach(tab => {
        if (!tab.id) tab.id = `cat-checkbox-${nextUniqueId++}`;
      });
      this.activeTabId = this.activeTab;
    }
  }

  componentDidRender(): void {
    this.buttons.forEach((button: HTMLCatButtonElement) => {
      const element = button.shadowRoot?.querySelector('button');
      element?.setAttribute('tabindex', button.buttonId === this.activeTabId ? '0' : '-1');
    });
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
      const targetElements = this.buttons;
      const activeElement = this.hostElement.shadowRoot?.activeElement as HTMLCatButtonElement;
      const activeIdx = activeElement ? targetElements.indexOf(activeElement) : -1;
      const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
      targetElements[targetIdx].setFocus();
      event.preventDefault();
    }
  }

  render() {
    return (
      <Host>
        {this.tabs.map((tab: HTMLCatTabElement) => {
          return (
            <cat-button
              ref={el => el && this.updateButtonsRef(el)}
              buttonId={tab.id}
              role="tab"
              part="tab"
              class={{
                tab: true,
                'tab-active': tab.id === this.activeTabId,
                [`tab-align-${this.tabsAlign}`]: Boolean(this.tabsAlign)
              }}
              color={tab.id === this.activeTabId ? 'primary' : 'secondary'}
              variant="text"
              icon={tab.icon}
              iconOnly={tab.iconOnly}
              iconRight={tab.iconRight}
              url={tab.url}
              urlTarget={tab.urlTarget}
              onCatClick={() => (this.activeTabId = tab.id)}
            >
              {tab.label}
            </cat-button>
          );
        })}
      </Host>
    );
  }

  private updateButtonsRef(button: HTMLCatButtonElement) {
    const indexOf = this.buttons.indexOf(button);

    if (indexOf >= 0) {
      this.buttons[indexOf] = button;
    } else {
      this.buttons.push(button);
    }
  }
}
