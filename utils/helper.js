const buildQuery = data => {
    let query = {}
    if ( data?.id ) query.id = data.id 
    if ( data?.name ) query.name = data.name 
    if ( data?.email ) query.email = data.email 
    if ( data?.cpf ) query.cpf = data.cpf
    if ( data?.ra ) query.ra = data.ra

    return query
}

module.exports = {
    buildQuery
}