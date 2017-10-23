import Service from '@ember/service';

export default Service.extend({
    validate(amigo) {
        let errors = {};

        //Valida se todos os campos foram preenchidos
        ['name', 'lastname', 'friendsSince'].forEach(field => {
            amigo[field] = _.trim(amigo[field]);

            if ( !amigo[field] )
                errors[field] = 'Campo obrigatório';
        });

        // Valida se os campos tem ao menos 3 caracteres
        ['name', 'lastname'].forEach(field => {
            if (_.size(amigo[field]) < 4 && !errors[field])
                errors[field] = 'No mínimo 4 caracteres';
        });

        return _.isEmpty(errors) ? undefined : errors;
    }
});
