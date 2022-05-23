import { Component, h, Element, State, Watch } from '@stencil/core';

@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: true
})
export class CatTabs {
  private tabs: HTMLCatTabElement[] = [];

  @Element() hostElement!: HTMLElement;

  @State() activeTab = -1;

  @Watch('activeTab')
  watchActiveTabHandler(newActiveTab: number, prevActiveTab: number) {
    if (prevActiveTab !== -1) {
      this.tabs[prevActiveTab].active = false;
      this.tabs[newActiveTab].active = true;
    }
  }

  componentWillLoad(): void {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    this.activeTab = this.tabs.findIndex(value => value.active);
  }

  render() {
    return (
      <div class="tabs" onClick={this.onClick.bind(this)}>
        <slot></slot>
      </div>
    );
  }

  private onClick(event: MouseEvent) {
    const tab = event.target as HTMLCatTabElement;
    const number = this.tabs.findIndex(value => value === tab);
    if (number >= 0) this.activeTab = number;
  }
}
