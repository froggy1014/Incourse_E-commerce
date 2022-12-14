import { CSSObject } from '@chakra-ui/styled-system';

import { InputThemeType } from './index';

const size: Record<string, CSSObject> = {
  lg: {
    fontSize: 'lg',
    px: 4,
    h: '40px',
  },
  md: {
    fontSize: 'md',
    px: 4,
    h: '40px',
  },
  sm: {
    fontSize: 'sm',
    px: 3,
    h: '40px',
  },
  xs: {
    fontSize: 'xs',
    px: 2,
    h: '40px',
  },
};

export const sizes: InputThemeType['sizes'] = {
  lg: {
    field: size.lg,
    addon: size.lg,
  },
  md: {
    field: size.md,
    addon: size.md,
  },
  sm: {
    field: size.sm,
    addon: size.sm,
  },
  xs: {
    field: size.xs,
    addon: size.xs,
  },
};
