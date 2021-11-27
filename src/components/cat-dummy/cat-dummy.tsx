import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop } from '@stencil/core';

@Component({
  tag: 'cat-dummy',
  styleUrl: 'cat-dummy.css',
  shadow: true,
})
export class CatDummy {

  @Prop() propStr: string;
  @Prop() propStrArr: string[];

  @Prop() propNum: number;
  @Prop() propNumArr: number[];

  @Prop() propBool: boolean;
  @Prop() propBoolArr: boolean[];

  @Prop() propObj: object;
  @Prop() propObjArr: object[];

  @Event() eventStr: EventEmitter<string>;

  @Event() eventNum: EventEmitter<number>;

  @Method()
  async logString(data: string) {
    console.log(data);
  }

  @Method()
  async logNum(data: number) {
    console.log(data);
  }

  @Listen('dummyEvent')
  dummyEventHandler(event: any) {
    console.log('Received dummy event: ', event);
  }

  emitEventStr(event: MouseEvent) {
    console.log(event);
    this.eventStr.emit('Hello world');
  }

  emitEventNum(event: MouseEvent) {
    console.log(event);
    this.eventNum.emit(42);
  }

  render() {
    return (
      <Host>
        <dl>
          <dt>String</dt>
          <dd><pre>{ JSON.stringify(this.propStr) }</pre></dd>
        </dl>
        <dl>
          <dt>String Array</dt>
          <dd><pre>{ JSON.stringify(this.propStrArr) }</pre></dd>
        </dl>
        <dl>
          <dt>Number</dt>
          <dd><pre>{ JSON.stringify(this.propNum) }</pre></dd>
        </dl>
        <dl>
          <dt>Number Array</dt>
          <dd><pre>{ JSON.stringify(this.propNumArr) }</pre></dd>
        </dl>
        <dl>
          <dt>Boolean</dt>
          <dd><pre>{ JSON.stringify(this.propBool) }</pre></dd>
        </dl>
        <dl>
          <dt>Boolean Array</dt>
          <dd><pre>{ JSON.stringify(this.propBoolArr) }</pre></dd>
        </dl>
        <dl>
          <dt>Object</dt>
          <dd><pre>{ JSON.stringify(this.propObj) }</pre></dd>
        </dl>
        <dl>
          <dt>Object Array</dt>
          <dd><pre>{ JSON.stringify(this.propObjArr) }</pre></dd>
        </dl>
        <dl>
          <dt>Slot</dt>
          <dd><slot></slot></dd>
        </dl>
        <button onClick={this.emitEventStr.bind(this)}>Emit String</button>
        <button onClick={this.emitEventNum.bind(this)}>Emit Number</button>
      </Host>
    );
  }
}
