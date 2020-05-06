import * as types from "./../consts/";

// class fetch Api
export class FetchAPi {
   static request(){
        return {
            type: types.API_CALL_REQUEST,
          };
    }
    static success(data){
        return {
            type: types.API_CALL_SUCCESS,
            data,
          };
    }
    static fail(error) {
        return {
            type: types.API_CALL_SUCCESS,
            error,
          };
    }
    
}