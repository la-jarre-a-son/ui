import { getNextCursor, getNumberOfRows } from './virtualGridUtils';

describe('useVirtualizedGrid', () => {
  describe('getNextCursor', () => {
    it('Work without hintSize function as argument', () => {
      const getCursor1 = getNextCursor(1);
      const getCursor2 = getNextCursor(4);

      const cursor1 = getCursor1(0, 0);
      const cursor2 = getCursor1(0, 1);
      const cursor3 = getCursor1(1, 5);

      const cursor4 = getCursor2(0, 0);
      const cursor5 = getCursor2(0, 1);
      const cursor6 = getCursor2(4, 5);

      expect(cursor1).toEqual(0);
      expect(cursor2).toEqual(1);
      expect(cursor3).toEqual(6);

      expect(cursor4).toEqual(0);
      expect(cursor5).toEqual(4);
      expect(cursor6).toEqual(24);
    });
    it('Can use a hintSize function', () => {
      // grid with only one column
      const getCursorA = getNextCursor(1, () => 1);

      // grid with 2 column on 1 element per column
      const getCursorB = getNextCursor(2, () => 1);

      // fucked up grid with 4 columns
      const getCursorC = getNextCursor(4, (index: number, colPerRow: number) => {
        if (index % 5 === 0) return 2;
        if (index % 24 === 0) return colPerRow;
      });

      const nextCursor0 = getCursorA(0, 1);
      const nextCursor1 = getCursorA(0, 5);
      const nextCursor2 = getCursorA(5, 1);

      const nextCursor3 = getCursorB(0, 5);
      const nextCursor4 = getCursorB(6, 1);

      const nextCursor5 = getCursorC(0, 0);
      const nextCursor6 = getCursorC(0, 1);
      const nextCursor7 = getCursorC(3, 1);
      const nextCursor8 = getCursorC(3, 3);
      const nextCursor9 = getCursorC(24, 2);

      expect(nextCursor0).toEqual(1);
      expect(nextCursor1).toEqual(5);
      expect(nextCursor2).toEqual(6);

      expect(nextCursor3).toEqual(10);
      expect(nextCursor4).toEqual(8);

      expect(nextCursor5).toEqual(0);
      expect(nextCursor6).toEqual(3);
      expect(nextCursor7).toEqual(6);
      expect(nextCursor8).toEqual(13);
      expect(nextCursor9).toEqual(28);
    });
  });

  describe('getNumberOfRows', () => {
    it('calculate the total number of rows', () => {
      const rows = getNumberOfRows(100, 2);
      const rows2 = getNumberOfRows(0, 10);
      const rows3 = getNumberOfRows(10, 3);
      const rows4 = getNumberOfRows(10, 2, () => 2);
      const rows5 = getNumberOfRows(10, 2, (index, colPerRow) => {
        return index === 0 ? colPerRow : 1;
      });
      const rows6 = getNumberOfRows(10, 2, (index, colPerRow) => {
        return index <= 1 ? colPerRow : 1;
      });

      // case of items bigger than the full grid
      const row7 = getNumberOfRows(10, 2, (index) => {
        return index === 0 ? 4 : 1;
      });
      const row8 = getNumberOfRows(10, 2, (index) => {
        return index === 1 ? 4 : 1;
      });

      expect(rows).toEqual(50);
      expect(rows2).toEqual(0);
      expect(rows3).toEqual(4);
      expect(rows4).toEqual(10);
      expect(rows5).toEqual(6);
      expect(rows6).toEqual(6);
      expect(row7).toEqual(6);
      expect(row8).toEqual(6);
    });
  });
});
