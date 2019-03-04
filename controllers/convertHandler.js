/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
	this.getNum = function(input) {
		const unitRegEx = /[A-Za-z]/
		const divisionRegEx = /\//
		const decimalRegEx = /\./
		let num

		for (let i = 0; i < input.length; i++) {
			if (unitRegEx.test(input[i])) {
				num = input.substring(0, i)
				break
			}
		}

		if (divisionRegEx.test(num)) {
			const fraction = num.split('/')

			return fraction.length >= 3
				? { error: 'invalid number' }
				: fraction.length <= 1
				? { error: 'invalid number' }
				: decimalRegEx.test(fraction[0]) ||
				  decimalRegEx.test(fraction[1])
				? parseFloat(fraction[0]) / parseFloat(fraction[1])
				: parseInt(fraction[0]) / parseInt(fraction[1])

			// What if the input is something in the lines of 7/ ? =>
		} else if (decimalRegEx.test(num)) {
			return parseFloat(num)
		} else if (num) {
			return parseInt(num)
		} else {
			return 1
		}
	}

	this.getUnit = function(input) {
		var result

		return result
	}

	this.getReturnUnit = function(initUnit) {
		var result

		return result
	}

	this.spellOutUnit = function(unit) {
		var result

		return result
	}

	this.convert = function(initNum, initUnit) {
		const galToL = 3.78541
		const lbsToKg = 0.453592
		const miToKm = 1.60934
		const lToGal = 1 / galToL
		const kgToLbs = 1 / lbsToKg
		const kmToMi = 1 / miToKm
		var result

		return result
	}

	this.getString = function(initNum, initUnit, returnNum, returnUnit) {
		var result

		return result
	}
}

module.exports = ConvertHandler
