export const setLocalStorage=(key,data)=>{
    try {
        localStorage.setItem(key,JSON.stringify(data))
    } catch (err) {
       console.log(err) 
    }
    }
    
    
    export const getLocalStorage=(key)=>{
        try {
           return JSON.parse(localStorage.getItem(key) ?? "");
        } catch (error) {
            console.log(error)
        }
    }
    
    export const removeLocalStorage=(key)=>{
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.log(error)
        }
    }