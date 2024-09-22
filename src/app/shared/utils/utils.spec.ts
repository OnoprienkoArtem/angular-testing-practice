import { pluck, range } from "./utils";

describe('utils', () => {
  describe('range', () => {
    it('should return correct range from 1 to 5 ', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    });

    it('should return correct range from 41 to 44 ', () => {
      expect(range(41, 44)).toEqual([41, 42, 43]);
    });
  });

  describe('pluck', () => {
    const data = [
      {id: '1', name: 'foo'},
      {id: '2', name: 'bar'},
      {id: '3', name: 'baz'},
    ];
    it('should correct array by id key', () => {
      expect(pluck(data, 'id')).toEqual(['1', '2', '3']);
    });

    it('should correct array by name key ', () => {
      expect(pluck(data, 'name')).toEqual(['foo', 'bar', 'baz']);
    });
  });
});
