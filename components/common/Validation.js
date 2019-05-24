const validators = {

    userName : {
        rules: [
            {
            test : /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
            message: 'Email is not valid'
        }
        ],
        errors: [],
    valid: false,
    state: '',
    },
    password: {
        rules: [
            {

            test: (value) => {
                return value.length >= 6;
              },
              message:'Password must not be shorter than 6 characters'
        }
           
        ],
        errors: [],
    valid: false,
    state: '',
    }
}

export default validators;