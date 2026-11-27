import {
  CatButton,
  CatDropdown,
  CatMenu,
  CatMenuItem,
  CatPagination,
  CatScrollable,
  CatSegment,
  CatSegmentedControl,
  CatTab,
  CatTabs
} from '@haiilo/catalyst-react';
import React, { useState } from 'react';
import { Value } from '../Section';

const tabContent: Record<string, string> = {
  overview: 'Overview content.',
  details: 'Details content.',
  settings: 'Settings content.'
};

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <CatTabs activeTab={activeTab} onCatChange={e => setActiveTab(String(e.detail.id))}>
        <CatTab id="overview" label="Overview" />
        <CatTab id="details" label="Details" icon="sparkle-filled" />
        <CatTab id="settings" label="Settings" />
        <CatTab id="disabled" label="Disabled" deactivated />
      </CatTabs>
      <p>{tabContent[activeTab]}</p>
      <Value value={{ activeTab }} />
    </>
  );
}

export function SegmentedControlDemo() {
  const [segment, setSegment] = useState<unknown>('day');

  return (
    <>
      <CatSegmentedControl value={segment as string} onCatChange={e => setSegment(e.detail)}>
        <CatSegment value="day">Day</CatSegment>
        <CatSegment value="week">Week</CatSegment>
        <CatSegment value="month">Month</CatSegment>
        <CatSegment value="year" disabled>
          Year
        </CatSegment>
      </CatSegmentedControl>
      <Value value={{ segment }} />
    </>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(0);

  return (
    <>
      <div className="demo-stack">
        <CatPagination page={page} pageCount={10} onCatChange={e => setPage(e.detail)} />
        <CatPagination page={page} pageCount={10} compact onCatChange={e => setPage(e.detail)} />
        <CatPagination page={page} pageCount={10} variant="outlined" round onCatChange={e => setPage(e.detail)} />
      </div>
      <Value value={{ page }} />
    </>
  );
}

export function MenuDemo() {
  const [menuAction, setMenuAction] = useState('');

  return (
    <>
      <div className="demo-row">
        <CatMenu triggerLabel="Actions">
          <CatMenuItem icon="pen-outlined" onCatClick={() => setMenuAction('edit')}>
            Edit
          </CatMenuItem>
          <CatMenuItem icon="copy-outlined" onCatClick={() => setMenuAction('duplicate')}>
            Duplicate
          </CatMenuItem>
          <CatMenuItem icon="archive-outlined" disabled>
            Archive
          </CatMenuItem>
          <hr />
          <CatMenuItem icon="trash-outlined" color="danger" onCatClick={() => setMenuAction('delete')}>
            Delete
          </CatMenuItem>
        </CatMenu>
        <CatMenu triggerIcon="settings-outlined" triggerIconOnly triggerVariant="text">
          <CatMenuItem icon="user-outlined">Profile</CatMenuItem>
          <CatMenuItem icon="bell-outlined">Notifications</CatMenuItem>
        </CatMenu>
      </div>
      <Value value={{ menuAction }} />
    </>
  );
}

export function DropdownDemo() {
  return (
    <div className="demo-row">
      <CatDropdown>
        <CatButton slot="trigger">Open dropdown</CatButton>
        <nav slot="content">
          <ul>
            <li className="cat-nav-head">Headline</li>
            <li className="cat-nav-text cat-muted">Any content can go into a dropdown.</li>
            <li>
              <CatButton className="cat-nav-item" icon="sparkle-filled" color="primary">
                Nav item 1
              </CatButton>
            </li>
            <li>
              <CatButton className="cat-nav-item" icon="sparkle-filled">
                Nav item 2
              </CatButton>
            </li>
          </ul>
        </nav>
      </CatDropdown>
      <CatDropdown noAutoClose>
        <CatButton slot="trigger">No auto close</CatButton>
        <div slot="content" className="cat-p-m">
          Clicking inside does not close this dropdown.
        </div>
      </CatDropdown>
    </div>
  );
}

export function ScrollableDemo() {
  return (
    <CatScrollable className="demo-scrollable">
      <div className="cat-p-m">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>Scrollable line {i + 1}</p>
        ))}
      </div>
    </CatScrollable>
  );
}
