'use strict';

describe('intl-format-cache', function () {
    it('has a function as the default export', function () {
        expect(memoizeFormatConstructor)
            .toBeTruthy();
        expect(typeof memoizeFormatConstructor)
            .toBe('function');
    });

    describe('Intl built-ins', function () {
        describe('Intl.DateTimeFormat', function () {
            var getDateTimeFromat = memoizeFormatConstructor(Intl.DateTimeFormat);

            it('memoizes Intl.DateTimeFormat', function () {
                var df = getDateTimeFromat('en');

                expect(df.resolvedOptions().locale).toBe('en');
                // Lack of tz support, so just check that it returns a string.
                expect(typeof df.format(0)).toBe('string');

                expect(getDateTimeFromat('en')).toBe(df);
                expect(getDateTimeFromat('en', {year: 'numeric'})).not.toBe(df);
            });
        });

        describe('Intl.NumberFormat', function () {
            var getNumberFormat = memoizeFormatConstructor(Intl.NumberFormat);

            it('memoizes Intl.NumberFormat', function () {
                var nf = getNumberFormat('en');

                expect(nf.resolvedOptions().locale).toBe('en');
                expect(nf.format(1000)).toBe('1,000');

                expect(getNumberFormat('en')).toBe(nf);
                expect(getNumberFormat('en', {style: 'percent'})).not.toBe(nf);
            });
        });
    });

    describe('IntlMessageFormat', function () {
        var getMessageFormat = memoizeFormatConstructor(IntlMessageFormat);

        it('memoizes IntlMessageFormat', function () {
            var mf = getMessageFormat('foo', 'en');

            expect(mf.resolvedOptions().locale).toBe('en');
            expect(mf.format()).toBe('foo');

            expect(getMessageFormat('foo', 'en')).toBe(mf);
            expect(getMessageFormat('bar', 'en')).not.toBe(mf);
        });
    });

    describe('IntlRelativeFormat', function () {
        var getRelativeFormat = memoizeFormatConstructor(IntlRelativeFormat);

        it('memoizes IntlRelativeFormat', function () {
            var rf = getRelativeFormat('en');

            expect(rf.resolvedOptions().locale).toBe('en');
            expect(rf.format(0, {now: 1000})).toBe('1 second ago');

            expect(getRelativeFormat('en')).toBe(rf);
            expect(getRelativeFormat('en', {units: 'hour'})).not.toBe(rf);
        });
    });
});
