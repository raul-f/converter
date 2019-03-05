/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require('chai')
var assert = chai.assert
var ConvertHandler = require('../controllers/convertHandler.js')

var convertHandler = new ConvertHandler()

suite('Unit Tests', function() {
	suite('Function convertHandler.getNum(input)', function() {
		test('Whole number input', function(done) {
			const input = [
				{ in: '32L', out: 32 },
				{ in: '4km', out: 4 },
				{ in: '50gal', out: 50 },
				{ in: '13MI', out: 13 },
				{ in: '6002kg', out: 6002 },
				{ in: '2277km', out: 2277 },
				{ in: '7474LBS', out: 7474 },
				{ in: '866KM', out: 866 },
				{ in: '009395km', out: 9395 },
				{ in: '525km', out: 525 },
			]

			for (const obj of input) {
				assert.strictEqual(convertHandler.getNum(obj.in), obj.out)
			}
			done()
		})

		test('Decimal Input', function(done) {
			const input = [
				{ in: '85.42mi', out: 85.42 },
				{ in: '37.69KM', out: 37.69 },
				{ in: '17.L', out: 17.0 },
				{ in: '7808.49GAL', out: 7808.49 },
				{ in: '07.17GAL', out: 7.17 },
				{ in: '.67KM', out: 0.67 },
				{ in: '25.121753lbs', out: 25.121753 },
				{ in: '57.2KM', out: 57.2 },
				{ in: '.5417780849GAL', out: 0.5417780849 },
				{ in: '25.21gal', out: 25.21 },
			]

			for (const obj of input) {
				assert.strictEqual(convertHandler.getNum(obj.in), obj.out)
			}
			done()
		})

		test('Fractional Input', function(done) {
			const input = [
				{ in: '3/2L', out: 1.5 },
				{ in: '0/4mi', out: 0 },
				{ in: '5/10gal', out: 0.5 },
				{ in: '13/7L', out: 13 / 7 },
				{ in: '3000/6000kg', out: 0.5 },
				{ in: '250000/1KM', out: 250000 },
				{ in: '1/250000lbs', out: 1 / 250000 },
				{ in: '150150150150/150150150150KM', out: 1.0 },
			]

			for (const obj of input) {
				assert.strictEqual(convertHandler.getNum(obj.in), obj.out)
			}
			done()
		})

		test('Fractional Input w/ Decimal', function(done) {
			const input = [
				{ in: '0.125/789lbs', out: 0.125 / 789 },
				{ in: '0/.642mi', out: 0 },
				{ in: '5.0/10gal', out: 0.5 },
				{ in: '1.3/35.7L', out: 1.3 / 35.7 },
				{ in: '3./6000kg', out: 0.0005 },
				{ in: '25.5/13.5201496KM', out: 25.5 / 13.5201496 },
				{ in: '.5/5lbs', out: 0.1 },
				{ in: '.25/.5KM', out: 0.5 },
				{ in: '1/.5417780849GAL', out: 1 / 0.5417780849 },
				{ in: '0/.21gal', out: 0 },
			]

			for (const obj of input) {
				assert.strictEqual(convertHandler.getNum(obj.in), obj.out)
			}
			done()
		})

		test('Invalid Input (double fraction)', function(done) {
			const input = ['125//789lbs', '0/642/90mi', '5/0/10gal']

			for (const value of input) {
				assert.isOk(convertHandler.getNum(value).error)
			}
			done()
		})

		test('No Numerical Input', function(done) {
			const input = [
				'gal',
				'l',
				'mi',
				'km',
				'lbs',
				'kg',
				'GAL',
				'L',
				'MI',
				'KM',
				'LBS',
				'KG',
			]

			for (const value of input) {
				assert.strictEqual(convertHandler.getNum(value), 1)
			}
			done()
		})
	})

	suite('Function convertHandler.getUnit(input)', function() {
		test('For Each Valid Unit Inputs', function(done) {
			var input = [
				'gal',
				'l',
				'mi',
				'km',
				'lbs',
				'kg',
				'GAL',
				'L',
				'MI',
				'KM',
				'LBS',
				'KG',
			]

			for (const [index, value] of input.entries()) {
				const argument =
					Math.random() * 100 +
					(Math.random() > 0.5 ? 0 : `/${Math.random() * 100}`) +
					value
				assert.strictEqual(
					convertHandler.getUnit(argument),
					value.toLowerCase()
				)
			}

			done()
		})

		test('Unknown Unit Input', function(done) {
			const input = [
				'W',
				'cd',
				'N',
				'A',
				'V',
				'gibberish',
				'fhqfponvjabien',
				'h',
				'URI',
				'what-ever',
				'6f1f1aaaati',
				'bt9848646aet',
			]

			for (const value of input) {
				const argument =
					Math.random() * 100 +
					(Math.random() > 0.5 ? 0 : `/${Math.random() * 100}`) +
					value
				assert.isOk(convertHandler.getUnit(argument).error)
			}

			done()
		})
	})

	suite('Function convertHandler.getReturnUnit(initUnit)', function() {
		test('For Each Valid Unit Inputs', function(done) {
			var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
			var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs']

			for (const [index, value] of input.entries()) {
				assert.equal(convertHandler.getReturnUnit(value), expect[index])
			}

			done()
		})
	})

	suite('Function convertHandler.spellOutUnit(unit)', function() {
		test('For Each Valid Unit Inputs', function(done) {
			//see above example for hint
			var input = [
				'gal',
				'l',
				'mi',
				'km',
				'lbs',
				'kg',
				'GAL',
				'L',
				'MI',
				'KM',
				'LBS',
				'KG',
			]
			var expect = [
				'gallons',
				'liters',
				'miles',
				'kilometers',
				'pounds',
				'kilograms',
				'gallons',
				'liters',
				'miles',
				'kilometers',
				'pounds',
				'kilograms',
			]

			for (const [index, value] of input.entries()) {
				assert.equal(convertHandler.spellOutUnit(value), expect[index])
			}

			done()
		})
	})

	suite('Function convertHandler.convert(num, unit)', function() {
		test('Gal to L', function(done) {
			const input = { in: [5, 'gal'], out: 18.9271 }
			assert.approximately(
				convertHandler.convert(...input.in),
				input.out,
				0.01
			) //0.01 tolerance
			done()
		})

		test('L to Gal', function(done) {
			const input = { in: [70, 'L'], out: 18.49 }
			assert.approximately(
				convertHandler.convert(...input.in),
				input.out,
				0.01
			)
			done()
		})

		test('Mi to Km', function(done) {
			const input = { in: [1, 'Mi'], out: 1.609 }
			assert.approximately(
				convertHandler.convert(...input.in),
				input.out,
				0.01
			)
			done()
		})

		test('Km to Mi', function(done) {
			const input = { in: [0.17, 'Km'], out: 0.105633 }
			assert.approximately(
				convertHandler.convert(...input.in),
				input.out,
				0.01
			)
			done()
		})

		test('Lbs to Kg', function(done) {
			const input = { in: [250000, 'Lbs'], out: 113398.09 }
			assert.approximately(
				convertHandler.convert(...input.in),
				input.out,
				0.01
			)
			done()
		})

		test('Kg to Lbs', function(done) {
			const input = { in: [125.5, 'Kg'], out: 276.68 }
			assert.approximately(
				convertHandler.convert(...input.in),
				input.out,
				0.01
			)
			done()
		})
	})
})
