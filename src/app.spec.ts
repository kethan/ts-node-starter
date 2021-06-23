import { x } from './app';
describe('test app', () => {
    test('x', async () => {
        expect(x).toEqual(100);
    });
});