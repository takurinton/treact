import { createElement, VNode } from '../vdomrinton/ui';

describe('createElement のテスト', () => {
    test('createElement が正しい', (): void => {
        const res: VNode = createElement('h1', { id: 'main' }, 'hello world');
        expect(res).toEqual(
            {
                nodeName: "h1",
                attributes: { id: "main" }, 
                children: ["hello world"], 
            }
        );
    });
    test('createElement ネストも行けちゃう', (): void => {
        const res: VNode = createElement('div', { id: 'main' }, 
            createElement('h1', { id: 'name' }, 'hello world!!')
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
                  }  
                ], 
            }
        );
    });
});