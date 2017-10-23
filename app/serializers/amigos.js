import DS from 'ember-data';

export default DS.JSONSerializer.extend({
    primaryKey: '_id',
    normalize(typeClass, hash) {
        let fields = Ember.get(typeClass, 'fields');

        if(!hash)
            throw new Error('NO_RECORD');

        if(
            fields.every(field => _.has( hash, field ))
        ) throw new Error('UNEXPECTED_ERROR');

        return this._super.apply(this, arguments);
    },
    serialize (snapshot) {
        snapshot.friendsSince = moment(snapshot.friendsSince).toISOString();

        return {
            name: snapshot.attr('name'),
            lastname: snapshot.attr('lastname'),
            friendsSince: snapshot.friendsSince
        }
    },
    normalizeUpdateRecordResponse(store, primaryModelClass, payload, id) {
        payload.friend.id = id;

        return {
            data: payload.friend
        }
    },
    normalizeCreateRecordResponse(store, primaryModelClass, payload, id) {
        payload.friend.id = payload.friend._id;

        return {
            data: payload.friend
        }
    }
});
