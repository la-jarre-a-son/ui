/**
 * A function used to predict the number of column
 * taken by an item of given index
 */
export type HintSize = (index: number, colPerRow: number) => number | undefined;

/**
 * Get the size of an element including margins
 */
export function getItemFullSize(element: Element): [height: number, width: number] {
  const rect = element.getBoundingClientRect();
  const computed = window.getComputedStyle(element);
  const elHeight = rect.height + parseFloat(computed.marginTop) + parseFloat(computed.marginBottom);
  const elWidth = rect.width + parseFloat(computed.marginTop) + parseFloat(computed.marginBottom);
  return [elHeight, elWidth];
}

/**
 *
 * @param colPerRow the number of column of a row
 * @param hintSize an optionnal function to predict the number of column
 * of an item of given index
 */
export function getNextCursor(colPerRow: number, hintSize?: HintSize) {
  return (fromIndex: number, numberOfRows: number) => {
    if (!hintSize) return fromIndex + numberOfRows * colPerRow;

    let i = fromIndex;
    let rows = numberOfRows;
    let currentRow = 0;
    while (rows > 0) {
      const itemCol = Math.min(hintSize(i, colPerRow) ?? 1, colPerRow);
      if (currentRow + itemCol > colPerRow) {
        rows--;
        currentRow = 0;
      } else if (currentRow + itemCol === colPerRow) {
        rows--;
        currentRow = 0;
        i++;
      } else {
        currentRow += itemCol;
        i++;
      }
    }
    return i;
  };
}

/**
 * Calculate the total number of rows of the given grid
 */
export function getNumberOfRows(listLength: number, colPerRow: number, hintSize?: HintSize) {
  if (!hintSize) return Math.ceil(listLength / colPerRow);

  let i = 0;
  let rows = 0;
  let currentRow = 0;
  while (i < listLength) {
    const itemCol = Math.min(hintSize(i, colPerRow) ?? 1, colPerRow);
    if (currentRow + itemCol === colPerRow || (currentRow === 0 && itemCol > colPerRow)) {
      // row full or item bigger than an empty row
      rows++;
      currentRow = 0;
      i++;
    } else if (currentRow + itemCol > colPerRow) {
      // overflow
      rows++;
      currentRow = 0;
    } else {
      // still place on the row
      currentRow += itemCol;
      i++;
    }
  }
  return rows + (currentRow && 1);
}

export const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

/**
 * Retrieving the first non skipped child element
 * @param containerEl our elements container
 * @returns The first found reference element
 */
export function getFirstReferenceElement(containerEl: HTMLElement) {
  return (function getFirstEl(el?: Element | null): Element | null {
    if (el == null) return null;
    if (!el.getAttribute('data-skip')) return el;
    return getFirstEl(el.nextElementSibling);
  })(containerEl.firstChild as Element);
}
