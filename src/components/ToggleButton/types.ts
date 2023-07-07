import { ButtonIntent, ButtonProps, ButtonVariant } from '../Button';
import { MergeProps } from '../../utils/typeUtils';

export type ToggleButtonProps = MergeProps<
  {
    /**
     * Specifies that the button is selected
     */
    selected?: boolean;
    /**
     * The color intent to apply when selected
     */
    selectedIntent?: ButtonIntent;
    /**
     * The stylistic variant to apply when selected
     */
    selectedVariant?: ButtonVariant;
  },
  ButtonProps
>;
