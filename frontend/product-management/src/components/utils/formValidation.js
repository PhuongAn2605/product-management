const REQUIRE = 'This field is required!';

export const formProductValidation = values => {
    const error = {};
    if(!values.productName){
        error.productName = REQUIRE;
    }
    if(!values.shortName){
        error.shortName = REQUIRE;
    }
    if(!values.location){
        error.location = REQUIRE;
    }
    if(!values.expiration){
        error.expiration = REQUIRE;
    }
    if(!values.description){
        error.description = REQUIRE;
    }
    // if(!values.functions){
    //     error.functions = REQUIRE;
    // }
    // if(!values.image){
    //     error.image = REQUIRE;
    // }
    return error;
}