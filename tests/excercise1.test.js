const ex1 = require('../exercise1');

describe("fizzBuzz", () => {

    it("should throw an error if a non number is passed", () => {

        const args = ['', null, undefined, false];

        args.forEach(a => {
            expect(() =>
                ex1.fizzBuzz(a)
            ).toThrow('Input should be a number.');
        });


    });


    it("should return fizzbuzz if number is divisible by 3 and 5", () => {
        const result = ex1.fizzBuzz(15);

        expect(result).toBe('FizzBuzz');
    });

    it("should return Fizz if Number is only divisible by 3", () => {
        const result = ex1.fizzBuzz(6);

        expect(result).toBe("Fizz")
    });

    it("should return Buzz if Number is only divisible by 5", () => {
        const result = ex1.fizzBuzz(20);

        expect(result).toBe("Buzz")
    });

    it("should return the number if it is not divisible by 3 or 5", () => {
        const result = ex1.fizzBuzz(23);

        expect(result).toBe(23)
    });


});
