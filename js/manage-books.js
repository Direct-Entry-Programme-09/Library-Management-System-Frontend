const API_END_POINT='http://localhost:8080/lms/api/books';
const pageSize =3;
let page=1;

getBooks();
function getBooks(query=`${$('#txt-search').val()}`){
    const http= new XMLHttpRequest();

    http.addEventListener('readystatechange',()=>{
        if (http.readyState=== http.DONE) {
            
            if(http.status===200){
                const books=JSON.parse(http.responseText);

                $('#tbl-book tfoot tr').remove();
                books.forEach((book, index )=> {
                    console.log(book.isbn);
                    const rowHtml=`
                        <tr tabindex="0">
                            <td>${book.isbn}</td>
                            <td>${book.bookName}</td>
                            <td>${book.author}</td>
                            <td>${book.copies}</td>
                        </tr>
                    `;
                    $('#tbl-book tbody').append(rowHtml);
                });

            }
        }
    });

    http.open('GET',`${API_END_POINT}?size=${pageSize}&page=${page}&q=${query}`,true);

    http.send();
}

$('#txt-search').on('input',()=>{
    getBooks();
});