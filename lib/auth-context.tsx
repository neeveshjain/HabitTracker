import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContexType = {
    user : Models.User<Models.Preferences> | null;
    isLoadingUser:boolean;
    signUp:(email:string, password:string) => Promise<string|null>;
    signIn:(email:string, password:string) => Promise<string|null>;
    signOut:() => Promise<void>;
}

const AuthContext = createContext<AuthContexType | undefined> (undefined);

export function AuthProvide({children}: {children: React.ReactNode}){

    const [user,setUser] = useState<Models.User<Models.Preferences> | null>(null) ;
    const [isLoadingUser,setisLoadingUser] = useState<boolean>(true);

    useEffect(() => {
        getUser();
    },[]);
    const getUser = async() =>{
        try{
            const session = await account.get()
            setUser(session);
        }
        catch(error){
            setUser(null);
        } finally{
            setisLoadingUser(false);
        }
    }

    const signUp = async (email:string, password:string) => {
        try {
            await account.create(ID.unique(),email,password);
            await signIn(email,password);
            return null;
        }
        catch(error){
            if (error instanceof Error){
                return error.message;
            }
            return "An Error occured during sign up.";
        }
    };
    const signIn = async (email:string, password:string) => {
        try {
            await account.createEmailPasswordSession(email,password);
            const session  = await account.get();
            setUser(session);
            return null;
        }
        catch(error){
            if (error instanceof Error){
                return error.message;
            }
            return "An Error occured during sign In.";
        }
    };

    const signOut = async () => {
        try{
        await account.deleteSession("current");
        setUser(null);
        }
        catch(error){
            console.log(error)
        }
    }

    return (<AuthContext.Provider value = {{user,isLoadingUser,signUp,signIn,signOut}}>
        {children}
    </AuthContext.Provider>);
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("useAuth must be inside of the Authprovider");
        
    }
    return context;

}