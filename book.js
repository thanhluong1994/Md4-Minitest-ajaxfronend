function showAllBook() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/list",
        success: function (book) {
            let content="";
            for (let i = 0; i < book.length; i++) {
                content +=`<tr>
            <th scope="row">${i+1}</th>
            <td>${book[i].name}</td>
            <td>${book[i].price}</td>
            <td>${book[i].author}</td>
            <td>${book[i].category.name}</td>
            <td><img src="http://localhost:8080/image/${book[i].image}" width="100px"></td>
            <td><button type="button"  onclick="deleteBook(${book[i].id})">Delete</button></td>
            <td><button type="button" data-toggle="modal" data-target="#myModal" onclick="showEditForm(${book[i].id})">Edit</button></td>
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
            $("#category1").html(content);
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
        bookForm.append('image',image.prop('files')[0]);

    $.ajax({
        // headers:{
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
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
    let name=$(`#name1`).val();
    let price=$(`#price1`).val();
    let author=$(`#author1`).val();
    let category=$(`#category1`).val();
    let image=$(`#image1`);
    let bookForm= new FormData();
    bookForm.append('name',name);
    bookForm.append('price',price);
    bookForm.append('author',author);
    bookForm.append('category',category);
    bookForm.append('image',image.prop('files')[0]);
    if (image.prop('files')[0]=== undefined){
        let file = new File([""],"filename.jpg")
        bookForm.append('image',file);
    } else {
        bookForm.append('image',image.prop('files')[0]);
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        enctype:'multipart/form-data',
        processData:false,
        contentType:false,
        data:bookForm,
        url:"http://localhost:8080/books/edit/"+id,
        success:showAllBook
    })

}
function showEditForm(id) {
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/books/${id}`,
        success:function (book) {
            $(`#name1`).val(book.name)
            $(`#price1`).val(book.price)
            $(`#author1`).val(book.author)
            $(`#category1`).val(book.category.name)
            let img = `<img src="http://localhost:8080/image/${book.image}" width="100">`
            $(`#showImg`).html(img)
            let ct = `<button onclick="updateBook(${book.id})" data-bs-toggle="modal" data-bs-target="#myModal">Update</button>`
            $(`#ct`).html(ct)
        }
    })
    showCate();
}
$(document).ready(showAllBook())