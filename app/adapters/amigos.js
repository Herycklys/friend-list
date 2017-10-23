import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
    host: config.APP.urlApi,
    'friend-edit': false,
    headers: Ember.computed(function () {
        let headers = {
            'Content-Type': 'application/json'
        };

        if (this.get('friend-edit')) headers['friend-edit'] = true;

        return headers;
    }).volatile(),
    query: function (store, type, query) {
        if (query) {
            query = { name: query.nome };
        }

        this.set('friend-edit', false);

        return this.ajax(this.buildURL('friends'), 'GET', { data: query });
    },
    queryRecord: function (store, type, id) {
        this.set('friend-edit', false);

        return this.ajax(this.buildURL('friends', id), 'GET');
    },
    updateRecord(store, type, snapshot) {
        let data = {}
            , serializer = store.serializerFor(type.modelName)
            , url = this.buildURL('friends', snapshot.id);

        data = serializer.serialize(snapshot);

        this.set('friend-edit', true);

        return this.ajax(url, "PUT", { data });
    },
    createRecord(store, type, snapshot) {
        let data = {}
            , serializer = store.serializerFor(type.modelName)
            , url = this.buildURL('friends');

        data = serializer.serialize(snapshot);

        this.set('friend-edit', false);

        return this.ajax(url, "POST", { data });
    }
});
