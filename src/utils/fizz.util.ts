class FizzUtil {
  fizzBuzz = (num: number): string | number => {
    if (num % 3 == 0 && num % 5 == 0) return "FizzBuzz";
    else if (num % 5 == 0) return "Buzz";
    else if (num % 3 == 0) return "Fizz";
    else return num;
  };
}
export default FizzUtil;
// const obj = new FizzUtil();
// for (let i = 1; i <= 100; i++) console.log(obj.printnum(i));
