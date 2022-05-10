function showAllBook() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/list",
        success: function (book) {
            let content="";
            for (let i = 0; i < book.length; i++) {
                content +=`<tr>
            <th scope="row">${book[i].id}</th>
            <td>${book[i].name}</td>
            <td>${book[i].price}</td>
            <td>${book[i].author}</td>
            <td>${book[i].category.name}</td>
            <td><img src="${'http://localhost:8080/image/'+book[i].image}" width="100px"></td>
            <td><button type="button"  onclick="deleteBook(${book[i].id})">Delete</button></td>
            <td><button type="button" data-bs-toggle="modal" data-bs-targert="#myModal" onclick="showEditForm(${book[i].id})">Edit</button></td>
        </tr>`
            }
            $("#list-book").html(content);
        }
    })
}
showAllBook();
function showCate(){
    $.ajax({
        type: "GET",
        url:"http://localhost:8080/books/category",
        success:function (category) {
            let content="";
            for (let i = 0; i < category.length; i++) {
                content+= `<option value="${category[i].id}">${category[i].name}</option>`
            }
            $("#category").html(content);
        }
    })
}
showCate();
function createBook() {
//lay du lieu
    let name=$("#name").val();
    let price=$("#price").val();
    let author=$("#author").val();
    let category=$("#category").val();
    let image=$("#image");
    let bookForm= new FormData();

        // "name":name,
        // "price":price,
        // "author":author,
        // "category":{id:category}
        bookForm.append('name',name);
        bookForm.append('price',price);
        bookForm.append('author',author);
        bookForm.append('category',category);
        bookForm.append('image',image.prop('file')[0]);

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        enctype:'multipart/form-data',
        processData:false,
        contentType:false,
        data:bookForm,
        url:"http://localhost:8080/books",
        success:showAllBook
    });
    event.preventDefault();
}
function deleteBook(id) {
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/books/${id}`,
        success:showAllBook
    })

}
function updateBook(id) {
    let name=$(`#name`).val();
    let price=$(`#price`).val();
    let author=$(`#author`.val());
    let category=$(`#category`).val();
    let book={
        "name":name,
        "price":price,
        "author":author,
        "category":{id:category}
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"PUT",
        data: JSON.stringify(book),
        url:`http://localhost:8080/books/${id}`,
        success:showAllBook
    })
}
function showEditForm(id) {
    let content= `<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary"  onclick="updateBook(${id})">Update</button>`
   $("#showModalButton").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/books/${id}`,
        success:function (book) {
            $(`#name`).val(book.name)
            $(`#price`).val(book.price)
            $(`#author`).val(book.author)
            $(`#category`).val(book.category.name)
        }
    })
}
$(document).ready(showAllBook())