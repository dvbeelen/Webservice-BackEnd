module.exports.createPagination = (total, start, limit) =>  {
    //The pagination item as to be displayed in the API.
    let pagination = {
        currentPage: currentPage(total, start, limit),
        currentItems: currentItems(total, start, limit),
        totalPages: numberOfPages(total, start, limit),
        totalItems: total,
        _links: {
            first: {
                href: getFirstQueryString(total, start, limit),
            },
            last: {
                href: getLastQueryString(total, start, limit),
            },
            next: {
                href: getNextQueryString(total, start, limit)
            },
            previous: {
                href: getPreviousQueryString(total, start, limit)
            }
        }
    }

    return pagination;
}

function currentItems(total, start, limit){
    if( (limit == 0) && (start == 0) ){
        return total;
    } else if((start + limit) < total){
        return limit;
    } else{
        return total - start;
    } 
}

function numberOfPages(total, start, limit){
    if( (limit == 0) && (start == 0) ){
        return 1;
    } else if( (limit == 0) && (start !=1) ){
        return 2;
    }

    else{
        let pages = total/limit;
        pages = Math.ceil(pages);
  
        return pages;
    }
}

function currentPage(total, start, limit){
    if (start == 0 || limit == 0){
        return 1;
    } else if (limit == 0){
        return 2;
    } else {
        let page = (Math.ceil(start/limit)) + 1;
        return page;
    }
}

function getFirstQueryString(total, start, limit){
    if (numberOfPages(start, limit, total) == 1){
        return "";
    } else {
        let firstPage = 'http://145.24.222.215:8000/cases/?start=' + 0 + '&limit=' + limit;
        return firstPage;
    }
}

function getLastQueryString(total, start, limit){
    if(numberOfPages(total, start, limit) == 1){
        return "";
    }
    else {
        if(limit !=0) {
            start = total - limit;
        }

        let lastPage = 'http://145.24.222.215:8000/cases/?start=' + start + '&limit=' + limit;
        return lastPage;
    }
}

function getPreviousQueryString(total, start, limit){
    if( (numberOfPages(start, limit, total) == 1) || (start < limit)){
        return "";
    } else {
        let previousPage = 'http://145.24.222.215:8000/cases/?start=' + (start-limit) + '&limit=' + limit;
        return previousPage;
    }
}

function getNextQueryString(total, start, limit){
    if( (numberOfPages(start, limit, total) == 1) || ((start + limit) > total)){
        return "";
    } else {
        let nextPage = 'http://145.24.222.215:8000/cases/' + (start+limit) + '&limit=' + limit;
        return nextPage;
    }
}

function itemToPageNumber(total, start, limit, itemNumber){
    
}



