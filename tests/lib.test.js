const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {

    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);

        expect(result).toBe(1);

    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);

        expect(result).toBe(1);

    });

    it('should return a Zero if input is Zero', () => {
        const result = lib.absolute(0);

        expect(result).toBe(0);

    });

});


describe("greet", () => {

    it("should return the greeting Message", () => {
        const result = lib.greet("Mike");
        expect(result).toMatch(/Mike/);
    });

});


describe("getCurrencies", () => {

    it("should return an array of supported currencies", () => {
        const result = lib.getCurrencies();
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');

        expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]))
    });
});


describe("getProduct", () => {
    it("should return an object", () => {

            const result = lib.getProduct(5);

            // expect(result).toEqual({ "id": 5, "price": 10 });

            expect(result).toMatchObject({"id": 5, "price": 10});

            expect(result).toHaveProperty('id', 5);
        }
    )
});


describe("registerUser", () => {

    it("Should return a valid object if valid username is passed", () => {
        const result = lib.registerUser('michael');
        expect(result).toMatchObject({username: 'michael'});
        expect(result.id).toBeGreaterThan(0);
    });

    it("Should throw an error if username is falsy", () => {


        const args = ['', null, undefined, NaN, 0, false];

        args.forEach(a => {
            expect(() => {
                lib.registerUser(a)
            }).toThrow('Username is required')
        })

    })
});


describe("applyDiscount", () => {

    it('Should apply a 10% discount to customers with more than 10 points', () => {

        db.getCustomerSync = function (id) {
            // console.log("Fake getCustomerSync Function");
            return {id: id, points: 11};
        };

        const order = {customerId: 5, totalPrice: 10};

        lib.applyDiscount(order);

        expect(order.totalPrice).toBe(9);

    })
});


describe("notifyCustomer", () => {

    it('should send a notification email to a customer', () => {

        let customer;

        db.getCustomerSync = function (id) {
            customer = {id: id, points: 11, email: 'a'};
            return customer;
        };

        let mailSent = false;

        mail.send = function(to, message){
            console.log('Sending fake email');
            mailSent = true;
        }

        const order = {customerId: 2, totalPrice: 50};

        lib.notifyCustomer(order);

        expect(mailSent).toBe(true);

    });
});
