import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['nome'],
    nome: null,
    didInsertElement() {
        this.$('#field-search').blur();
    },
    actions: {
        showAmigo(id) {
            this.transitionToRoute('amigo', id);
        }
    }
});
