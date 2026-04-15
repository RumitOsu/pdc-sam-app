import { jest } from '@jest/globals';

describe('Test getAllItemsHandler', () => {
    it('rejects non-GET methods', async () => {
        const { getAllItemsHandler } = await import('../../../src/handlers/get-all-items.mjs');
        const event = { httpMethod: 'POST' };
        await expect(getAllItemsHandler(event)).rejects.toThrow(/only accepts GET method/);
    });
});
