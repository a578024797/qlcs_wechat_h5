function showSnow(id,url,count,minS,maxS) {
    $(`#${id}`).snowfall({
        image:url,			
              flakeCount: count || 10,
              minSize: minS || 10,
              maxSize: maxS || 20
          }); 
}


function clearSnow(id) {
    $(`#${id}`).snowfall('clear');
    $(`#${id}`).hide();
}