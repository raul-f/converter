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
		const unitRegEx = /[A-Za-z]/

		let unit

		for (let i = 0; i < input.length; i++) {
			if (unitRegEx.test(input[i])) {
				unit = input.substring(i)
				break
			}
		}

		const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']

		const result = unit.toLowerCase()

		if (validUnits.includes(result)) {
			return result
		}
		return { error: 'invalid unit' }
	}

	this.getReturnUnit = function(initUnit) {
		const table = {
			gal: 'l',
			l: 'gal',
			mi: 'km',
			km: 'mi',
			lbs: 'kg',
			kg: 'lbs',
		}

		let result

		if (!initUnit.error && table[initUnit.toLowerCase()]) {
			result = table[initUnit.toLowerCase()]
		}

		return result ? result : { error: 'invalid unit' }
	}

	this.spellOutUnit = function(unit) {
		const table = {
			gal: 'gallons',
			l: 'liters',
			mi: 'miles',
			km: 'kilometers',
			lbs: 'pounds',
			kg: 'kilograms',
		}

		let result = table[unit.toLowerCase()]

		if (result) {
			return result
		}

		return { error: 'invalid unit' }
	}

	this.convert = function(initNum, initUnit) {
		const conversionTable = {
			gal: 3.785411784,
			lbs: 0.45359237,
			mi: 1.609344,
			l: 1 / 3.785411784,
			kg: 1 / 0.45359237,
			km: 1 / 1.609344,
		}

		if (
			typeof initNum === 'number' &&
			initNum > 0 &&
			typeof initUnit === 'string' &&
			conversionTable[initUnit.toLowerCase()]
		) {
			const unit = initUnit.toLowerCase()
			return initNum * conversionTable[unit]
		} else if (
			typeof initUnit === 'string' &&
			conversionTable[initUnit.toLowerCase()]
		) {
			return { error: 'invalid number' }
		} else if (typeof initNum === 'number' && initNum > 0) {
			return { error: 'invalid unit' }
		} else {
			return { error: 'invalid number and unit' }
		}
	}

	this.getString = function(initNum, initUnit, returnNum, returnUnit) {
		if (
			!initNum.error &&
			!initUnit.error &&
			!returnNum.error &&
			!returnUnit.error
		) {
			return {
				initNum,
				initUnit,
				returnNum,
				returnUnit,
				string: `${initNum} ${this.spellOutUnit(
					initUnit
				)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`,
			}
		} else {
			if (returnNum.error) {
				return returnNum
			} else {
				return returnUnit
			}
		}
	}
}

module.exports = ConvertHandler
