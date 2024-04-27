const URL_API='http://172.16.1.67:3444/'
export const getAll = async () => {
    try {
        const productsResponse = await fetch(URL_API,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json',
               
            }
        });
        if (!productsResponse.ok) {
            throw new Error(`Error al obtener los productos. Estado: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
        console.log(productsData.products);
        //console.log(productsResponse.status);
        return productsData.products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return null; 
    }
}

export const deleteOne=async(barcode)=>{
    const res=await fetch(URL_API+"delete/"+barcode,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
        }
    })
    return await res.json();
}
export const insertOne=async(products)=>{
    console.log("intentando insertar producto");
    const res=await fetch(URL_API,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
           
        },
        body:JSON.stringify(products)
    });
    return await res.json();
}
export const updateOne=async(barcode,products)=>{
    console.log("llamando update")
    const res=await fetch(URL_API+barcode,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
           
        },
        body:JSON.stringify(products)
    });
    return await res.json();
}