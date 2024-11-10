import FizzUtil from "../../utils/fizz.util"
describe("Fizz Util Tests", () => {
    let fizzUtil: FizzUtil;
    beforeEach(() => {
        fizzUtil = new FizzUtil();
    });
    it("Should return Fizz when number is divisible by 3",()=>{
        expect(fizzUtil.fizzBuzz(3)).toBe("Fizz");
    })
    it("Should return Buzz when number is divisible by 5",()=>{
        expect(fizzUtil.fizzBuzz(5)).toBe("Buzz");
    })
    it("Should return FizzBuzz when number is divisible by 3 and 5",()=>{
        expect(fizzUtil.fizzBuzz(15)).toBe("FizzBuzz");
    })
    it("Should return the number when number is not divisible 3 or 5",()=>{
        expect(fizzUtil.fizzBuzz(4)).toBe(4);
    })
    
});


