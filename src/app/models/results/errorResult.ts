import { LocalResult } from "./baseResult";

export class ErrorResult extends LocalResult{
    constructor(message:string){
        super(false,message);
    }
}