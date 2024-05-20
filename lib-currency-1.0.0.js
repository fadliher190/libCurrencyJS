(function($) {
    $.fn.libCurrency = function(options) {
        // Default options
        var settings = $.extend({
            prefix: '$',
            centsSeparator: '.',
            thousandsSeparator: ','
        }, options);

        // Helper function to format numbers
        function formatNumber(n, prefix, centsSeparator, thousandsSeparator) {
            n = n.replace(/\D/g, "");
            if (n.length === 0) return "";
            n = (n / 100).toFixed(2);
            n = n.toString().split(".");
            n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
            return prefix + n.join(centsSeparator);
        }

        // Apply formatting on keyup event
        this.each(function() {
            var $this = $(this);

            $this.on('input', function() {
                var formattedValue = formatNumber($this.val(), settings.prefix, settings.centsSeparator, settings.thousandsSeparator);
                $this.val(formattedValue);
            });

            // Initialize value
            var initialFormattedValue = formatNumber($this.val(), settings.prefix, settings.centsSeparator, settings.thousandsSeparator);
            $this.val(initialFormattedValue);
        });

        return this;
    };
}(jQuery));