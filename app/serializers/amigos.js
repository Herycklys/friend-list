import DS from 'ember-data';

export default DS.JSONSerializer.extend({
    primaryKey: '_id',
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
