import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        return this.store.queryRecord('amigos', params.amigos_id);
    },
    actions: {
        error(error) {
            if (error.message === 'NO_RECORD' || error.message === 'UNEXPECTED_ERROR')
                this.transitionTo('error-404', this);
        }
    }
});
