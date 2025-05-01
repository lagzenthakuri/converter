// converters/numberConverter.js - Module for number conversion logic

/**
 * Module for handling number system conversions
 */
const numberConverter = {
    /**
     * Validate input based on number system type
     * @param {string} value - The input value to validate
     * @param {string} type - The number system type (decimal, binary, hexadecimal, octal)
     * @returns {boolean} - Whether the input is valid
     */
    validateInput: function(value, type) {
        const validationPatterns = {
            decimal: /^-?\d+$/,
            binary: /^[01]+$/,
            hexadecimal: /^[0-9A-Fa-f]+$/,
            octal: /^[0-7]+$/
        };

        // Check if the pattern exists
        if (!validationPatterns[type]) {
            throw new Error(`Unsupported number system type: ${type}`);
        }

        // Validate using regex pattern
        return validationPatterns[type].test(value);
    },

    /**
     * Convert input value to decimal based on its type
     * @param {string} value - The input value to convert
     * @param {string} type - The number system type
     * @returns {number} - The decimal representation
     */
    toDecimal: function(value, type) {
        switch(type) {
            case 'decimal':
                return parseInt(value, 10);
            case 'binary':
                return parseInt(value, 2);
            case 'hexadecimal':
                return parseInt(value, 16);
            case 'octal':
                return parseInt(value, 8);
            default:
                throw new Error(`Unsupported number system type: ${type}`);
        }
    },

    /**
     * Convert a number from one system to all other systems
     * @param {string} value - The input value
     * @param {string} inputType - The input number system type
     * @returns {Object} - Object containing all number system representations
     */
    convertNumber: function(value, inputType) {
        // Convert to decimal first
        const decimalValue = this.toDecimal(value, inputType);
        
        if (isNaN(decimalValue)) {
            throw new Error('Invalid number');
        }
        
        // Convert decimal to other number systems
        return {
            decimal: decimalValue.toString(),
            binary: decimalValue.toString(2),
            hexadecimal: decimalValue.toString(16).toUpperCase(),
            octal: decimalValue.toString(8)
        };
    }
};

module.exports = numberConverter;