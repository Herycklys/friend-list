import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    name_error: {},
    lastname_error: {},
    friendsSince_error: {},
    request_active: false,
    service_validator: service('validate-amigo'),
    salvoSucesso() {
        $('#alert-usuario-salvo').show();

        setTimeout(function () {
            $('#alert-usuario-salvo').slideUp();
        }, 5000);
    },
    salvoError() {
        $('#alert-error-salvo').show();

        setTimeout(function () {
            $('#alert-error-salvo').slideUp();
        }, 5000);
    },
    actions: {
        salvar() {
            let amigo = this.get('model')
                , errors = this.get('service_validator').validate(amigo.toJSON());

            ['name', 'lastname', 'friendsSince'].forEach(field => {
                this.set(`${field}_error`, { has_error: false, message: '' });
            });

            if (errors) {
                for (let field in errors) {
                    this.set(`${field}_error`, { has_error: true, message: errors[field] });
                }
            }

            if (!errors) $('#modal-confirmar-edicao').modal('show');
        },
        cancelaEdicao() {
            this.model.rollbackAttributes();
        },
        confirmModalSave() {
            var that = this;

            this.set('request_active', true);

            this.get('model').save().then(() => {
                that.salvoSucesso();

                that.set('request_active', false);
            }).catch(() => {
                that.salvoError();

                that.set('request_active', false);
            });
        }
    }
});
