import { Component, Host, h, Element, State } from '@stencil/core';

@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: true
})
export class CatTabs {
  private tabs: HTMLCatTabElement[] = [];
  @State() activeTab = -1;
  @Element() hostElement!: HTMLElement;

  componentWillLoad(): void {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    this.activeTab = this.tabs.findIndex(value => value.active);
  }

  componentWillRender() {
    this.tabs.forEach(value => (value.active = false));
    this.tabs[this.activeTab].active = true;
  }

  render() {
    return (
      <Host>
        {this.tabs.map((tab: HTMLCatTabElement, index: number) => {
          return (
            <cat-button
              class={{ 'tab-active': tab.active }}
              color={tab.active ? 'primary' : 'secondary'}
              variant="text"
              icon={tab.icon}
              iconOnly={tab.iconOnly}
              iconRight={tab.iconRight}
              onCatClick={() => (this.activeTab = index)}
            >
              {tab.label}
            </cat-button>
          );
        })}
      </Host>
    );
  }
}
