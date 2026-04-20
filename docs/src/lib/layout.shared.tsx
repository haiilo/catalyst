import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import Logo from '#/public/haiilo_logo.png';

const logo = (
  <>
    <Image src={Logo} alt="haiilo logo" aria-label="haiilo logo" width={75} height={75} className="w-6 h-6" />
  </>
)

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/haiilo/catalyst',
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium">Haiilo</span>
        </>
      ),
    },
  };
}
