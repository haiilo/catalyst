import { CatAvatar, CatBadge, CatButton, CatButtonGroup, CatIcon } from '@haiilo/catalyst-react';
import React, { useState } from 'react';
import { Value } from '../Section';

const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
const variants = ['filled', 'outlined', 'text', 'link'] as const;
const sizes = ['xs', 's', 'm', 'l', 'xl'] as const;

export function ButtonDemo() {
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <div className="demo-row">
        {variants.map(variant => (
          <CatButton key={variant} variant={variant} color="primary">
            {variant}
          </CatButton>
        ))}
      </div>
      <div className="demo-row">
        {colors.map(color => (
          <CatButton key={color} variant="filled" color={color}>
            {color}
          </CatButton>
        ))}
      </div>
      <div className="demo-row">
        {sizes.map(size => (
          <CatButton key={size} size={size}>
            Size {size}
          </CatButton>
        ))}
      </div>
      <div className="demo-row">
        <CatButton icon="sparkle-filled">Icon left</CatButton>
        <CatButton icon="sparkle-filled" iconRight>
          Icon right
        </CatButton>
        <CatButton icon="sparkle-filled" iconOnly a11yLabel="Icon only" />
        <CatButton icon="sparkle-filled" iconOnly round a11yLabel="Round icon only" />
        <CatButton disabled>Disabled</CatButton>
        <CatButton loading={loading} onCatClick={load}>
          Click to load
        </CatButton>
        <CatButton url="https://design.haiilo.com" urlTarget="_blank">
          Link button
        </CatButton>
      </div>
      <div className="demo-row">
        <CatButton variant="filled" color="primary" onCatClick={() => setClicks(clicks + 1)}>
          Click me
        </CatButton>
      </div>
      <Value value={{ clicks }} />
    </>
  );
}

export function ButtonGroupDemo() {
  return (
    <div className="demo-row">
      <CatButtonGroup a11yLabel="Text formatting">
        <CatButton icon="bold-outlined" iconOnly a11yLabel="Bold" />
        <CatButton icon="italic-outlined" iconOnly a11yLabel="Italic" />
        <CatButton icon="underlined-outlined" iconOnly a11yLabel="Underline" />
      </CatButtonGroup>
      <CatButtonGroup a11yLabel="Pages">
        <CatButton>One</CatButton>
        <CatButton>Two</CatButton>
        <CatButton>Three</CatButton>
      </CatButtonGroup>
    </div>
  );
}

export function IconDemo() {
  return (
    <div className="demo-row">
      {sizes.map(size => (
        <CatIcon key={size} icon="sparkle-filled" size={size} />
      ))}
      <CatIcon icon="star-filled" size="l" style={{ color: 'gold' }} />
    </div>
  );
}

export function BadgeDemo() {
  return (
    <>
      <div className="demo-row">
        <CatBadge>Default</CatBadge>
        <CatBadge variant="filled">Filled</CatBadge>
        <CatBadge variant="outlined">Outlined</CatBadge>
        <CatBadge round>Round</CatBadge>
        <CatBadge pulse color="danger">
          Pulse
        </CatBadge>
      </div>
      <div className="demo-row">
        {colors.map(color => (
          <CatBadge key={color} icon="sparkle-filled" color={color}>
            {color}
          </CatBadge>
        ))}
      </div>
      <div className="demo-row">
        {sizes.map(size => (
          <CatBadge key={size} size={size} icon="sparkle-filled" iconRight>
            Size {size}
          </CatBadge>
        ))}
      </div>
    </>
  );
}

export function AvatarDemo() {
  return (
    <>
      <div className="demo-row">
        {sizes.map(size => (
          <CatAvatar key={size} label="Jane Doe" size={size} />
        ))}
      </div>
      <div className="demo-row">
        <CatAvatar label="Jane Doe" size="l" round />
        <CatAvatar label="Jane Doe" size="l" initials="JD" />
        <CatAvatar label="Jane Doe" size="l" icon="sparkle-filled" />
        <CatAvatar label="Jane Doe" size="l" src="https://picsum.photos/80" round />
        <CatAvatar label="Jane Doe" size="l" url="https://design.haiilo.com" urlTarget="_blank" />
      </div>
    </>
  );
}
