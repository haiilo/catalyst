import React from 'react';
import { Section } from './Section';
import { AvatarDemo, BadgeDemo, ButtonDemo, ButtonGroupDemo, IconDemo } from './sections/Actions';
import { DateInlineDemo, DatepickerDemo, DatepickerInlineDemo, DateTimeDemo } from './sections/Dates';
import { AlertDemo, CardDemo, NotificationDemo, SkeletonDemo, SpinnerDemo, TooltipDemo } from './sections/Feedback';
import {
  CheckboxDemo,
  FormGroupDemo,
  InputDemo,
  RadioDemo,
  SelectDemo,
  TagDemo,
  TextareaDemo,
  ToggleDemo
} from './sections/Forms';
import { SelectShowcaseDemo } from './sections/Misc';
import {
  DropdownDemo,
  MenuDemo,
  PaginationDemo,
  ScrollableDemo,
  SegmentedControlDemo,
  TabsDemo
} from './sections/Navigation';

interface DemoSection {
  id: string;
  title: string;
  Demo: React.ComponentType;
}

// Single source for the sidebar and the page; sorted by title so both stay alphabetical.
const sections: DemoSection[] = [
  { id: 'alert', title: 'Alert', Demo: AlertDemo },
  { id: 'avatar', title: 'Avatar', Demo: AvatarDemo },
  { id: 'badge', title: 'Badge', Demo: BadgeDemo },
  { id: 'button', title: 'Button', Demo: ButtonDemo },
  { id: 'button-group', title: 'Button Group', Demo: ButtonGroupDemo },
  { id: 'card', title: 'Card', Demo: CardDemo },
  { id: 'checkbox', title: 'Checkbox', Demo: CheckboxDemo },
  { id: 'date-time', title: 'Date and Time', Demo: DateTimeDemo },
  { id: 'date-inline', title: 'Date Inline', Demo: DateInlineDemo },
  { id: 'datepicker', title: 'Datepicker', Demo: DatepickerDemo },
  { id: 'datepicker-inline', title: 'Datepicker Inline', Demo: DatepickerInlineDemo },
  { id: 'dropdown', title: 'Dropdown', Demo: DropdownDemo },
  { id: 'form-group', title: 'Form Group', Demo: FormGroupDemo },
  { id: 'icon', title: 'Icon', Demo: IconDemo },
  { id: 'input', title: 'Input', Demo: InputDemo },
  { id: 'menu', title: 'Menu', Demo: MenuDemo },
  { id: 'notification', title: 'Notification', Demo: NotificationDemo },
  { id: 'pagination', title: 'Pagination', Demo: PaginationDemo },
  { id: 'radio', title: 'Radio and Radio Group', Demo: RadioDemo },
  { id: 'scrollable', title: 'Scrollable', Demo: ScrollableDemo },
  { id: 'segmented-control', title: 'Segmented Control', Demo: SegmentedControlDemo },
  { id: 'select', title: 'Select', Demo: SelectDemo },
  { id: 'select-demo', title: 'Select Demo', Demo: SelectShowcaseDemo },
  { id: 'skeleton', title: 'Skeleton', Demo: SkeletonDemo },
  { id: 'spinner', title: 'Spinner', Demo: SpinnerDemo },
  { id: 'tabs', title: 'Tabs', Demo: TabsDemo },
  { id: 'tag', title: 'Tag', Demo: TagDemo },
  { id: 'textarea', title: 'Textarea', Demo: TextareaDemo },
  { id: 'toggle', title: 'Toggle', Demo: ToggleDemo },
  { id: 'tooltip', title: 'Tooltip', Demo: TooltipDemo }
].sort((a, b) => a.title.localeCompare(b.title, 'en'));

export function App() {
  return (
    <div className="demo">
      <nav className="demo-toc">
        <ul>
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <main className="demo-content">
        <h1>Catalyst React Demo</h1>
        {sections.map(({ id, title, Demo }) => (
          <Section key={id} id={id} title={title}>
            <Demo />
          </Section>
        ))}
      </main>
    </div>
  );
}
