import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch, h } from '@stencil/core';

/**
 * Tabs are used to display multiple panels to be contained within a single
 * window, using tabs as a navigational element.
 *
 * @part tab - The header of the tab.
 * @part more - An optional more button to display additional tabs.
 */
@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: {
    delegatesFocus: true
  }
})
export class CatTabs {
  private mutationObserver?: MutationObserver;

  @Element() hostElement!: HTMLElement;

  @State() tabs: HTMLCatTabElement[] = [];

  /**
   * The ID of the active tab.
   */
  @Prop({ mutable: true, reflect: true }) activeTab = '';

  /**
   * The alignment of the tabs.
   */
  @Prop() tabsAlign: 'left' | 'center' | 'right' | 'justify' = 'left';

  componentWillLoad(): void {
    this.syncTabs();
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

  @Watch('activeTab')
  onActiveTabChange(id: string) {
    const index = this.tabs.findIndex(tab => tab.id === id);
    this.catChange.emit({ id, index });
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
      const elements = this.hostElement.shadowRoot?.querySelectorAll<HTMLCatButtonElement>('cat-button[role="tab"]');
      const targetElements = Array.from(elements ?? []).filter(button => !button.disabled);
      const activeElement = this.hostElement.shadowRoot?.activeElement as HTMLCatButtonElement;
      const activeIdx = activeElement ? targetElements.indexOf(activeElement) : -1;
      const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
      targetElements[targetIdx].doFocus();
      event.preventDefault();
    }
  }

  /**
   * Activates the tab with the given id.
   *
   * @param id The tab id.
   */
  @Method()
  async setActive(id: string): Promise<void> {
    this.activate(this.tabs.find(tab => tab.id === id));
  }

  /**
   * Activates the tab with the given index.
   *
   * @param index The tab index.
   */
  @Method()
  async setActiveIndex(index: number): Promise<void> {
    this.activate(this.tabs[index]);
  }

  /**
   * Emitted when active tab is changed.
   */
  @Event() catChange!: EventEmitter<{ id: string; index: number }>;

  render() {
    this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
    return (
      <Host>
        {this.tabs.map((tab: HTMLCatTabElement) => {
          return (
            <cat-button
              buttonId={tab.id}
              role="tab"
              part="tab"
              class={{
                'cat-tab': true,
                'cat-tab-active': tab.id === this.activeTab,
                'cat-tab-error': tab.error
              }}
              active={tab.id === this.activeTab}
              color={tab.error ? 'danger' : tab.id === this.activeTab ? 'primary' : 'secondary'}
              variant="text"
              icon={tab.icon ? (tab.error ? '$cat:input-error' : tab.icon) : undefined}
              iconOnly={tab.iconOnly}
              iconRight={tab.iconRight}
              url={tab.url}
              disabled={tab.deactivated}
              urlTarget={tab.urlTarget}
              onCatClick={() => this.click(tab)}
              testId={tab.testId}
              nativeAttributes={{ ...tab.nativeAttributes }}
              nativeContentAttributes={{ 'data-text': tab.label }}
              data-dropdown-no-close
            >
              {tab.label}
            </cat-button>
          );
        })}
        <slot name="more"></slot>
      </Host>
    );
  }

  private syncTabs() {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    this.activeTab = this.activeTab || this.tabs.filter(tab => this.canActivate(tab) && !tab.noActive)[0]?.id;
  }

  private click(tab: HTMLCatTabElement) {
    if (this.canActivate(tab)) {
      tab.click();
      if (!tab.noActive) {
        this.activate(tab);
      }
    }
  }

  private activate(tab?: HTMLCatTabElement) {
    if (!tab) {
      this.activeTab = '';
    } else if (this.canActivate(tab)) {
      this.activeTab = tab.id;
    }
  }

  private canActivate(tab: HTMLCatTabElement) {
    return !tab.deactivated && !tab.url && tab.id !== this.activeTab;
  }
}
