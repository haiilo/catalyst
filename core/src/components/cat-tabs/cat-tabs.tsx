import { Component, h, Element, State, Watch, Listen, Host, Prop } from '@stencil/core';

/**
 * Tabs are used to display multiple panels to be contained within a single
 * window, using tabs as a navigational element.
 *
 * @part tab - The header of the tab.
 */
@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: true
})
export class CatTabs {
  private buttons: HTMLCatButtonElement[] = [];
  private mutationObserver?: MutationObserver;

  @Element() hostElement!: HTMLElement;

  @State() tabs: HTMLCatTabElement[] = [];

  @State() activeTabId?: string;

  /**
   * The ID of the active tab.
   */
  @Prop() activeTab = '';

  /**
   * The alignment of the tabs.
   */
  @Prop() tabsAlign: 'left' | 'center' | 'right' | 'justify' = 'left';

  @Watch('activeTabId')
  onActiveTabChanged(newActiveTab: string): void {
    const activeTab = this.tabs.find(value => value.id === newActiveTab);
    activeTab?.click();
  }

  componentWillLoad(): void {
    this.syncTabs();
    if (this.tabs.length) {
      this.activeTabId = this.activeTab;
    }
  }

  componentDidLoad() {
    this.mutationObserver = new MutationObserver(
      mutations => mutations.some(value => value.target.nodeName === 'CAT-TAB') && this.syncTabs()
    );

    this.mutationObserver?.observe(this.hostElement, {
      childList: true,
      attributes: true,
      subtree: true
    });
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
      const targetElements = this.buttons.filter(button => !button.disabled);
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
                'cat-tab': true,
                'cat-tab-active': Boolean(this.activeTabId && tab.id === this.activeTabId)
              }}
              active={Boolean(this.activeTabId && tab.id === this.activeTabId)}
              color={this.activeTabId && tab.id === this.activeTabId ? 'primary' : 'secondary'}
              variant="text"
              icon={tab.icon}
              iconOnly={tab.iconOnly}
              iconRight={tab.iconRight}
              url={tab.url}
              disabled={tab.deactivated}
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

  private syncTabs() {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
  }
}
