export const ContainerSizes = ['sm', 'md', 'lg', 'xl'] as const;

export const ContainerAlignments = ['center', 'left', 'right'];

export type ContainerSize = (typeof ContainerSizes)[number];

export type ContainerAlign = (typeof ContainerAlignments)[number];

export type ContainerProps = {
  /**
   * The maximum width of the container
   */
  size?: ContainerSize;
  /**
   * The container content
   */
  children?: React.ReactNode;
  /**
   * The alignment of the container
   */
  align?: ContainerAlign;
};
