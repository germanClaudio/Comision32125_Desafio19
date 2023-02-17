const socket = io.connect()

//   Products historial ----------------
socket.on('productsAll', (arrProd) => {
    renderProduct(arrProd)
})

const renderProduct = (arrProd) => {
    const arrayProd = arrProd //JSON.parse(arrProd)

    const html = arrProd.map((element) => {
        return (`<tr>
                    <th scope="row" class="text-center"><strong>${element._id}</strong></th>
                    <td class="text-center">${element.name}</td>
                    <td class="text-center">${element.description}</td>
                    <td class="text-center">$${element.price}</td>
                    <td class="text-center"><img class="img-fluid rounded" alt="Product image not found" src='${element.picture}' width="100" height="80"></td>
                    <td class="text-center">${element.picture}</td>
                    <td class="text-center">${element.code}</td>
                    <td class="text-center">${element.stock}</td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarProductos').innerHTML = html

    const htmlProdList = 
        ( `<caption id="capProdList">Total Product List ${arrayProd.length}</caption>`)

    document.getElementById('capProdList').innerHTML = htmlProdList
}

