import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

@Component({
  tag: 'cat-tab',
  styleUrl: 'cat-tab.css',
  shadow: true
})
export class CatTab {
  /**
   * The label of the tab
   */
  @Prop() label = '';

  /**
   * Activate the tab
   */
  @Prop() active = false;

  /**
   * The name of an icon to be displayed in the tab.
   */
  @Prop() icon?: string;

  /**
   * Hide the actual button content and only display the tab.
   */
  @Prop() iconOnly: boolean | Breakpoint = false;

  /**
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

  /**
   * A destination to link to, rendered in the href attribute of a link.
   */
  @Prop() url?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop() urlTarget?: '_blank' | '_self';

  @Event() tabClick!: EventEmitter<CustomEvent<MouseEvent>>;

  render() {
    return (
      <cat-button
        class={{ 'tab-active': this.active }}
        color={this.active ? 'primary' : 'secondary'}
        variant="text"
        icon={this.icon}
        iconOnly={this.iconOnly}
        iconRight={this.iconRight}
        url={this.url}
        urlTarget={this.urlTarget}
        onCatClick={this.onCatClick.bind(this)}
      >
        {this.label}
      </cat-button>
    );
  }

  private onCatClick(event: CustomEvent<MouseEvent>) {
    this.tabClick.emit(event);
  }
}
