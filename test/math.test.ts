import { sum } from "../src/math";

test("Deve somar 3 + 7", function(){
    const result = sum(2,2);
    expect(result).toBe(10);
});