import { LocalResult } from "./baseResult";

export class SuccessResult extends LocalResult{
    constructor(message:string){
        super(true,message);
    }
}