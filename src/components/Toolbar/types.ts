import { MergeProps } from '../../utils/typeUtils';
import { BoxProps } from '../Box';

export type ToolbarPosition = 'relative' | 'sticky' | 'fixed';

export type ToolbarPlacement = 'top' | 'bottom';

export type ToolbarProps = MergeProps<
  {
    /**
     * The positioning of the top bar.
     */
    position?: ToolbarPosition;
    /**
     * The placement of the top bar.
     */
    placement?: ToolbarPlacement;
    /**
     * The top bar content
     */
    children?: React.ReactNode;
  },
  BoxProps
>;
