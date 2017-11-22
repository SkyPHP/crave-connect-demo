/**
 * Created by cj on 11/22/17.
 */
module.exports = {
    currency : function(input, currency, precision) {
       	// Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            minimumFractionDigits: precision || 0,
            // the default value for minimumFractionDigits depends on the currency
            // and is usually already 2
        });

        return formatter.format(input || 0);
    },
};