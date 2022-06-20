import moment from "moment"
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
    console.log('kkk: ', !moment(values.expiration).startOf('day').isSame(moment().startOf('day')));
    console.log('values.expiration: ', values.expiration);
    console.log('haha: ', moment(values.expiration).isBefore(moment()))
    if(values.expiration && (moment(values.expiration).isBefore(moment()))){
      error.expiration = "Expiration date can not be before the current date!";
    }
    // if(!values.description){
    //     error.description = REQUIRE;
    // }
    // if(!values.functions){
    //     error.functions = REQUIRE;
    // }
    // if(!values.image){
    //     error.image = REQUIRE;
    // }
    return error;
}