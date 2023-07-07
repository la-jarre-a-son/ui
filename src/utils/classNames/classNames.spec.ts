import { bindClassNames, classNames } from './classNames';

describe('classNames', () => {
  it("don't crash with empty args", () => {
    const result = classNames();
    expect(result).toEqual('');
  });

  it('can receive string classes', () => {
    const result = classNames('c1', 'c2');
    const resultWithFalsy = classNames(false, null, undefined, 'c1', false && 'nope', 'c2', '');
    expect(result).toEqual('c1 c2');
    expect(resultWithFalsy).toEqual('c1 c2');
  });

  it('can recieve arrays of classes', () => {
    const result = classNames(['c1', 'c2'], 'c3');
    const resultWithFalsy = classNames([], [false && 'oups', null], 'c1', [
      'c2',
      '',
      null && 'oups',
      'c3',
    ]);
    expect(result).toEqual('c1 c2 c3');
    expect(resultWithFalsy).toEqual('c1 c2 c3');
  });

  it('can receive objects', () => {
    const result = classNames(
      {
        c1: true,
        c2: 'okok',
        c3: 1,
      },
      {}
    );
    const resultWithFalsy = classNames({
      c1: true,
      oups: false,
      oupsy: 0,
      oupsyy: null,
      c2: true,
      c3: true,
    });
    expect(result).toEqual('c1 c2 c3');
    expect(resultWithFalsy).toEqual('c1 c2 c3');
  });

  it('can receive receive both strings, arrays of strings and objects', () => {
    const result = classNames(
      {
        c1: true,
        c2: false,
        c3: 0,
      },
      [false, 'c2'],
      'c3'
    );
    expect(result).toEqual('c1 c2 c3');
  });

  it('dedups classes', () => {
    const result = classNames(
      {
        c1: true,
        c2: false,
        c3: 0,
      },
      [false, 'c2', 'c2'],
      'c3',
      'c1'
    );
    expect(result).toEqual('c1 c2 c3');
  });
});

describe('bindClassNames', () => {
  it('enhance classNames with styles object', () => {
    const styles = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    const cs = bindClassNames(styles);

    const value = cs(
      'key1',
      {
        key2: true,
        key5: false,
      },
      ['key3'],
      'key4' as any
    );

    expect(value).toEqual('value1 value2 value3 key4');
  });
});
