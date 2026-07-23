'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Link>;

export default function LocalizedLink({
  href,
  ...props
}: Props) {
  const locale = useLocale();

  let localizedHref = href;

  if (typeof href === 'string' && href.startsWith('/')) {
    localizedHref = `/${locale}${href}`;
  }

  return (
    <Link
      href={localizedHref}
      {...props}
    />
  );
}