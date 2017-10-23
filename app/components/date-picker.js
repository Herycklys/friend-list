import Component from '@ember/component';
import { observer } from '@ember/object';
import { on } from "@ember/object/evented";

export default Component.extend({
    class: 'datepicker-here form-control',

    propertyValueObserver: observer('val', function() {
        let value = moment( this.get('val') );

        if( !this.get('val') )
            return this.$datepicker.clear();

        if( value.diff( moment( this.$datepicker.selectedDates[0] ) ) )
            this.$datepicker.selectDate(value.toDate());
    }),

    propertyErrorObserver: on('init', observer('error', function () {
        let _class = this.get('class').replace(/(is-valid)|(is-invalid)/g, '')
          , error = this.get('error');

        if( _.isString(error) ) {
            if( error )
                _class += ' is-invalid';
            else
                _class += '';
        }

        this.set('class', _class);
    })),

    didInsertElement() {
        this._super(...arguments);

        let that = this;

        this.$datepicker = this.$('.datepicker-here')
                                .datepicker({
                                    language: 'pt-BR',
                                    position: 'top left',
                                    minDate: moment().subtract(1, 'month').toDate(),
                                    maxDate: moment().add(1, 'month').toDate(),
                                    onSelect: function onSelect(fd, date) {
                                        let currentDate = that.get('val');

                                        if( moment( currentDate ).diff( moment(date) ) || !currentDate )
                                            that.set('val', date);
                                    }
                                })
                                .data('datepicker');

        if( this.val )
            this.$datepicker.selectDate(moment(this.val).toDate());
    }
});
