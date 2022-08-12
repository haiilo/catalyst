import { Component, h } from '@stencil/core';
import { of } from 'rxjs';

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
  private select?: HTMLCatSelectRemoteElement;

  componentDidLoad(): void {
    this.select?.connect({
      resolve: (ids: string[]) =>
        of(
          ids.map(id => ({
            id,
            firstName: 'John',
            lastName: `Doe (${id})`,
            desc: 'resolved'
          }))
        ),
      retrieve: (term: string, page: number) =>
        of({
          last: false,
          content: Array.from({ length: 10 }, (_, i) => ({
            id: '' + (i + page * 10),
            firstName: 'John',
            lastName: `Doe (${i + page * 10})`,
            desc: `"${term}": page ${page}`
          }))
        }),
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc
      })
    });
  }

  render() {
    return <cat-select-remote ref={el => (this.select = el)} value={['0', '1', '2']}></cat-select-remote>;
  }
}
