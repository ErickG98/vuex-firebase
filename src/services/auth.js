import {auth} from './firebase';

export function verifyToken(token){
    if(auth.currentUser.uid == token){
        return true;
    }else{
        return false;
    }
}