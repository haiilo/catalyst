import { Component, h, Element, State, Watch, Listen, Host, Prop } from '@stencil/core';

@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: true
})
export class CatTabs {
  private tabs: HTMLCatTabElement[] = [];
  private buttons: HTMLCatButtonElement[] = [];

  @Element() hostElement!: HTMLElement;

  @State() activeTab = 0;

  /**
   * The tabs alignment
   */
  @Prop() tabsAlign: 'left' | 'center' | 'justify' = 'left';

  @Watch('activeTab')
  onActiveTabChanged(newActiveTab: number, prevActiveTab = 0): void {
    this.tabs[prevActiveTab].active = false;
    this.tabs[newActiveTab].active = true;
    this.tabs[newActiveTab].click();
  }

  componentWillLoad(): void {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    if (this.tabs.length > 0) this.activeTab = this.tabs.findIndex(value => value.active);
  }

  componentDidRender(): void {
    this.buttons.forEach((button: HTMLCatButtonElement, index: number) => {
      const element = button.shadowRoot?.querySelector('button');
      element?.setAttribute('tabindex', this.tabs[index].active ? '0' : '-1');
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
        {this.tabs.map((tab: HTMLCatTabElement, index: number) => {
          return (
            <cat-button
              ref={el => el && this.updateButtonsRef(el)}
              part="tab"
              class={{
                tab: true,
                'tab-active': tab.active,
                [`tab-align-${this.tabsAlign}`]: Boolean(this.tabsAlign)
              }}
              color={tab.active ? 'primary' : 'secondary'}
              variant="text"
              icon={tab.icon}
              iconOnly={tab.iconOnly}
              iconRight={tab.iconRight}
              url={tab.url}
              urlTarget={tab.urlTarget}
              onCatClick={() => (this.activeTab = index)}
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
