import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { ReactElement } from 'react';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

type CustomRenderOptions = {
  locale?: string;
} & RenderOptions;

const mockRouter: AppRouterInstance = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  forward: function (): void {
    throw new Error('Function not implemented.');
  },
  refresh: function (): void {
    throw new Error('Function not implemented.');
  },
};

const render = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { locale = 'en', ...rtlOptions } = options || {};

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <AppRouterContext.Provider value={mockRouter}>
        <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
      </AppRouterContext.Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...rtlOptions });
};

export * from '@testing-library/react';
export { render };
