import { DatePipe } from './date.pipe';

describe('DateDescPipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });
});