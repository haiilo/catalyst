import { Component, h, Element, State, Watch, Listen, Host, Prop } from '@stencil/core';

@Component({
  tag: 'cat-tabs',
  styleUrl: 'cat-tabs.scss',
  shadow: true
})
export class CatTabs {
  private tabs: HTMLCatTabElement[] = [];

  @Element() hostElement!: HTMLElement;

  @State() activeTab = -1;

  @Prop() tabsAlign?: 'left' | 'center' | 'justify';

  @Watch('activeTab')
  watchActiveTabHandler(newActiveTab: number, prevActiveTab: number) {
    if (prevActiveTab >= 0) {
      this.tabs[prevActiveTab].active = false;
      this.tabs[newActiveTab].active = true;
    }
  }

  componentWillLoad(): void {
    this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
    this.activeTab = this.tabs.findIndex(value => value.active);
    this.tabs.forEach(tab => this.tabsAlign && (tab.tabAlign = this.tabsAlign));
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    const tab = event.target as HTMLCatTabElement;
    const tabIndex = this.tabs.indexOf(tab);
    if (tabIndex >= 0) this.activeTab = tabIndex;
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
      const activeTabElement = document.activeElement as HTMLCatTabElement;
      const activeIdx = activeTabElement ? this.tabs.indexOf(activeTabElement) : -1;
      const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + this.tabs.length) % this.tabs.length;
      this.tabs[targetIdx].setFocus();
      event.preventDefault();
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
