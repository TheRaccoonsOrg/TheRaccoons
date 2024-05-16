import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { ReactElement } from 'react';

type CustomRenderOptions = {
  locale?: string;
} & RenderOptions;

const render = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { locale = 'en', ...rtlOptions } = options || {};

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...rtlOptions });
};

export * from '@testing-library/react';
export { render };
