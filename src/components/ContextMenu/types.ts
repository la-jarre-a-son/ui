import { MenuProps } from '../Menu';
import { MergeProps } from '../../utils/typeUtils';

export type ContextMenuProps = MergeProps<
  {
    /**
     * The element triggering the contextual menu (default to document)
     */
    triggerEl?: HTMLElement | null;
  },
  MenuProps
>;
