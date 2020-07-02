import roll from '../src/commands/roll';
describe('Dice Roll', function () {
  it('Normal dice roll (No params)', function () {
    let r = roll();
    expect(r.faces).toBe(20);
    expect(r.sum).toBeGreaterThanOrEqual(1);
    expect(r.sum).toBeLessThanOrEqual(20);
    expect(r.message).toBe('Rolled');
  });
  it('Normal dice roll out of 6', function () {
    let r = roll('6');
    expect(r.faces).toBe(6);
    expect(r.sum).toBeGreaterThanOrEqual(1);
    expect(r.sum).toBeLessThanOrEqual(6);
    expect(r.message).toBe('Rolled');
  });
  it('2 dice rolls out of 20', function () {
    let r = roll('2d20');
    expect(r.faces).toBe(20);
    expect(r.results).toBeInstanceOf(Array);

    expect(r.sum).toBeGreaterThanOrEqual(1);
    expect(r.sum).toBeLessThanOrEqual(50);
    expect(r.message).toBe('Rolled');
  });
  it('Normal dice roll with custom message', function () {
    let r = roll('# Attack');
    expect(r.faces).toBe(20);
    expect(r.sum).toBeGreaterThanOrEqual(1);
    expect(r.sum).toBeLessThanOrEqual(20);
    expect(r.message).toBe('Attack');
  });
  it('5 dice rolls out of 6 with custom message', function () {
    let r = roll('5d6 # Blerg');
    expect(r.faces).toBe(6);
    expect(r.results).toBeInstanceOf(Array);
    expect(r.sum).toBeGreaterThanOrEqual(1);
    expect(r.sum).toBeLessThanOrEqual(30);
    expect(r.message).toBe('Blerg');
  });
});
