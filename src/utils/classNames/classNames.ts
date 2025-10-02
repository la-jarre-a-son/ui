type Cs = null | undefined | string | false;
type ClassesArg = Cs | Cs[] | Record<string, unknown>;
type BoundClassArgs<T extends string> =
  | Omit<Cs, string>
  | undefined
  | T
  | Cs[]
  | Record<T, string | string[]>;
type ClassDef = Record<string, string>;
type BoundClassNames<T extends ClassDef> = (
  ...args: BoundClassArgs<Extract<keyof T, string>>[]
) => string;

const _styles = Symbol();

/**
 * Recursive internal classNames function that work with
 * a shared Set instance passed by reference
 */
function _classNames(clsx: Set<string>, ...classes: ClassesArg[]) {
  const styles: ClassDef | undefined = this?.[_styles];

  for (let index = 0; index < classes.length; index++) {
    const cls = classes[index];
    if (Array.isArray(cls)) {
      // recurcive call for arrays classes
      _classNames.call(this, clsx, ...cls);
    } else if (cls && typeof cls === 'object') {
      // parsing object arg
      for (const k in cls) {
        if (Object.prototype.hasOwnProperty.call(cls, k) && cls[k]) {
          const styleValue = styles?.[k];
          clsx.add(styleValue || k);
        }
      }
    } else if (cls && typeof cls === 'string') {
      const styleValue = styles?.[cls];
      clsx.add(styleValue || cls);
    }
  }
}

/**
 * Class aggregation function
 */
export function classNames(...classes: ClassesArg[]): string {
  const clsx = new Set();
  _classNames.call(this, clsx, ...classes);
  return Array.from(clsx).join(' ');
}

/**
 * Class aggregation function bound to a styles object
 */
export function bindClassNames<T extends ClassDef>(styles: T): BoundClassNames<T> {
  return classNames.bind({
    [_styles]: styles,
  });
}
