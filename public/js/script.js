
function confirmAction(event) {
    event.preventDefault();
    let decision = confirm("você realmente deseja deletar essa categoria ?")
    if (decision == true) {
        event.target.submit()
    }
}
function confirmCreate(event) {
    event.preventDefault();
    let decision = confirm("Categoria adicionada com sucesso! \n deseja continuar ?")
    console.log(decision);
    if (decision == true) {
        event.target.submit()
        window.location.href = "http://localhost:3000/admin/category/new"
    }else{
        event.target.submit()
    }
}


function confirmArticle(event) {
    event.preventDefault();
    let decision = confirm("Artigo criado com sucesso! \n deseja continuar ?")
    if (decision == true) {
        event.target.submit()
    }
}