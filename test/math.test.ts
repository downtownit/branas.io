import { sum } from "../src/math";

test("Deve somar 4 + 4", function(){
    const result = sum(2,2);
    expect(result).toBe(8);
});