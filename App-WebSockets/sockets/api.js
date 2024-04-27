const URL_API='https://json-sokcet.onrender.com/'
export const getAll=async()=>{
    const data=await fetch(URL_API);
    const{ datas } = await data.json()
    //console.log(garments)
    return datas;
}
export const deleteOne=async(id)=>{
    const res=await fetch(URL_API+"delete/"+id,{
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
        }
    })
    return await res.json();
}
export const insertOne=async(product)=>{
    const res=await fetch(URL_API,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
           
        },
        body:JSON.stringify(product)
    });
    return await res.json();
}
