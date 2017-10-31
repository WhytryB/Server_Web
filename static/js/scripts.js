$(document).ready(function () {
   var form = $('#form_buying_product');
   console.log(form);
   form.on('submit',function(e){
        e.preventDefault();
        console.log('123');
        var nmb = $('#number').val();
        console.log(nmb);
        var submit_btn = $('#submit_btn');
        var product_id = submit_btn.data("product_id");
        var product_name=submit_btn.data("name");
        var product_price=submit_btn.data("price");
        console.log(product_id);
        console.log(product_name);

        var data = {};
       data.product_id = product_id;
       data.nmb = nmb;
       var csrf_token = $('#form_buying_product [name = "csrfmiddlewaretoken"]').val();
       data["csrfmiddlewaretoken"] = csrf_token;
        var url =form.attr("action");
    console.log(data)
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache:true,
            success: function (data) {
                console.log("OK");
                console.log(data.products_total_nmb);
                if (data.products_total_nmb ){
                    $('#basket_total_nmb').text("("+data.products_total_nmb+")");
                     console.log(data.products);
                     $('.basket-items ul').html("");
                     $.each(data.products, function(k, v){
                        $('.basket-items ul').append('<li>'+ v.name +', ' + v.nmb + 'шт. ' + 'по ' + v.price_per_item + 'грн  ' +
                            '<a class="delete-item" href="" data-product_id="'+v.id+'">x</a>'+ '</li>');
                    })


                }
           },
           error:function(){
                console.log("error");
           }
       });


   });

    function showingbasket(){
       $('.basket-items').removeClass('hidden');

    };


    $('.basket-container').on('click', function(e) {
        e.preventDefault();
        showingbasket();

    });
    $('.basket-container').mouseover('hover', function(e) {
        showingbasket();
    });
    $('.basket-container').mouseout('click, hover', function(e) {
         $('.basket-items').addClass('hidden');

    });
    $(document).on('click','.delete-item', function (e) {
        e.preventDefault();
        $(this).closest('li').remove()
    })
});

$(window).scroll(function() {
    if($(this).scrollTop() > 50)
    {
        $('.navbar-trans').addClass('afterscroll');
    } else
    {
        $('.navbar-trans').removeClass('afterscroll');
    }

});


// Carousel Auto-Cycle
  $(document).ready(function() {
    $('.carousel').carousel({
      interval: 5000
    });
  });

  // Carousel Auto-Cycle
  $(document).ready(function() {
    $('.carousel').carousel({
      interval: 6000
    })
  });

/*#####################
Additional jQuery (required)
#####################*/
    var boxheight = $('.carousel-inner').height();
	var itemlength = $('.item').length;
	var triggerheight = Math.round(boxheight/itemlength+1);
	$('.list-group-item').height(triggerheight);

	var clickEvent = false;
	$('#myCarousel').carousel({
		interval:   4000
	}).on('click', '.list-group li', function() {
			clickEvent = true;
			$('.list-group li').removeClass('active');
			$(this).addClass('active');
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.list-group').children().length -1;
			var current = $('.list-group li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.list-group li').first().addClass('active');
			}
		}
		clickEvent = false;
	});