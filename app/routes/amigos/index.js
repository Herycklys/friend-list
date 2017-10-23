import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        nome: {
            refreshModel: true
        }
    },
    model(params) {
        return this.store.query('amigos', params);
    }
});
