var BaseResponse = {
    success: Boolean,
    code: Number,
    message: String,
    data: Object,
    errors: Object,
}

exports.successResponse = function(data,code, message){
    BaseResponse.success = true,
    BaseResponse.code = code,
    BaseResponse.message= message,
    BaseResponse.data = data,
    BaseResponse.errors = {};
    return BaseResponse;
}

exports.badRequest = function(errors,code, message){
    BaseResponse.success = false,
    BaseResponse.code = code,
    BaseResponse.message= message,
    BaseResponse.data = {},
    BaseResponse.errors = errors;
    return BaseResponse;
}

exports.serverError = function(){
    BaseResponse.success = false,
    BaseResponse.code = 500,
    BaseResponse.message = "Internal server Error",
    BaseResponse.data = {},
    BaseResponse.errors = {};
    return BaseResponse;
}

