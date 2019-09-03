

export const decorateorApi = function(api) {
    
    return async (params) => {
        let resp = await api(params)
        let data = resp.data
        
        if(data.code && data.code !== '00000') {
            Toast.text(data.msg) 
            return {err: data.msg, data}
        }
        
        return {err: null, data}
    }
}