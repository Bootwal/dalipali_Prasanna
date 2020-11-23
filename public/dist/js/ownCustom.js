function preview() {
  frame.src = URL.createObjectURL(event.target.files[0]);
}

//editwhist list
$(document).ready(function () {
  $(document).on('submit', '.editWhist', function (e) {
    e.preventDefault();
    var product_id = $(this).data('value');
    var url = '/product/wishlist/' + product_id;
    $.ajax({
      url: url,
      type: 'post',
      success: function (data) {
        $('#wishlistPart').html(data.html);
      }
    })
  });
});

// comment form 
$(document).ready(function () {
  $(document).on('submit', '#commentForm', function (e) {
    e.preventDefault();
    if ($("#comment").val().replace(/^\s+|\s+$/g, "").length != 0) {
      var data = $(this).serializeArray();
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        data: data,
        type: 'post',
        success: function (data) {
          $("#commentPart").html(data.html);
        }
      })
    }
    else {

      $("#comment").css("border-color", "red");
    }
  });
});
/// search product
$(document).ready(function () {
  $("#mySearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#rows .card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
$(document).ready(function () {
  $("#mySelected").click(function () {
    var value = $(this).children("option:selected").val();
    var id = $('#list-group').find('.active').data('id');
    var products = $('.cards');
    if (id == undefined) {
      var cat = 0;
      if (value == 0) {
        $.ajax({
          url: '/getAllproduct/' + cat,
          type: 'GET',
          success: function (data) {
            $('#rows').html(data)
          }
        })
      }
      else if (value == 1) {
        products.sort(function (a, b) { return $(a).data('price') - $(b).data('price') });
        $('#rows').html(products)
      }
      else if (value == 2) {
        products.sort(function (a, b) { return $(b).data('price') - $(a).data('price') });
        $('#rows').html(products)
      }
      else if (value == 5) {
        products.sort(function (a, b) { return $(a).data('rating') - $(b).data('rating') });
        $('#rows').html(products)
      }
      else if (value == 6) {
        products.sort(function (a, b) { return $(b).data('rating') - $(a).data('rating') });
        $('#rows').html(products)
      }
    }
    else {
      if (value == 0) {
        $.ajax({
          url: '/getAllproduct/' + id,
          type: 'GET',
          success: function (data) {
            $('#rows').html(data)
          }
        })
      }
      else if (value == 1) {
        products.sort(function (a, b) { return $(a).data('price') - $(b).data('price') });
        $('#rows').html(products)
      }
      else if (value == 2) {
        products.sort(function (a, b) { return $(b).data('price') - $(a).data('price') });
        $('#rows').html(products)
      }
      else if (value == 5) {
        products.sort(function (a, b) { return $(a).data('rating') - $(b).data('rating') });
        $('#rows').html(products)
      }
      else if (value == 6) {
        products.sort(function (a, b) { return $(b).data('rating') - $(a).data('rating') });
        $('#rows').html(products)
      }

    }



  });
});

// $(document).ready(function () {
//   $('.groupItem').click(function (event) {
//     event.preventDefault();
//     $(".list-group .groupItem").removeClass("active");
//     $(event.target).addClass("active");
//     var url = $(this).attr('href');
//     $('#mySelected').prop('selectedIndex', 0).trigger("change");
//     $.ajax({
//       url: url,
//       type: 'GET',
//       success: function (data) {
//         $('#rows').html(data);
//       }
//     })
//     return false;
//   })
// });

$(document).on('click', '#addTocart', function () {
  var id = $(this).data('product_id');
  $.ajax({
    type: "GET",
    data: id,
    url: '/product/addcart/' + id,
    success: function (data) {
      $('.badge').html(data.totalcart);
      if (data.message1) {
        Swal.fire({
          type: 'warning',
          title: 'NO ITEM',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (data.message) {
        Swal.fire({
          type: 'warning',
          title: 'Already in cart',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        Swal.fire({
          type: 'success',
          title: 'Item add',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  });
});

$(document).on('click', '.addBy', function (event) {
  event.preventDefault();
  var url = $(this).attr('href');
  $.ajax({
    url: url,
    type: 'GET',
    success: function (data, textStatus) {
      if (data.error == 'error') {
        toastr.options = {
          "closeButton": true,
          "positionClass": "toast-top-center",
          "showEasing": "swing",
          "preventDuplicates": false,
          "progressBar": true,
          "showMethod": "fadeIn",
          "showDuration": "300",
          "hideDuration": "1000",
        }
        toastr.info("No More Available", "Sorry"
        );
        $('.badge').html(data.totalQty);
        $('#cartPart').html(data.html);
      }
      else {
        $('.badge').html(data.totalQty);
        $('#cartPart').html(data.html);
      }
    }
  });
});

//slider part
$(document).ready(function () {

  $('.items').slick({
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  });
});
//// add menuCategory
$(document).ready(function () {
  $('.submenuCategory').on('click', function (event) {
    var subCategory_id = $(this).data("id");
    var url = '/submenuCategorys/' + subCategory_id;
    var lioption = '';
    $('#submenuCategory' + subCategory_id).empty();
    $.ajax({
      url: url,
      type: "GET",
      success: function (data) {
        var d = data.result;
        for (var i = 0; i < d.length; i++) {
          lioption += ' <a href="#" class="showProduct" style="color:gray" data-brand="' + d[i].brand_id + '"' + 'data-menu="' + d[i].subcategory_id + '"' + '> <li class="list-group-item" >' + d[i].brand_name + '</li> </a>';
        }
        $('#submenuCategory' + subCategory_id).append(lioption);

      }
    })
  })
})

$(document).ready(function () {
  $(document).on('click', '.showProduct', function (event) {
    event.preventDefault();
    $('.showProduct .list-group-item').removeClass("colors");
    $(event.target).addClass("colors");
    $(this).find('li').removeClass("borders-color");
    var subCategory_id = $(this).data('menu');
    var submenuCategory_id = $(this).data('brand');
    var url = '/productView/' + subCategory_id + '/' + submenuCategory_id;

    $.ajax({
      url: url,
      type: 'Get',
      success: function (data) {
        $('#rows').html(data)

      }
    })

  })
})
/// order button 
$(document).ready(function () {
  $(document).on('submit', '#Orderform', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var url = $(this).attr('action');
    $.ajax({
      url:url,
      data:data,
      type:'POST',
      success:function(data){

        if(data.message==='no item'){
          location.href = '/allProduct'
        }
        else if(data.message==='succuss'){
          var socket = io('http://172.62.16.8:5000/notifaction');
          socket.emit('event', { message: 'New Order' })
          Swal.fire({
            type: 'success',
            title: 'Thanks for shopping with us! Your order’s confirmed and call after some time',
            showConfirmButton: false,
            timer: 2500,
          },
          );
          var delay = 2500;
          setTimeout(function(){ window.location = '/allProduct'; }, delay);
        }
        
      }
    })
    
    return false;
  });
})




