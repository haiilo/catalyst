import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch, h } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

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
  private moreDropdown?: HTMLCatDropdownElement;
  private moreButton?: HTMLCatButtonElement;
  private readonly resizedObserver = new ResizeObserver(() => this.adjustAdaptiveTabs());

  @Element() hostElement!: HTMLElement;

  @State() tabs: HTMLCatTabElement[] = [];
  @State() hiddenTabs: HTMLCatTabElement[] = [];

  /**
   * The ID of the active tab.
   */
  @Prop({ mutable: true, reflect: true }) activeTab = '';

  /**
   * The alignment of the tabs.
   */
  @Prop() tabsAlign: 'left' | 'center' | 'right' | 'justify' = 'left';

  /**
   * Whether the visible items change according to the available space. A 'More' button is used to reveal hidden items.
   */
  @Prop() adaptive = false;

  /**
   * Whether the active tab should always be visible. Applied when adaptive is enabled.
   * Has less priority than sticky if there is no space to show both.
   */
  @Prop() activeTabAlwaysVisible = false;

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

    if (this.adaptive) {
      this.resizedObserver.observe(this.hostElement);
      requestAnimationFrame(() => {
        this.adjustAdaptiveTabs();
      });
    }
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  @Watch('activeTab')
  onActiveTabChange(id: string) {
    const index = this.tabs.findIndex(tab => tab.id === id);
    this.catChange.emit({ id, index, fromDropdown: !!this.hiddenTabs.find(tab => tab.id === id) });
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
   * Recalculates visible and hidden adaptive tabs.
   */
  @Method()
  async updateAdaptiveTabs(): Promise<void> {
    if (this.adaptive) {
      this.adjustAdaptiveTabs();
    }
  }

  /**
   * Emitted when active tab is changed.
   */
  @Event() catChange!: EventEmitter<{ id: string; index: number; fromDropdown: boolean }>;

  render() {
    this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
    return (
      <Host>
        <div role="tablist" class="cat-tab-list">
          {this.tabs.map((tab: HTMLCatTabElement, index: number) => {
            return (
              <cat-button
                buttonId={tab.id}
                part="tab"
                class={{
                  'cat-tab': true,
                  'cat-tab-active': tab.id === this.activeTab,
                  'cat-tab-error': tab.error,
                  'cat-tab-sticky': tab.sticky
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
                nativeAttributes={{
                  ...tab.nativeAttributes,
                  role: 'tab',
                  'aria-selected': String(tab.id === this.activeTab),
                  'aria-setsize': String(this.tabs.length),
                  'aria-posinset': String(index + 1)
                }}
                nativeContentAttributes={{ 'data-text': tab.label }}
                data-dropdown-no-close
              >
                {tab.label}
              </cat-button>
            );
          })}
          {this.adaptive ? (
            <cat-dropdown ref={el => (this.moreDropdown = el as HTMLCatDropdownElement)}>
              <cat-button
                ref={el => (this.moreButton = el as HTMLCatButtonElement)}
                class={{
                  'cat-tab-more-button': true,
                  'cat-tab-active': !!this.hiddenTabs.find(tab => tab.id === this.activeTab)
                }}
                iconRight
                icon={this.moreDropdown?.isOpen ? 'chevron-up-outlined' : 'chevron-down-outlined'}
                slot="trigger"
                part="more"
                variant="text"
                color={this.hiddenTabs.find(tab => tab.id === this.activeTab) ? 'primary' : 'secondary'}
              >
                {i18n.t('tabs.more')}
              </cat-button>
              <nav slot="content">
                <ul>
                  {this.hiddenTabs.map((tab: HTMLCatTabElement, index: number) => {
                    return (
                      <li>
                        <cat-button
                          class="cat-nav-item"
                          active={tab.id === this.activeTab}
                          urlTarget={tab.urlTarget}
                          onCatClick={() => this.click(tab)}
                          testId={tab.testId}
                          nativeAttributes={{
                            ...tab.nativeAttributes,
                            role: 'tab',
                            'aria-selected': String(tab.id === this.activeTab),
                            'aria-setsize': String(this.tabs.length),
                            'aria-posinset': String(index + 1)
                          }}
                          nativeContentAttributes={{ 'data-text': tab.label }}
                        >
                          {tab.label}
                        </cat-button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </cat-dropdown>
          ) : null}
        </div>
      </Host>
    );
  }

  private adjustAdaptiveTabs() {
    const tabs = this.hostElement.shadowRoot?.querySelectorAll('.cat-tab') as NodeListOf<HTMLCatButtonElement>;
    if (!tabs?.length) {
      return;
    }

    // show all hidden tabs for correct calculation
    for (const tab of tabs) {
      tab.style.display = 'inline-flex';
    }
    // show hidden "more" button for correct calculation
    if (this.moreButton) {
      this.moreButton.style.display = 'inline-flex';
    }

    const MORE_WIDTH = this.moreButton?.getBoundingClientRect().width || 0;
    const visibleTabsIndexes: string[] = [];
    const containerWidth = this.hostElement.clientWidth;
    let fittingWidth = 0;

    const stickyTabIndex = this.tabs.findIndex(tab => tab.sticky);
    const stickyTabWidth = tabs.item(stickyTabIndex)?.getBoundingClientRect().width || 0;
    const stickyTabIsVisible = stickyTabIndex > -1 && stickyTabWidth + MORE_WIDTH <= containerWidth;

    const activeTabIndex = this.tabs.findIndex(tab => tab.id === this.activeTab);
    const activeTabWidth = tabs.item(activeTabIndex)?.getBoundingClientRect().width || 0;
    const activeTabIsVisible =
      this.activeTabAlwaysVisible &&
      activeTabIndex > -1 &&
      activeTabWidth + stickyTabWidth + MORE_WIDTH <= containerWidth;

    if (stickyTabIsVisible) {
      fittingWidth += stickyTabWidth;
      visibleTabsIndexes.push(stickyTabIndex.toString());
    }

    if (activeTabIsVisible && stickyTabIndex !== activeTabIndex) {
      fittingWidth += activeTabWidth;
      visibleTabsIndexes.push(activeTabIndex.toString());
    }

    for (const [index, tab] of tabs.entries()) {
      if ((activeTabIsVisible && index === activeTabIndex) || (stickyTabIsVisible && index === stickyTabIndex)) {
        continue;
      }

      const tabWidth = tab.getBoundingClientRect().width;

      if (fittingWidth + tabWidth <= containerWidth) {
        // tab fits within tabs parent
        fittingWidth += tabWidth;
        visibleTabsIndexes.push(index.toString());
      } else if (fittingWidth + MORE_WIDTH <= containerWidth) {
        // tab doesn't fit, but more button does
        break;
      } else {
        // tab doesn't fit and more button doesn't fit either
        // remove last fitting tab so that more button fits
        visibleTabsIndexes.pop();
        break;
      }
    }

    this.hiddenTabs = this.tabs.filter((_, index) => !visibleTabsIndexes.includes(index.toString()));

    if (this.moreButton) {
      if (this.tabs.length > visibleTabsIndexes.length) {
        this.moreButton.style.display = 'inline-flex';
      } else {
        this.moreButton.style.display = 'none';
      }
    }
    for (const [index, tab] of tabs.entries()) {
      if (!visibleTabsIndexes.includes(index.toString())) {
        tab.style.display = 'none';
      }
    }
  }

  private syncTabs() {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    this.activeTab = this.activeTab || this.tabs.filter(tab => this.canActivate(tab) && !tab.noActive)[0]?.id;
    if (this.adaptive) {
      this.adjustAdaptiveTabs();
    }
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
    if (this.adaptive) {
      this.adjustAdaptiveTabs();
    }
  }

  private canActivate(tab: HTMLCatTabElement) {
    return !tab.deactivated && !tab.url && tab.id !== this.activeTab;
  }
}
