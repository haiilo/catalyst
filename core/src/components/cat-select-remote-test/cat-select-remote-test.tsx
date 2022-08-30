import { Component, h, Host } from '@stencil/core';
import { of, delay } from 'rxjs';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  desc: string;
}

@Component({
  tag: 'cat-select-remote-test',
  shadow: true
})
export class CatSelectRemoteTest {
  private multipleSelect?: HTMLCatSelectRemoteElement;
  private singleSelect?: HTMLCatSelectRemoteElement;

  componentDidRender(): void {
    this.multipleSelect?.connect({
      resolve: (ids: string[]) => {
        console.info(`Resolving data... (${ids.join(', ')})`);
        return of(
          ids.map(id => ({
            id,
            firstName: 'John',
            lastName: `Doe (${id})`,
            desc: 'resolved'
          }))
        ).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        return term === 'no'
          ? of({ last: true, content: [], totalElements: 0 })
          : of({
              last: false,
              totalElements: 10000,
              content: Array.from({ length: 10 }, (_, i) => ({
                id: '' + (i + page * 10),
                firstName: 'John',
                lastName: `Doe (${i + page * 10})`,
                desc: `"${term}": page ${page}`
              }))
            }).pipe(delay(500));
      },
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc
      })
    });
    this.singleSelect?.connect({
      resolveSingle: (id: string) => {
        console.info(`Resolving data... (${id})`);
        return of({
          id,
          firstName: 'John',
          lastName: `Doe (${id})`,
          desc: 'resolved'
        }).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        return term === 'no'
          ? of({ last: true, content: [], totalElements: 0 })
          : of({
              last: false,
              totalElements: 10000,
              content: Array.from({ length: 10 }, (_, i) => ({
                id: '' + (i + page * 10),
                firstName: 'John',
                lastName: `Doe (${i + page * 10})`,
                desc: `"${term}": page ${page}`
              }))
            }).pipe(delay(500));
      },
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc
      })
    });
  }

  render() {
    return (
      <Host>
        <cat-select-remote
          label="Multiple Select"
          hint="This is a hint!"
          ref={el => (this.multipleSelect = el)}
          value={['1']}
          placeholder="Hello World"
          multiple
        >
          <span slot="hint">Searching for "no" -{'>'} no options are returned!</span>
        </cat-select-remote>
        <cat-select-remote
          label="Single Select"
          hint="This is a hint!"
          ref={el => (this.singleSelect = el)}
          value={'1'}
          placeholder="Hello World"
        ></cat-select-remote>
      </Host>
    );
  }
}
