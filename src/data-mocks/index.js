
export const fetchData = () => {
    return new Promise((resovle, reject) => {
        setTimeout( async () => {
            try {
            // example call data from Server
            let users = await localStorage.getItem('lst');
            users = JSON.parse(users);
                resovle(users);
            } catch (error) {
                reject(error);
            }
            
        }, 1000)
    })
}


