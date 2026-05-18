import '@hugeicons/react';

declare module '@hugeicons/react' {
  import { ReactElement, SVGProps } from 'react';

  export interface HugeiconsIconProps extends SVGProps<SVGSVGElement> {
    icon: any;
    size?: number | string;
    color?: string;
    variant?: 'stroke' | 'twotone' | 'solid' | 'bulk' | 'duotone';
  }

  export const HugeiconsIcon: (props: HugeiconsIconProps) => ReactElement;
}
