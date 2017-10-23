import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

Ember.TextField.reopen({
    attributeBindings: ['data-dismiss']
});

export default Controller.extend({
    model: {},
    name_error: {},
    lastname_error: {},
    friendsSince_error: {},
    request_active: false,
    service_validator: service('validate-amigo'),
    salvoSucesso() {
        $('#modal-salvo-sucesso').modal('show');
    },
    salvoError() {
        $('#alert-error-salvo').show();

        setTimeout(function () {
            $('#alert-error-salvo').slideUp();
        }, 5000);
    },
    clear() {
        this.set('model', {});
    },
    actions: {
        salvar() {
            let amigo = this.get('model')
                , errors = this.get('service_validator').validate(amigo)
                , that = this
                , novoAmigo;

            ['name', 'lastname', 'friendsSince'].forEach(field => {
                this.set(`${field}_error`, { has_error: false, message: '' });
            });

            if (errors) {
                for (let field in errors) {
                    this.set(`${field}_error`, { has_error: true, message: errors[field] });
                }

                return;
            }

            this.set('request_active', true);

            novoAmigo = this.get('store').createRecord( 'amigos', amigo );

            novoAmigo.save().then(() => {
                that.clear();

                that.salvoSucesso();

                that.set('request_active', false);
            }).catch(e => {
                console.error('ERROR ->', e);

                that.salvoError();

                that.set('request_active', false);
            });
        },
        linkToList() {
            this.transitionToRoute('amigos');
        }
    }
});
