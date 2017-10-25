import DS from 'ember-data';

export default DS.JSONSerializer.extend({
    primaryKey: '_id',
    normalize(typeClass, hash) {
        let fields = Ember.get(typeClass, 'fields'),
            hasAllFields = true;

        if(!hash)
            throw new Error('NO_RECORD');

        fields.forEach(field => {
            if( hasAllFields && !_.has( hash, field ) ) {
                hasAllFields = false;
            }
        });

        if(
            hasAllFields
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
    normalizeCreateRecordResponse(store, primaryModelClass, payload) {
        payload.friend.id = payload.friend._id;

        return {
            data: payload.friend
        }
    }
});
