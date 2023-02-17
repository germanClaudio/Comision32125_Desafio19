const socket = io.connect()

// ----------  Messages ----------------

socket.on('mensajesAll', async (mensajes) => {   //async (data)
    makeHtmlList (await mensajes)
   
})

const addMessage = () => {
    const mensaje = {
        author: {
            email : document.getElementById('author').value,
            nombre : document.getElementById('nombre').value,
            apellido : document.getElementById('apellido').value,
            edad : document.getElementById('edad').value,
            alias : document.getElementById('alias').value,
            avatar : document.getElementById('avatar').value
        },
        text: document.getElementById('texto').value,
        fyh: new Date().toLocaleString()
    }
    
    console.log('mensaje ',mensaje)
    socket.emit('newMensaje', mensaje )
    return false
}

const makeHtmlList = (mensajes) => {
    // const date = new Date().toLocaleString('en-GB')
    const htmlMsg = mensajes.map((mensaje) => {
        return  (`<div class="d-block mx-auto my-1 p-1">
                    <strong class="text-secondary"> Mensaje-> </strong>
                    <strong class="fw-bold text-primary">${mensaje.author.email}</strong>:
                    <e id="colorBrown" style="color:brown;">${mensaje.fyh} </e>: 
                    <em id="colorGreen" style="color:MediumSeaGreen;">${mensaje.text}</em>
                    <img class="img-fluid rounded-circle" alt="avatar" src='${mensaje.author.avatar}' width="60" height="60">
               </div>`)
    }).join(" ")

    document.getElementById('mostrarMensajes').innerHTML = htmlMsg;
}

// -------------- Show All Products ----------------
socket.on('productsAll', async (arrProd) => {
    renderProduct (await arrProd)
})

const addProduct = () => {
    const name = document.getElementById('name').value
    const timestamp = new Date().toLocaleString('en-GB')
    const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const picture = document.getElementById('picture').value
    const code = document.getElementById('code').value
    const stock = Number(document.getElementById('stock').value)
    const category = document.getElementById('category').value

    socket.emit('newProducto', {
        name,
        timestamp,
        description,
        price,
        picture,
        code,
        stock,
        category
    })
    return false
}

const renderProduct = (arrProd) => {
    const html = arrProd.map((element) => {
    
        return (`<div class="col m-3">
                    <div class="card h-100" style="width: 18rem;">
                        <img src="${element.picture}" class="card-img-top" alt="Picture not Founded" height="215px" >
                        <div class="card-body">
                            <h6 class="card-title"><strong>${element.name}</strong></h6>
                            <p class="card-text">${element.description}<br>
                                                Price (ARS): ${element.price}<br>
                                                Price (${element.moneda}): ${element.precioDolar}<br>
                                                Code: ${element.code}<br>
                                                Stock: ${element.stock}<br>
                                                Category: ${element.category}<br>
                                                </p>
                                <hr>                
                                <a href="#" class="btn btn-primary me-2"><i class="fa fa-shopping-cart"></i></a>
                                <a href="/api/productos/${element._id}" class="btn btn-danger mx-2"><i class="fa fa-pencil"></i> or <i class="fa fa-trash"></i></a>         
                        </div>
                    </div>
                </div>`
                )
    }).join(" ");
        
    document.getElementById('mostrarProductos').innerHTML = html
    
    document.getElementById('name').value = ""
    document.getElementById('description').value = ""
    document.getElementById('price').value = ""
    document.getElementById('picture').value = ""
    document.getElementById('code').value = ""
    document.getElementById('stock').value = ""
}

// -------------- Show Only One Product ----------------
socket.on('showSelecProd', async (oneProduct) => {
    renderOnlyOneProduct (await oneProduct)
})

const showOneProduct = () => {
    const name = document.getElementById('nameSearch').value 
    socket.emit('showSearchProduct', name )
    return false
}

const renderOnlyOneProduct = ( oneProduct ) => {
    
    const oneProductSearch = [oneProduct]
    if(oneProductSearch){
        const htmlOneProduct = Array.from(oneProductSearch).map((element) => {
            
            return (`<div class="card mb-3 mx-auto my-3 text-center" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-4">
                                    <img src="${element.picture}" class="img-fluid rounded-start m-auto" alt="Picture not Founded" width="200px">
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <h6 class="card-title"><strong>${element.name}</strong></h6>
                                        <p class="card-text">${element.description}<br>
                                                            Price(ARS): $${element.price}<br>
                                                            Price (${element.moneda}): ${element.precioDolar}<br>
                                                            Code: ${element.code}<br>
                                                            Stock: ${element.stock}<br>
                                                            </p>
                                                            <hr>                
                                            <a href="#" class="btn btn-primary me-2"><i class="fa fa-shopping-cart"></i></a>
                                            <a href="/api/productos/update/${element._id}" class="btn btn-secondary mx-2"><i class="fa fa-pencil"></i>  <i class="fa fa-trash"></i></a>
                                   </div>
                                </div>
                            </div>
                        </div>
                        <br>`)
            }).join(" ");
                
            document.getElementById('showProductSearch').innerHTML = htmlOneProduct
            document.getElementById('nameSearch').value = "Entro aca"
    
        } else {
        const htmlOneProduct = `<div class="container mx-auto my-3 text-center" style="max-width: 540px;">
                                    <strong>I'm sorry, the Product searched doesn't exists.</strong><br>
                                    Please, Try Again!!!
                                </div><br>`
                
            document.getElementById('showProductSearch').innerHTML = htmlOneProduct
            document.getElementById('nameSearch').value = ""
    }    
}

// --------------------- update ---------------------------------------- 
const updateProduct = () => {
    const _id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const timestamp = new Date().toLocaleString('en-GB')
    const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const picture = document.getElementById('picture').value
    const code = document.getElementById('code').value
    const stock = Number(document.getElementById('stock').value)
    const category = document.getElementById('category').value

    socket.emit('updateProducto', {
        _id,
        name,
        timestamp,
        description,
        price,
        picture,
        code,
        stock,
        category
    })
    return false

}    

const renderUpdatedProduct = (arrProd) => {
    const html2 = arrProd.map((element) => {
    
        return (`<div class="d-block mx-auto my-3 w-75 text-center alert alert-success h5"
        role="alert">Producto actualizado exitosamente!</div>`
                )
    }).join(" ");

    document.getElementById('updateProducto').innerHTML = html2
}

//-------------------------- delete --------------------------------------------
