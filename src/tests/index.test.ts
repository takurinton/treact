import { createVNode, VNode } from '../treact/create-element';

describe('createVNode のテスト', () => {
    test('createVNode が正しい', (): void => {
        const res: VNode = createVNode('h1', { id: 'main' }, null, null, 'hello world');
        expect(res).toEqual(
            {
                nodeName: "h1",
                attributes: { id: "main" }, 
                children: ["hello world"], 
                realNode: null, 
                keyType: null
            }
        );
    });
    test('createVNode ネストも行けちゃう', (): void => {
        const res: VNode = createVNode('div', { id: 'main' }, 
            createVNode('h1', { id: 'name' }, null, null, 'hello world!!')
        );
        expect(res).toEqual(
            {
                nodeName: "div", 
                attributes: { id: "main" }, 
                children: [
                  {
                    nodeName: "h1", 
                    attributes: { id: "name" }, 
                    children: ["hello world!!"],
                    realNode: null, 
                    keyType: null
                  },
                ], 
                realNode: null, 
                keyType: null
            }
        );
    });
});