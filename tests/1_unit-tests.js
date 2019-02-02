/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai")
var assert = chai.assert
var ConvertHandler = require("../controllers/convertHandler.js")

var convertHandler = new ConvertHandler()

suite("Unit Tests", function() {
    suite("Function convertHandler.getNum(input)", function() {
        test("Whole number input", function(done) {
            const input_1 = "32L"
            const input_2 = "4mi"
            const input_3 = "50gal"
            const input_4 = "13L"
            const input_5 = "6kg"
            assert.strictEqual(convertHandler.getNum(input_1), 32)
            assert.strictEqual(convertHandler.getNum(input_2), 4)
            assert.strictEqual(convertHandler.getNum(input_3), 50)
            assert.strictEqual(convertHandler.getNum(input_4), 13)
            assert.strictEqual(convertHandler.getNum(input_5), 6)
            done()
        })

        test("Decimal Input", function(done) {
            const input_1 = "3.2L"
            const input_2 = "0.4mi"
            const input_3 = "5/10gal"
            const input_4 = "13/7L"
            const input_5 = "3/6kg"
            assert.strictEqual(convertHandler.getNum(input_1), 3.2)
            assert.strictEqual(convertHandler.getNum(input_2), 0.4)
            assert.strictEqual(convertHandler.getNum(input_3), 0.5)
            assert.strictEqual(convertHandler.getNum(input_4), 13 / 7)
            assert.strictEqual(convertHandler.getNum(input_5), 0.5)
            done()
        })

        test("Fractional Input", function(done) {
            assert.fail()
            done()
        })

        test("Fractional Input w/ Decimal", function(done) {
            assert.fail()
            done()
        })

        test("Invalid Input (double fraction)", function(done) {
            assert.fail()
            done()
        })

        test("No Numerical Input", function(done) {
            assert.fail()
            done()
        })
    })

    suite("Function convertHandler.getUnit(input)", function() {
        test("For Each Valid Unit Inputs", function(done) {
            var input = [
                "gal",
                "l",
                "mi",
                "km",
                "lbs",
                "kg",
                "GAL",
                "L",
                "MI",
                "KM",
                "LBS",
                "KG"
            ]
            input.forEach(function(ele) {
                assert.fail()
            })
            done()
        })

        test("Unknown Unit Input", function(done) {
            assert.fail()
            done()
        })
    })

    suite("Function convertHandler.getReturnUnit(initUnit)", function() {
        test("For Each Valid Unit Inputs", function(done) {
            var input = ["gal", "l", "mi", "km", "lbs", "kg"]
            var expect = ["l", "gal", "km", "mi", "kg", "lbs"]
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i])
            })
            done()
        })
    })

    suite("Function convertHandler.spellOutUnit(unit)", function() {
        test("For Each Valid Unit Inputs", function(done) {
            //see above example for hint
            assert.fail()
            done()
        })
    })

    suite("Function convertHandler.convert(num, unit)", function() {
        test("Gal to L", function(done) {
            var input = [5, "gal"]
            var expected = 18.9271
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ) //0.1 tolerance
            done()
        })

        test("L to Gal", function(done) {
            assert.fail()
            done()
        })

        test("Mi to Km", function(done) {
            assert.fail()
            done()
        })

        test("Km to Mi", function(done) {
            assert.fail()
            done()
        })

        test("Lbs to Kg", function(done) {
            assert.fail()
            done()
        })

        test("Kg to Lbs", function(done) {
            assert.fail()
            done()
        })
    })
})
