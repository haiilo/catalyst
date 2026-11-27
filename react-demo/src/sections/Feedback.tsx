import { catNotificationService } from '@haiilo/catalyst';
import { CatAlert, CatButton, CatCard, CatSkeleton, CatSpinner, CatTooltip } from '@haiilo/catalyst-react';
import React from 'react';

const alertColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'none'] as const;
const sizes = ['xs', 's', 'm', 'l', 'xl'] as const;

function showNotifications() {
  catNotificationService.show('Item saved', {
    autoClose: false,
    closeButton: true,
    action: 'Show saved items'
  });
  catNotificationService.show('This is light', {
    mode: 'light',
    closeButton: true,
    icon: 'globe-outlined'
  });
  catNotificationService.show('Article was saved', {
    action: 'Undo',
    onAction: () => console.log('Undo clicked')
  });
}

export function AlertDemo() {
  return (
    <div className="demo-stack">
      {alertColors.map(color => (
        <CatAlert key={color} color={color}>
          This is a <strong>{color}</strong> alert.
        </CatAlert>
      ))}
      <CatAlert color="primary" noIcon>
        Alert without icon.
      </CatAlert>
      <CatAlert color="secondary" icon="cross-circle-filled">
        Alert with custom icon.
      </CatAlert>
    </div>
  );
}

export function NotificationDemo() {
  return <CatButton onCatClick={showNotifications}>Show notifications</CatButton>;
}

export function TooltipDemo() {
  return (
    <div className="demo-row">
      <CatTooltip content="This is a tooltip">
        <CatButton>Hover me</CatButton>
      </CatTooltip>
      <CatTooltip content="Small and round" size="s" round>
        <CatButton>Small round</CatButton>
      </CatTooltip>
      <CatTooltip content="Shown below" placement="bottom">
        <CatButton>Bottom</CatButton>
      </CatTooltip>
      <CatTooltip>
        <CatButton>Rich content</CatButton>
        <div slot="content">
          This is a <b>fancy</b> tooltip
          <br />
          with more lines.
        </div>
      </CatTooltip>
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <div className="demo-row">
      {sizes.map(size => (
        <CatSpinner key={size} size={size} />
      ))}
      <CatSpinner size="l" value={60} />
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className="demo-stack">
      <CatSkeleton />
      <CatSkeleton effect="plain" />
      <CatSkeleton variant="body" lines={3} />
      <div className="demo-row">
        <CatSkeleton variant="circle" size="l" />
        <CatSkeleton variant="square" size="l" />
      </div>
    </div>
  );
}

export function CardDemo() {
  return (
    <CatCard>
      <div className="cat-p-l">
        <h3>Card title</h3>
        <p>Cards group related content in a container with elevation.</p>
        <table className="cat-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Alice</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>Editor</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CatCard>
  );
}
