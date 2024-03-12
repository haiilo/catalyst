import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'cat-date',
  styleUrl: 'cat-date.scss',
  shadow: true
})
export class CatDate {
  private readonly daysShort = this.daysForLocale('en', 'short');
  private readonly daysLong = this.daysForLocale('en', 'long');
  private readonly months = this.monthsForLocale('en');

  @State() viewDate: Date = new Date(); // must be first of month

  private days(date: Date) {
    const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const days = [...Array(daysInMonth).keys()];
    const daysBefore = [...Array(firstDayOfWeek).keys()].map(day =>
      new Date(date.getFullYear(), date.getMonth(), day - firstDayOfWeek).getDate()
    );
    const daysAfter = [...Array(42 - days.length - daysBefore.length).keys()];
    return [
      ...daysBefore.map(day => ({day: day + 1, disabled: true, today: false})),
      ...days.map(day => ({day: day + 1, disabled: false})),
      ...daysAfter.map(day => ({day: day + 1, disabled: true, today: false}))
    ];
  }

  render() {
    console.log(this.days(this.viewDate));
    return (
      <Host>
        <div id="myDatepicker" class="datepicker">
          <div id="id-datepicker-1" role="dialog" aria-modal="true" aria-label="Choose Date">
            <div class="header">
              <cat-button
                icon='$cat:datepicker-year-prev' iconOnly
                size='xs'
                a11y-label="previous year"
                onClick={() => (this.viewDate = new Date(this.viewDate.setFullYear(this.viewDate.getFullYear() - 1)))}
              >
                prev year
              </cat-button>
              <cat-button
                icon='$cat:datepicker-month-prev'
                iconOnly
                size='xs'
                a11y-label="previous month"
                onClick={() => (this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1)))}
              >
                prev month
              </cat-button>
              <h3 id="id-grid-label" aria-live="polite">
                {this.months[this.viewDate.getMonth()]} {this.viewDate.getFullYear()}
              </h3>
              <cat-button
                icon='$cat:datepicker-month-next'
                iconOnly
                size='xs'
                a11y-label="next month"
                onClick={() => (this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1)))}
              >
                next month
              </cat-button>
              <cat-button
                icon='$cat:datepicker-year-next'
                iconOnly
                size='xs'
                a11y-label="next year"
                onClick={() => (this.viewDate = new Date(this.viewDate.setFullYear(this.viewDate.getFullYear() + 1)))}
              >
                next year
              </cat-button>
            </div>
            <div class="table-wrap">
              <table role="grid" aria-labelledby="id-grid-label">
                <thead>
                  <tr>
                    {Array.from(Array(7), (_, i) => (
                      <th scope="col" abbr={this.daysLong[i]}>
                        {this.daysShort[i]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(Array(6), (_, i) => (
                    <tr>
                      {Array.from(Array(7), (_, j) => (
                        <td 
                        class={{ 'day-disabled': this.days(this.viewDate)[i * 7 + j].disabled }}
                        >
                          <cat-button size="s">
                          {this.days(this.viewDate)[i * 7 + j].day}
                          </cat-button>
                          </td>
                      ))}
                    </tr>
                  ))}

                  {/* {this.days(this.viewDate).map((day, index) => (
                    <tr key={index}>
                      {Array.from(Array(7), (_, i) => (
                        <td
                          tabindex="-1"
                          data-date={`${this.viewDate.getUTCFullYear()}-${this.viewDate.getUTCMonth() + 1}-${day}`}
                        >
                          {day}
                        </td>
                      ))}
                    </tr>
                  ))} */}

                  {/* <tr>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td tabindex="-1" data-date="2020-02-01">
                      1
                    </td>
                  </tr>
                  <tr>
                    <td tabindex="-1" data-date="2020-02-02">
                      2
                    </td>
                    <td tabindex="-1" data-date="2020-02-03">
                      3
                    </td>
                    <td tabindex="-1" data-date="2020-02-04">
                      4
                    </td>
                    <td tabindex="-1" data-date="2020-02-05">
                      5
                    </td>
                    <td tabindex="-1" data-date="2020-02-06">
                      6
                    </td>
                    <td tabindex="-1" data-date="2020-02-07">
                      7
                    </td>
                    <td tabindex="-1" data-date="2020-02-08">
                      8
                    </td>
                  </tr>
                  <tr>
                    <td tabindex="-1" data-date="2020-02-09">
                      9
                    </td>
                    <td tabindex="-1" data-date="2020-02-10">
                      10
                    </td>
                    <td tabindex="-1" data-date="2020-02-11">
                      11
                    </td>
                    <td tabindex="-1" data-date="2020-02-12">
                      12
                    </td>
                    <td tabindex="-1" data-date="2020-02-13">
                      13
                    </td>
                    <td tabindex="0" data-date="2020-02-14" role="gridcell" aria-selected="true">
                      14
                    </td>
                    <td tabindex="-1" data-date="2020-02-15">
                      15
                    </td>
                  </tr>
                  <tr>
                    <td tabindex="-1" data-date="2020-02-16">
                      16
                    </td>
                    <td tabindex="-1" data-date="2020-02-17">
                      17
                    </td>
                    <td tabindex="-1" data-date="2020-02-18">
                      18
                    </td>
                    <td tabindex="-1" data-date="2020-02-19">
                      19
                    </td>
                    <td tabindex="-1" data-date="2020-02-20">
                      20
                    </td>
                    <td tabindex="-1" data-date="2020-02-21">
                      21
                    </td>
                    <td tabindex="-1" data-date="2020-02-22">
                      22
                    </td>
                  </tr>
                  <tr>
                    <td tabindex="-1" data-date="2020-02-23">
                      23
                    </td>
                    <td tabindex="-1" data-date="2020-02-24">
                      24
                    </td>
                    <td tabindex="-1" data-date="2020-02-25">
                      25
                    </td>
                    <td tabindex="-1" data-date="2020-02-26">
                      26
                    </td>
                    <td tabindex="-1" data-date="2020-02-27">
                      27
                    </td>
                    <td tabindex="-1" data-date="2020-02-28">
                      28
                    </td>
                    <td tabindex="-1" data-date="2020-02-29">
                      29
                    </td>
                  </tr>
                  <tr>
                    <td tabindex="-1" data-date="2020-02-30">
                      30
                    </td>
                    <td tabindex="-1" data-date="2020-02-31">
                      31
                    </td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                    <td class="disabled" tabindex="-1"></td>
                  </tr> */}
                </tbody>
              </table>
            </div>
            <div class="dialog-message" aria-live="polite"></div>
          </div>
        </div>
      </Host>
    );
  }

  private daysForLocale(language: string, weekday: 'long' | 'short' | 'narrow' = 'long') {
    const date = new Date();
    const firstDayOfWeek = (date.getUTCDate() - date.getUTCDay() + 7) % 7;
    const format = new Intl.DateTimeFormat(language, { weekday }).format;
    return [...Array(7).keys()].map(day => format(new Date(date.getTime()).setUTCDate(firstDayOfWeek + day)));
  }

  private monthsForLocale(language: string, month: 'long' | 'short' = 'long') {
    const date = new Date(0);
    const format = new Intl.DateTimeFormat(language, { month }).format;
    return [...Array(12).keys()].map(month => format(new Date(date.getTime()).setUTCMonth(month)));
  }
}
