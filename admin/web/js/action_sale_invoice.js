/*!
* EWIN
* v4.05.23 - 2018
* (c) Assawin.Thkch; MIT License
*/
$(document).ready(function() {
  loadFindBox(".sale-invlice-line-render");
  if ($("#ew-total").attr("data") === 0) {
    $(".ew-confirm-post").hide();
  } else {
    $(".ew-confirm-post").show();
  }
  // Modal load
  $("#ewPickCustomer").on("shown.bs.modal", function() {
    //$('a[id="ew-pick-customer"]').attr('id','ew-pick-inv-customer');
  });
  // Modal load
  $("#ewGetItemModal").on("shown.bs.modal", function() {
    $("tr").each(function(i, el) {
      $(el)
        .children("td")
        .find("#ew-inv-qty")
        .hide();
      $(el)
        .children("td")
        .find("#ew-inv-price")
        .hide();
    });
  });
  $(document).on("pjax:success", function() {
    LoadFunction();
    $(document).pjax("a", "#grid-user-pjax"); // จะทำให้ Page ทำงาน
  });
  $(".ew-add-to-inv-line").hide();
  $("input,select, textarea").change(function() {
    $('button[type="submit"]').attr("style", "border:1px solid red;");
    $(".ew-confirm-post")
      .attr("disabled", "disabled")
      .attr("class", "btn btn-default");
    $(".ew-print-preview")
      .attr("disabled", "disabled")
      .attr("class", "btn btn-default")
      .attr("href", "#")
      .attr("target", "");
  });
  vatEvent($("#saleinvoiceheader-vat_percent"));
  // Modal load
  $("#ew-add-series").on("shown.bs.modal", function() {
    var formIDmodal = $(".modal button[type=submit]")
      .closest("form")
      .attr("class");
    // $('.ew-save-modal-common').attr('onclick','$(\'#'+ formIDmodal +'\').submit()');
    $("button[type=submit]").hide();
    $("#numberseries-name").val("SaleInvoice");
    $("#numberseries-name").attr("disabled", "disabled");
  });
  var invoice = Number($(".ew-inv-no").attr("ew-no"));
  //$('#saleinvoiceheader-source_id').val(customer);
  if (invoice > 0) {
    $.ajax({
      url: "index.php?r=accounting/ajax/json-get-customer",
      type: "GET",
      data: { id: invoice },
      async: true,
      success: function(getData) {
        var obj = jQuery.parseJSON(getData);
        //alert(obj.city);
        $("#saleinvoiceheader-cust_address").val(obj.address);
        $("#saleinvoiceheader-cust_address2").val(obj.address2);
        //$('#saleinvoiceheader-district').val(obj.district);
        //$('#saleinvoiceheader-city').val(obj.city);
        //$('#saleinvoiceheader-province').val(obj.province);
        $("#saleinvoiceheader-postcode").val(obj.postcode);
        getProvinceList(obj.postcode, obj.province);
        getCityDefault(obj.city, obj.province);
        getDistrictFromCity(obj.city, obj.district);
      }
    });
  }

  $("#ewSaleInvoiceModal").on("shown.bs.modal", function() {
    $(".ew-add-to-inv-line").hide();
    LoadFunction();
  });

  $('body').on('click','input[name="qty"],input[name="price"]',function(){
    $(this).focus().select();
  });
});

$("body").keydown(function(event) {
  var keyCode = event.keyCode || event.which;
  if (keyCode === 13) {
    // Enter
    event.preventDefault();
    //AjaxFormPost();
    return false;
  } else if (keyCode === 27) {
    // Esc
    event.preventDefault();
    $("#ew-add-series").modal("hide");
    $("#ewSaleInvoiceModal").modal("hide");
    $("#ew-modal-source").modal("hide");
    $("#ewGetItemModal").modal("hide");
    $("#ewPickCustomer").modal("hide");
    $("body").attr("style", "overflow:auto;");
    return false;
  }
});

$("body").on("click", 'a[id="ew-get-source"], #ew-add-new-line', function() {
  //alert('test');
  $("body").attr("style", "overflow:hidden; margin-right:0px;");
  $("#ew-modal-source").attr("style", "z-index: 2000;");
  $("#ew-modal-source").modal("show");
  var customer = $('input[id="saleinvoiceheader-cust_no_"]').val();
  if (customer === "") {
    customer = $('ew[id="customerid"]').attr("data");
  }
  var OrderId = $("#SaleOrder").attr("ew-so-id");
  var inv_no = $(".ew-inv-no").attr("ew-no");
  var data = {
    id: inv_no,
    cust: customer,
    SaleOrder: OrderId
  };
  route(
    "index.php?r=accounting/ajax/json-get-source",
    "POST",
    data,
    "ew-source-body"
  );
  $("#ew-search-cust").attr("id", "ew-search-ship");
  $("#ew-search-cust-btn").attr("id", "ew-search-ship-btn-btn");
});

$("body").on("click", ".close-modal", function() {
  $("#ew-modal-source").modal("hide");
  $("#ewSaleInvoiceModal").modal("hide");
  $("body").attr("style", "overflow:auto; margin-right:0px;");
});

$("body").on("click", ".close-inv-modal", function() {
  $("#ewSaleInvoiceModal").modal("hide");
  $("body").attr("style", "overflow:auto;");
});

$("body").on("click", ".ewSaleInvoiceModal", function() {
  $("body").attr("style", "overflow:hidden; margin-right:0px;");
  renderInvoice();  
  
});

function renderInvoice() {
  var cust = $('ew[id="customerid"]').attr("data");
  var OrderId = $("#SaleOrder").attr("ew-so-id");

  //$('.ew-render-create-invlice').load('index.php?r=accounting/saleinvoice/create&cust='+cust+'&id='+OrderId);

  $.ajax({
    url: "index.php?r=accounting/saleinvoice/create",
    type: "GET",
    data: { cust: cust, id: OrderId },
    async: false,
    success: function(getData) {
      //var obj = jQuery.parseJSON(getData);
      $(".ew-render-create-invlice").html(getData);

      setTimeout(() => {
        getSource();
      },500)
    }
  });
}

function getSource() {
  //$('#ew-modal-source').attr('style','z-index: 2000;');

  $("#ew-modal-source").modal("show");

  var customer = $('ew[id="customerid"]').attr("data");

  var OrderId = $("#SaleOrder").attr("ew-so-id");

  var inv_no = $(".ew-inv-no").attr("ew-no");

  var data = {
    id: inv_no,
    cust: customer,
    SaleOrder: OrderId
  };
  //console.log(data);
  route(
    "index.php?r=accounting/ajax/json-get-source",
    "POST",
    data,
    "ew-source-body"
  );

  $("#ew-search-cust").attr("id", "ew-search-ship");
  $("#ew-search-cust-btn").attr("id", "ew-search-ship-btn-btn");
}

function FilterShipment(search, customer) {
  var inv_no = $(".ew-inv-no").attr("ew-no");

  var data = {
    id: inv_no,
    cust: customer,
    search: search
  };

  route(
    "index.php?r=accounting/ajax/json-get-source",
    "POST",
    data,
    "ew-source-body"
  );
}

$("body").on("click", ".ew-clear-filter", function() {
  FilterShipment("", "");
});

$("body").on("change", "#ew-search-ship-btn", function() {
  FilterShipment($("#ew-search-ship").val(), "");
});

$("body").on("change", "#ew-search-ship", function() {
  FilterShipment($(this).val(), "");
  // var customer = $('input[id="saleinvoiceheader-cust_no_"]').val();

  // if(customer=='')
  // {
  //   customer = $('ew[id="customerid"]').attr('data');
  // }

  // var inv_no = $('.ew-inv-no').attr('ew-no');

  // var data = {
  //     id:inv_no,
  //     cust:customer,
  //     search:$(this).val(),
  //   };

  // route("index.php?r=accounting/ajax/json-get-source",'POST',data,'ew-source-body');
});

$("body").on("change", ".ew-checked", function() {
  // if(this.checked) {
  //     FilterShipment('',$(this).attr('cust'));
  //     $('.ew-checked').attr('checked','checked');
  //     $('.ew-checked').attr('class','ship');
  // }
});

$("body").on("click", ".ew-get-ship", function() {
  //var input = $("input[type='checkbox']").attr('data');
  //console.log(input);
  //$('.ew-render-getsource').html(input);
  //alert($('.ship:checked').serialize());
  // var data = { post:$('.ship:checked').serialize(),
  //              param:'',
  //            };

  let loading =
    '<div class="loading" style="position: absolute;z-index: 3330;left: 40%; top: 20%;"><img src="images/loader-128x/Preloader_1.gif" class="img-fluid" style="max-width: 350px;"></div>';
  

  $(this).attr('disabled',true);
  $(this).removeClass('ew-get-ship');
  $(this).removeClass('btn-default-ew');
  $(this).addClass('btn-warning');
  

  setTimeout(() => {
    $(this).addClass('ew-get-ship');
    $(this).attr('disabled',false);
  },3000)
 

  if ($(".ship:checked").serialize() != "") {
    var ship = $(".ship:checked").serialize(); // Test data

    var inv_no = $(".ew-inv-no").attr("ew-no");

    var data = {
      ship: $(".ship:checked").serializeArray(),
      id: inv_no,
      so: $("#SaleOrder").attr("ew-so-id")
    };

    $("#ew-get-source-pjax").append(loading);

    $.ajax({
      url: "index.php?r=accounting/ajax/json-post-source",
      type: "post",
      data: data,
      success: function(dataData) {
        $(".ew-render-getsource").html(dataData);

        // เมื่อเลือกรายการเสร็จแล้ว ให้ปิดตัวเอง
        // จากนั้น ทำการ update ใบ ​Invoice
        $("#ew-modal-source").modal("hide");

        // Update Invoice
        $(".loading").remove();
      }
    });
  } else {
    swal(
      "Please select one of the options.",
      "That thing is still around?",
      "warning"
    );    
    setTimeout(() => {
      $(this).removeClass('btn-warning');
      $(this).addClass('btn-default-ew');
      $(this).attr('disabled', false);
    },3000)
    return false;
  }

  
});

function renderUpdateSaleInvoice(id) {
  $.ajax({
    url: "index.php?r=accounting/saleinvoice/update",
    type: "GET",
    data: { id: id },
    async: true,
    success: function(getData) {
      $(".ew-render-create-invlice").html(getData);
    }
  });
}

$("body").on("click", 'input[type="checkbox"]', function() {
  //alert($(this).attr('cust'));
  // var cust = Number($(this).attr('cust'));
  // $('input[type=checkbox]').each(function () {
  //     if(cust === Number($(this).attr('cust')))
  //     {
  //       $(this).attr('disabled', true);
  //     }
  // });
});

$("body").on("click", ".ew-confirm-post", function() {
  //$('#ew-modal-confirm-post').modal('show');

  if(confirm("Are you sure?")){
    invPost();
  }

  // swal({
  //   title: "Are you sure? !!",
  //   text: "You won't be able to post this!",
  //   type: "warning",
  //   showCancelButton: true,
  //   cancelButtonText: "No, cancel!",
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, post!"
  // }).then(
  //   function() {
  //     invPost();
  //     //console.log(invPost());

  //     //  setTimeout(function(){

  //     //     if(invPost() == true){
  //     //       swal(
  //     //           'Posted!',
  //     //           'รายการถูกลงบัญชีแล้ว 88',
  //     //           'success'
  //     //         );

  //     //     }else {
  //     //       swal(
  //     //           'Fail!',
  //     //           'Something Wrong.',
  //     //           'warning'
  //     //         );
  //     //     }
  //     //     console.log(invPost());

  //     // }, 100);
  //     //setInterval(invPost, 1100);
  //   },
  //   function(dismiss) {
  //     // dismiss can be 'cancel', 'overlay',
  //     // 'close', and 'timer'
  //     if (dismiss === "cancel") {
  //     }
  //   }
  // );
});

function invPost() {
  var id = $('input[id="saleinvoiceheader-id"]').val();
  var url =
    "index.php?r=accounting/posted/index&RcinvheaderSearch[no_]=" +
    $(".ew-inv-no").attr("ew-no_");
  $.ajax({
    url: "index.php?r=accounting/ajax/ajax-post",
    type: "POST",
    data: { id: id },
    dataType: 'JSON',
    error: function(e) {
      swal(
        "Fail!",
        "Something Wrong. "+ e.responseText + new Date().toTimeString().slice(0, 8),
        "error"
      );
      return false;
    },
    success: function(res) {
      //$(".Navi-Title").html(getData);
      //console.log(res);

      if (res.status === 200) {
        swal(
          "Posted!",
          "รายการถูกลงบัญชีแล้ว " + new Date().toTimeString().slice(0, 8),
          "success"
        );
        setTimeout(function() {
          window.location.href =
            "index.php?r=accounting/posted/posted-invoice&id=" + res.id;
        }, 1000);
      }else if (res.status === 403) {
        swal(
          "Fail!",
          'Please check document No. <a href="' +
            url +
            '" target="_blank">' +
            $(".ew-inv-no").attr("ew-no_") +
            "</a>" ,
          "warning"
        );
      } else  {
        swal(
          "Fail!",
          res.message,
          "error"
        );
        
      }
    }
  });
}

//---- Change Document No.-----
$("body").on("click", ".ew-inv-re-no", function() {
  var data = $("div.ew-inv-no").attr("ew-no_");
  var input =
    '<div class="col-sm-2" style="position:absolute; right:0px;">' +
    '<div class="ew-type input-group"><input type="text" class="form-control ew-inv-inputno" value="' +
    data +
    '" id="ew-edit-no-text">' +
    '<span class="input-group-addon ew-cancel-edit-no" style="cursor:pointer;" title="Cancel" alt="Cancel">X</span>' +
    "</div>" +
    "</div>";

  $("div.ew-inv-no").html(input);

  $("div.ew-inv-no").attr("class", "ew-inv-change");
});

$("body").on("change", ".ew-inv-change, .ew-cancel-edit-no", function() {
  var Dold = $(this).attr("ew-no_");
  var Dnew = $("input.ew-inv-inputno").val();

  if (confirm('Do you want to change "' + Dold + " to " + Dnew + '" ?')) {
    var id = $('input[id="saleinvoiceheader-id"]').val();

    $(this).attr("ew-no_", $("input.ew-inv-inputno").val());

    $.ajax({
      url: "index.php?r=accounting/ajax/ajax-change-invno",
      type: "POST",
      data: { id: id, val: Dnew, old: Dold },
      async: true,
      success: function(getData) {
        if (getData != Dold) {
          var data = "<h4>" + getData + "<h4>";
          $(".ew-inv-change")
            .html(data)
            .attr("class", "ew-inv-no");
          $(".Navi-Title").html(data);
        } else {
          swal(
            "Already exists.",
            "Please try again." +
              '<a href="index.php?r=accounting/posted/index" target="_blank" id="ew-show-posted"><i class="fa fa-link" aria-hidden="true"></i> Detail</a>',
            "error"
          );

          var data = "<h4>" + Dold + "<h4>";
          $(".ew-inv-change")
            .html(data)
            .attr("ew-no_", getData)
            .attr("class", "ew-inv-no");
        }
      }
    });
  }

  var data = "<h4>" + $(".ew-inv-change").attr("ew-no_") + "<h4>";
  $(".ew-inv-change")
    .html(data)
    .attr("class", "ew-inv-no");

  return false;
});

$("body").on("click", ".ew-cancel-edit-no", function() {
  var data = "<h4>" + $(".ew-inv-change").attr("ew-no_") + "<h4>";
  $(".ew-inv-change")
    .html(data)
    .attr("class", "ew-inv-no");

  return false;
});
//---- /. Change Document No.-----

$("#saleinvoiceheader-postcode").on("keyup keypress", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    findAutoPostCode($(this).val());
    return false;
  }
});

function findAutoPostCode(postcode) {
  //$('#saleinvoiceheader-district').val('');

  var postcode = postcode;
  //route('index.php?r=ajax/postcode-validate&postcode='+$(this).val(),'GET',{postcode:$(this).val()},'loading');
  $.ajax({
    url: "index.php?r=ajax/postcode-validate&postcode=" + postcode,
    type: "GET",
    data: { postcode: postcode },
    async: true,
    success: function(getData) {
      if (Number(getData) >= 1) {
        getProvince(postcode);
        getCity(postcode);
        getDistrict(postcode);
        //getDistrictFromCity($('#saleinvoiceheader-city').val());
      } else {
        swal(
          "No zip code of your choice.",
          "Please re-enter your zip code.",
          "warning"
        );
      }
    }
  });
}

$("body").on("change", "#saleinvoiceheader-postcode", function() {
  //findAutoPostCode($(this).val());
  // var postcode = $(this).val();
  // //route('index.php?r=ajax/postcode-validate&postcode='+$(this).val(),'GET',{postcode:$(this).val()},'loading');
  // $.ajax({
  //           url:"index.php?r=ajax/postcode-validate&postcode="+$(this).val(),
  //           type: "GET",
  //           data: {postcode:$(this).val()},
  //           async:false,
  //           success:function(getData){
  //             if(Number(getData) >= 1)
  //             {
  //                       getProvince(postcode);
  //                       getCity(postcode);
  //                       getDistrict(postcode);
  //             }else {
  //               swal(
  //                   'No zip code of your choice.'),
  //                   'That thing is still around?'),
  //                   'warning'
  //                 );
  //             }
  //            }
  //       });
});

$("body").on("change", "#saleinvoiceheader-city", function() {
  //route('index.php?r=ajax/get-amphur','GET',{data:1},'');

  getDistrictFromCity($(this).val());
});

$("body").on("change", "#saleinvoiceheader-province", function() {
  //route('index.php?r=ajax/get-amphur','GET',{data:1},'');

  // Clear Postcode;
  $("#saleinvoiceheader-postcode").hide();
  //getPostcodeFromDisrtict($(this).val());

  getCityFromProvince($(this).val());
});
$("body").on("change", "#saleinvoiceheader-district", function() {
  //route('index.php?r=ajax/get-amphur','GET',{data:1},'');

  $("#saleinvoiceheader-postcode").show();
  getPostcodeFromDisrtict($(this).val());
});
function getCityFromProvince(province) {
  $.ajax({
    url: "index.php?r=ajax/city-from-province&province=" + province,
    type: "POST",
    data: { province: province },
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);

      $("#saleinvoiceheader-city").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-city").append(
          $("<option></option>")
            .val(value.val)
            .html(value.text)
            .attr("selected", value.selected)
        );
      });
    }
  });
}
function getPostcodeFromDisrtict(discrict) {
  $.ajax({
    url: "index.php?r=ajax/postcode-from-discrict&discrict=" + discrict,
    type: "POST",
    data: { discrict: discrict },
    success: function(getData) {
      $("#saleinvoiceheader-postcode").val(getData);
    }
  });
}

function getDistrictFromCity(city, district) {
  $.ajax({
    url:
      "index.php?r=ajax/get-district-city&district=" +
      district +
      "&city=" +
      city,
    type: "GET",
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);
      $("#saleinvoiceheader-district").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-district").append(
          $("<option></option>")
            .val(value.val)
            .html(value.text)
            .attr("selected", value.selected)
        );
      });
    }
  });
}

function getDistrict(postcode) {
  $.ajax({
    url: "index.php?r=ajax/get-tumbol&postcode=" + postcode,
    type: "POST",
    data: { postcode: postcode },
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);
      $("#saleinvoiceheader-district").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-district").append(
          $("<option></option>")
            .val(value.val)
            .html(value.text)
        );
      });
    }
  });
}

function getCityDefault(city, province) {
  $.ajax({
    url: "index.php?r=ajax/get-city-default",
    type: "GET",
    data: {
      postcode: $("#saleinvoiceheader-postcode").val(),
      city: city,
      province: province
    },
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);
      $("#saleinvoiceheader-city").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-city").append(
          $("<option></option>")
            .val(value.val)
            .html(value.text)
            .attr("selected", value.selected)
        );
        $("#saleinvoiceheader-city select").val(city);
      });
    }
  });
}

function getCity(postcode) {
  $.ajax({
    url: "index.php?r=ajax/get-city&postcode=" + postcode,
    type: "POST",
    data: { postcode: postcode },
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);

      $("#saleinvoiceheader-city").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-city").append(
          $("<option ></option>")
            .val(value.val)
            .html(value.text)
        );
      });
    }
  });
}

function getProvinceList(postcode, province) {
  $.ajax({
    url: "index.php?r=ajax/get-province-list",
    type: "GET",
    data: { postcode: postcode, province: province },
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);

      $("#saleinvoiceheader-province").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-province").append(
          $("<option ></option>")
            .val(value.val)
            .html(value.text)
            .attr("selected", value.selected)
        );
        $('option[value="maxlength"]').remove();
      });
    }
  });
}

function getProvince(postcode) {
  $.ajax({
    url: "index.php?r=ajax/get-province&postcode=" + postcode,
    type: "GET",
    data: { postcode: postcode },
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);
      $("#saleinvoiceheader-province").html("");
      $.each(obj, function(key, value) {
        $("#saleinvoiceheader-province").append(
          $("<option ></option>")
            .val(value.val)
            .html(value.text)
            .attr("selected", value.selected)
        );
        $('option[value="maxlength"]').remove();
      });
    }
  });
}

$("#saleinvoiceheader-postcode").on("keyup keypress", function(e) {
  //getProvince($('#saleinvoiceheader-postcode').val());
  //getCity($('#saleinvoiceheader-postcode').val());
  //getDistrict($('#saleinvoiceheader-postcode').val());
});

//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################

$("#form-sale-invoice").on("keyup keypress", function(e) {
  // Disable form submit on enter.
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    return false;
  }
});

$("body").on("click", ".btn-info-ew", function() {
  //$('form').submit();
});

$("body").on("click", ".add-series-close-modal", function() {
  $("#ew-add-series").modal("hide");
});

function CheckNumberSeries(id, code) {
  $.ajax({
    url: "index.php?r=series/ajax-find-noseries",
    type: "GET",
    data: { id: id, code: code },
    async: true,
    dataType: "JSON",
    success: function(response) {
      if (response.status == 201) {
        $("#RunNoSeries").modal("toggle");
        $(".data-body").html(response.html);
        $(".modal-title").html("No Series ++");
      }
    }
  });
}

function AjaxFormPost() {
  var cond = $("ew.ew-condition").attr("ew-cond");
  var formClass = $(".modal button[type=submit]")
    .closest("form")
    .attr("class");
  var formpost = $("form." + formClass + "").serializeArray();
  var appdata = {
    form: formpost,
    name: $("#numberseries-name").val(),
    desc: $("#numberseries-description").val(),
    char: $("#numberseries-starting_char").val(),
    table: "vat_type",
    field: "vat_value",
    cond: cond
  };
  $.ajax({
    url: "index.php?r=series/create-ajax",
    type: "POST",
    data: appdata,
    async: true,
    success: function(getData) {
      $(".ew-series-body").html(getData);
    }
  });
}

$("body").on("click", ".ew-save-modal-common", function() {
  AjaxFormPost();
});

function LoadSeries() {
  var cond = $("ew.ew-condition").attr("ew-cond");
  var data = {
    series: {
      form: "Invoice",
      value: cond
    },
    table: {
      id: "1",
      name: "vat_type",
      field: "vat_value",
      cond: cond
    }
  };
  route("index.php?r=series/create", "GET", data, "ew-series-body");
  $("#numberseries-name").val("SaleInvoice");
  $("#numberseries-name").attr("disabled", "disabled");
  $("button[type=submit]").hide();
}

$("body").on("click", "#modal-back", function() {
  LoadSeries();
});

//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################

$("body").on("click", "#ew-modal-pick-cust", function() {
  $("#ewPickCustomer").modal("show");
  route(
    "index.php?r=customers/customer/pick-customer",
    "GET",
    { search: "", id: $("#SaleOrder").attr("ew-so-id") },
    "ew-Render-Pick-Inv-Customer"
  );
});

$("body").on("click", "#ew-pick-customer", function() {
  if (confirm("ยืนยันการเลือกลูกค้า ! ")) {
    var customer = Number($(this).attr("ew-val"));
    $.ajax({
      url: "index.php?r=customers/ajax/json-get-customer",
      type: "GET",
      data: { id: customer },
      async: true,
      success: function(getData) {
        var obj = jQuery.parseJSON(getData);
        //console.log(getData);
        $("#saleinvoiceheader-cust_no_").val(customer);
        $("#saleinvoiceheader-cust_code")
          .val(obj.code)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-cust_name_")
          .val(obj.name)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-cust_address")
          .val(obj.address)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-cust_address2")
          .val(obj.address2)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-taxid")
          .val(obj.vatregis)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-branch")
          .val(obj.branch)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-contact")
          .val(obj.contact)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-phone")
          .val(obj.phone)
          .attr("placeholder", " ");
        $("#saleinvoiceheader-payment_term").val(obj.payment_term);
        $("#saleinvoiceheader-postcode")
          .val(obj.postcode)
          .attr("placeholder", " ");
        //$('#saleinvoiceheader-sales_people').val(obj.owner_sales);
        getProvinceList(obj.postcode, obj.province_code);
        getCityDefault(obj.city_code, obj.province_code);
        getDistrictFromCity(obj.city_code, obj.district_code);
      }
    });
    $("#ewPickCustomer").modal("hide");
  }
});

//------ Select Customer ---------
$("body").on("change", "#ew-search-cust-text", function() {
  route(
    "index.php?r=customers/customer/pick-customer",
    "GET",
    { search: $(this).val(), id: $("#SaleOrder").attr("ew-so-id") },
    "ew-Render-Pick-Inv-Customer"
  );
});

$("body").on("click", "#ew-search-cust-btn", function() {
  route(
    "index.php?r=customers/customer/pick-customer",
    "GET",
    {
      search: $("#ew-search-cust-text").val(),
      id: $("#SaleOrder").attr("ew-so-id")
    },
    "ew-Render-Pick-Inv-Customer"
  );
  //$('a[id="ew-pick-customer"]').attr('id','ew-pick-inv-customer');
});

$("body").on("click", ".ew-inv-close-pic-cus", function() {
  $("#ewPickCustomer").modal("hide");
});

$("body").on("keyup", "input#ew-search-cust-text", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    route(
      "index.php?r=customers/customer/pick-customer",
      "GET",
      {
        search: $("#ew-search-cust-text").val(),
        id: $("#SaleOrder").attr("ew-so-id")
      },
      "ew-Render-Pick-Inv-Customer"
    );
  }
});
//------/. Select Customer -------

//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################
//##################################################

$("body").on("keyup keypress", "#ew-direct-price,#ew-inv-price", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    createSaleInvoiceLine();
  }
});

function LoadFunction() {
  $("tr").each(function(i, el) {
    $(el)
      .children("td")
      .find("#ew-inv-qty")
      .fadeOut();
    $(el)
      .children("td")
      .find("#ew-inv-price")
      .fadeOut();
  });
}

$("body").on("click", ".ew-pick-item-modal", function() {
  $("#ewGetItemModal").modal("show");
  $(".ew-Pick-Inv-Item").empty();
  var $data = { search: "", id: $(".ew-inv-no").attr("ew-no") };
  route(
    "items/ajax/ajax-pick-items",
    "GET",
    { search: "", id: $(".ew-inv-no").attr("ew-no") },
    "ew-Pick-Inv-Item"
  );
});

$("body").on("click", "tr", function() {
  var iCheck = $(this)
    .children("td")
    .find("input.ew-checked");
  if (iCheck.is(":checked")) {
    $(this)
      .children("td")
      .find("#ew-inv-qty")
      .fadeIn(600);
    $(this)
      .children("td")
      .find("#ew-inv-price")
      .fadeIn(600);
  } else {
    $(this)
      .children("td")
      .find("#ew-inv-qty")
      .fadeOut(400);
    $(this)
      .children("td")
      .find("#ew-inv-price")
      .fadeOut(400);
  }
});

$("body").on("click", ".pick-item", function() {
  liveCreate(
    {
      item: $(this).attr("data-no"),
      desc: $(this).attr("data-desc"),
      qty: 1,
      price: $(this).attr("data-price"),
      id: $(".ew-inv-no").attr("ew-no"),
      no: $(".ew-inv-no").attr("ew-no_"),
      type: $('select[name="InsertType"]').val(),
      pdis: $("#saleinvoiceheader-percent_discount").val(),
      ldis: 0
    },
    $(".Xtest")
  );
});

 

function createSaleInvoiceLine() {
  if ($(".items:checked").serialize() != "") {
    var inv_no = $(".ew-inv-no").attr("ew-no");
    var data = { items: $(".items:checked").serializeArray(), id: inv_no };
    $("tr").each(function(i, el) {
      var iCheck = $(el)
        .children("td")
        .find("input.ew-checked");
      var item = $(el)
        .children("td")
        .find("input.ew-checked")
        .val();
      var qty = $(el)
        .children("td")
        .find("#ew-inv-qty")
        .val();
      var price = $(el)
        .children("td")
        .find("#ew-inv-price")
        .val();
      if (iCheck.is(":checked")) {
        liveCreate(
          {
            item: item,
            qty: qty,
            price: price,
            id: $(".ew-inv-no").attr("ew-no"),
            no: $(".ew-inv-no").attr("ew-no_"),
            pdis: $("#saleinvoiceheader-percent_discount").val(),
            ldis: 0
          },
          $(el)
            .children("td")
            .children("div")
            .children("div")
        );
      }
    });
    $("#ewGetItemModal").modal("hide");
  } else {
    swal(
      "Please select one of the options.",
      "That thing is still around?",
      "warning"
    );
    return false;
  }
}

$("body").on("click", ".ew-pick-item-to-inv-line", function() {
  createSaleInvoiceLine();
});

$("body").on("click", 'input[name="ew-InsertAdd"]', function(e) {
  liveCreate(
    {
      item: $(".ew-InsertDesc").attr("ew-item-code"),
      desc: $(".ew-InsertDesc").val(),
      qty: $(".ew-direct-qty").val(),
      price: $(".ew-direct-price").val(),
      id: $(".ew-inv-no").attr("ew-no"),
      no: $(".ew-inv-no").attr("ew-no_"),
      type: $('select[name="InsertType"]').val(),
      code: $("input.ew-InsertItems").val(),
      pdis: $("#saleinvoiceheader-percent_discount").val(),
      ldis: $('input[class="ew-line-discount"]').val()
    },
    $(".Xtest")
  );
});

$("body").on("keydown", ".ew-direct-price,.ew-direct-qty", function(e) {
  if (e.which == 13) {
    liveCreate(
      {
        item: $(".ew-InsertDesc").attr("ew-item-code"),
        desc: $(".ew-InsertDesc").val(),
        qty: $(".ew-direct-qty").val(),
        price: $(".ew-direct-price").val(),
        id: $(".ew-inv-no").attr("ew-no"),
        no: $(".ew-inv-no").attr("ew-no_"),
        type: $('select[name="InsertType"]').val(),
        code: $("input.ew-InsertItems").val(),
        pdis: $("#saleinvoiceheader-percent_discount").val(),
        ldis: $('input[class="ew-line-discount"]').val()
      },
      $(".Xtest")
    );
  }
});

$("body").on("keydown", "input.ew-InsertDesc", function(e) {
  $(".ew-add-to-inv-line").show();
  $("input.ew-direct-qty").val(1);
  $("input.ew-direct-price").val(0);
  if (e.which === 32 || e.which === 13) {
    // 32 Space bar
    console.log($(this).val());
  }
});

$("body").on("keydown", ".ew-InsertItems", function(e) {
  var len = $.trim($(this).val()).length;
  if (len >= 3) {

    if (e.which === 32 || e.which === 13) {
      // 32 Space bar
      //findItemTable($(this));
      findItemTableJson($(this),(res) => {
        if (res.length === 0){
          if(e.which === 13){
            if (confirm("Do you want to add \"" + $('.ew-InsertItems').val() + "\" ?")) {
              liveCreate(
                {
                  item: '1^x',
                  desc: lang('common','Text'),
                  qty: 1,
                  price: 0,
                  id: $("form#form-sale-invoice").attr("data-key"),
                  no: $(".ew-inv-no").attr("ew-no_"),
                  type: $('#InsertType').val(),
                  code:$('.ew-InsertItems').val(),
                  pdis: $("#saleinvoiceheader-percent_discount").val(),
                  ldis: $('input[class="ew-line-discount"]').val()
                },
                $(".Xtest")
              );
            }
             
          }
        }else{

          
            if (res[0].id===1414){
              //add
              
              liveCreate(
                {
                  item: res[0].no,
                  desc: res[0].desc_th,
                  qty: 1,
                  price: res[0].price,
                  id: $("form#form-sale-invoice").attr("data-key"),
                  no: $(".ew-inv-no").attr("ew-no_"),
                  type: $('#InsertType').val(),
                  code: res[0].no,
                  pdis: $("#saleinvoiceheader-percent_discount").val(),
                  ldis: $('input[class="ew-line-discount"]').val()
                },
                $(".Xtest")
              );
            }else{
              //add
              
              liveCreate(
                {
                  item: res[0].no,
                  desc: res[0].desc_th,
                  qty: 1,
                  price: res[0].price,
                  id: $("form#form-sale-invoice").attr("data-key"),
                  no: $(".ew-inv-no").attr("ew-no_"),
                  type: $('#InsertType').val(),
                  code: res[0].item,
                  pdis: $("#saleinvoiceheader-percent_discount").val(),
                  ldis: $('input[class="ew-line-discount"]').val()
                },
                $(".Xtest")
              );
              

            }
          

        }


      });
    }
    
    $("div.search-items-popup").slideDown();
    if (e.which == 9) {
      if ($(".ew-InsertDesc").attr("ew-item-code") != "eWinl") {
        // $(".ew-InsertDesc")
        //   .first()
        //   .focus();
      }
      var inputItem = $.trim($(this).val());
      $(this).val(inputItem);
      $.ajax({
        url: "index.php?r=accounting/ajax/json-find-item",
        type: "POST",
        data: { param: { item: inputItem } },
        async: true,
        success: function(getData) {
          var obj = jQuery.parseJSON(getData);
          $(".ew-desc").show();
          $(".ew-InsertDesc").val(obj.desc);
          $(".ew-InsertDesc").attr("ew-item-code", obj.item);
          $(".ew-direct-qty")
            .show()
            .val(1);
          $(".ew-direct-price")
            .show()
            .val(obj.std);
          if (obj.code != "eWinl") {
            $(".ew-add-to-inv-line").show();
          } else {
            $(".ew-add-to-inv-line").hide();
          }
        }
      });
    }
  } else {
    $(".find-item").slideUp();
    $(".find-item-render").html(
      '<i class="fa fa-spinner fa-pulse fa-3x fa-fw text-info"></i>'
    );
  }
});

function liveCreate($data, element) {
  $.ajax({
    url: "index.php?r=accounting/ajax/json-create-item-line",
    type: "post",
    data: $data,
    success: function(getData) {
      // ##-- ถ้ามี Empty ให้ลบ tr นี้ออกก่อน --
      $("#Sale_Invoice_Line div.empty")
        .parent("td")
        .parent("tr")
        .remove();
      var obj = jQuery.parseJSON(getData);
      $("#saleinvoiceheader-discount").val(obj.data.discount);
      // ##-- หาจำนวนแถวถัดไป --
      var CountNumber = Number($("#Sale_Invoice_Line tr").length); // แถวทั้งหมด (รวม header ,footer)
      CountNumber = CountNumber - 1; // ลบจำนวนแถวออก 1 แถว จะได้ค่าที่ต้องการ
      // ##-- /.หาจำนวนแถวถัดไป--
      // ##-- สร้างบรรทัดใหม่ --

      var $row = $(
        '<tr data-key="' + obj.id + '">\r\n' +
        " <td>" + CountNumber + "</td>\r\n" +
        " <td class='" + ((obj.itemid=='1414')? 'text-orange' : ' ') + "'>" + ((obj.item=='1^x')? ' ' : obj.item)+ "</td>\r\n" +
        ' <td><input type="text" class="form-control text-line next" value="' + obj.desc + '" name="desc"></td>\r\n' +
        ' <td align="right"><input type="text" class="form-control text-right text-line next" value="' + Number(obj.qty) + '" name="qty"></td>\r\n' +
        ' <td align="right"><input type="text" class="form-control text-right text-line next" value="' + Number(obj.price) + '" name="price"></td>\r\n' +
        ' <td align="right"><input type="text" class="form-control text-right text-line next" value="' + Number(obj.discount) + '" name="line_discount"></td>\r\n' +
        ' <td align="right"><div class="ew-line-total" data="' + obj.qty * obj.price + '">' + number_format((obj.qty * obj.price).toFixed(2)) + "</div></td>\r\n" +
        ' <td align="right"><div class="btn btn-danger ew-delete-inv-line" data="' + obj.id + '"><i class="fa fa-trash-o" aria-hidden="true"></i></div></td>\r\n' +
        "</tr>\r\n"
      );
      $("#Sale_Invoice_Line tbody:last").append($row);
       
      if (obj.itemid=='1414'){
        $('input[name="desc"]').focus().select();
      }else{
        $('input[name="qty"]').focus().select();
      }
      
      // ##-- /.สร้างบรรทัดใหม่ --
      // ##-- Refresh ข้อมูลตารางสรุป --
      liveRenderInvLine();
      clearText();
    }
  });
}
///////////////////////////\/Update Line//////////////////////////////

$("body").on("change", "input.text-line, .measure-change", function() {
  var $doc = $('form[id="form-sale-invoice"]').attr("data-key");
  var $data = {
    name: $(this).attr("name"),
    key: $(this)
      .parent("td")
      .parent("tr")
      .attr("data-key"),
    val: $(this).val()
  };
  var index = $('input.next').index(this) + 1;
  $.ajax({
    url: "index.php?r=accounting/saleinvoice/sale-invoice-line&id=" + $doc,
    type: "POST",
    data: $data,
    dataType: 'JSON',
    success: function(response) {
      $(".sale-invlice-line-render").html(response.html);
      $("#saleinvoiceheader-discount").val(response.data.discount);
      liveRenderInvLine();
      if($('input.next').length==index){
        $('input.next').eq(0).focus().select();
      }else{
        $('input.next').eq(index).focus().select();
      }
    }
  });
});

$("body").on("keydown", "input.text-line", function(e) {
  if (e.which == 13) {
    var $doc = $('form[id="form-sale-invoice"]').attr("data-key");
    var $data = {
      name: $(this).attr("name"),
      key: $(this)
        .closest("tr")
        .attr("data-key"),
      val: $(this).val()
    };
    var index = $('input.next').index(this) + 1;
    $.ajax({
      url: "index.php?r=accounting/saleinvoice/sale-invoice-line&id=" + $doc,
      type: "POST",
      data: $data,
      dataType:'JSON',
      success: function(response) {

        $(".sale-invlice-line-render").html(response.html);
        liveRenderInvLine();

        if($('input.next').length==index){
          $('input.next').eq(0).focus().select();
        }else{
          $('input.next').eq(index).focus().select();
        }
      }
    });

    // $(this)
    //   .closest("tr")
    //   .find('input[name="' + $(this).attr("name") + '"]')
    //   .focus();
  }
});

//////////////////////////// /\.Update Line//////////////////////////////

function liveRenderInvLine() {
  SumTotalTable(
    $("#ew-invline-total"),
    $("#saleinvoiceheader-discount"),
    $("#ew-after-discount"),
    $("#ew-before-vat"),
    $("#ew-after-vat"),
    $("#ew-total"),
    $("#saleinvoiceheader-vat_percent"),
    $("#saleinvoiceheader-include_vat")
  );
  loadFindBox(".sale-invlice-line-render");
}

//------ Select Item ---------
$("body").on("click", "#ew-search-items-btn", function() {
  var $data = {
    search: $("#ew-search-items-text").val(),
    id: $(".ew-inv-no").attr("ew-no")
  };
  $(".ew-Pick-Inv-Item").empty();
  route("items/ajax/ajax-pick-items", "GET", $data, "ew-Pick-Inv-Item");
  LoadFunction();
});

$("body").on("click", ".ew-inv-close-pic-item", function() {
  $("#ewGetItemModal").modal("hide");
});

$("body").on("keydown", "#ew-search-items-text", function(e) {
  if (e.which == 9 || e.which == 13) {
    var $data = {
      search: $("#ew-search-items-text").val(),
      id: $(".ew-inv-no").attr("ew-no")
    };
    $(".ew-Pick-Inv-Item").empty();
    route("items/ajax/ajax-pick-items", "GET", $data, "ew-Pick-Inv-Item");
    LoadFunction();
  }
});
//------/. Select Item -------

$("body").on("click", ".ew-delete-inv-line", function() {
  if (confirm("Do you want to delete  ?")) {
    var data = {
      data: $(this).attr("data"),
      inv: Number($("div.ew-inv-no").attr("ew-no")),
      pdis: $("#saleinvoiceheader-percent_discount").val(),
      dis: $("#saleinvoiceheader-discount").val()
    };
    var tr = $(this).closest("tr");
    tr.css("background-color", "#aaf7ff");
    tr.fadeOut(500, function() {
      tr.remove();
      $.ajax({
        url: "index.php?r=accounting/ajax/delete-inv-line&id=" + data.inv,
        type: "POST",
        data: data,
        dataType: "JSON",
        success: function(response) {
          $("#saleinvoiceheader-discount").val(response.data.discount);
        }
      });
      SumTotalTable(
        $("#ew-invline-total"),
        $("#saleinvoiceheader-discount"),
        $("#ew-after-discount"),
        $("#ew-before-vat"),
        $("#ew-after-vat"),
        $("#ew-total"),
        $("#saleinvoiceheader-vat_percent"),
        $("#saleinvoiceheader-include_vat")
      );
    });
  }
  return false;
});

function SumTotalTable(
  $sumtotal,
  $discount,
  $afterdiscount,
  $beforevat,
  $aftervat,
  $grandtotal,
  $percentvat,
  $vattype
) {
  /*----- Sum Section -----   */
  var sum = 0;
  jQuery(".ew-line-total").each(function() {
    sum += parseFloat(jQuery(this).attr("data"));
  });
  var $BeforeDisc = sum;
  var $Discount =
    $BeforeDisc * ($("#saleinvoiceheader-percent_discount").val() / 100);
  // หักส่วนลด (ก่อน vat)
  var $subtotal = $BeforeDisc - $Discount;
  var $vat = Number($percentvat.val());
  if ($vattype.val() == 1) {
    // Vat นอก
    var $InCVat = ($subtotal * $vat) / 100;
    var $beforeVat = 0;
    var $total = $InCVat + $subtotal;
    $beforevat.parent("tr").css("background-color", "#aaf7ff");
    $beforevat.parent("tr").fadeOut(500);
  } else {
    // Vat ใน
    // 1.07 = 7%
    var $vat_revert = $vat / 100 + 1;
    var $InCVat = $subtotal - $subtotal / $vat_revert;
    var $beforeVat = $subtotal - $InCVat;
    var $total = $subtotal;
    $beforevat.parent("tr").css("background-color", "#FFF");
    $beforevat.parent("tr").fadeIn(500);
  }

  $sumtotal.text(number_format($BeforeDisc.toFixed(2))).fadeIn();
  $sumtotal.attr("data", $BeforeDisc);
  //$discount.val($Discount).fadeIn();
  $afterdiscount.text(number_format($subtotal.toFixed(2))).fadeIn();
  $beforevat.text(number_format($beforeVat.toFixed(2))).fadeIn();
  $aftervat.text(number_format($InCVat.toFixed(2))).fadeIn();
  $grandtotal.text(number_format($total.toFixed(2))).fadeIn();
  /*----- /.Sum Section ----- */
}

//---- Vat type Event Change -----
$("body").on(
  "change",
  'input[id="saleinvoiceheader-percent_discount"]',
  function() {
    var percent_disc = $(this).val();
    var subtotal = Number($("#ew-invline-total").attr("data"));
    var discount = (subtotal * percent_disc) / 100;
    $.ajax({
      url:
        "index.php?r=accounting/saleinvoice/update&id=" +
        $('form[id="form-sale-invoice"]').attr("data-key"),
      data: { percentDiscount: percent_disc },
      dataType: "json",
      type: "POST",
      success: function(response) {
        $('input[id="saleinvoiceheader-discount"]').val(response.data.discount);
      }
    });
    SumTotalTable(
      $("#ew-invline-total"),
      $("#saleinvoiceheader-discount"),
      $("#ew-after-discount"),
      $("#ew-before-vat"),
      $("#ew-after-vat"),
      $("#ew-total"),
      $("#saleinvoiceheader-vat_percent"),
      $("#saleinvoiceheader-include_vat")
    );
  }
);

$("body").on("change", 'input[id="saleinvoiceheader-discount"]', function() {
  var discount = $(this).val(); // Baht
  var subtotal = Number($("#ew-invline-total").attr("data"));
  var percent_disc = (discount / subtotal) * 100;
  $.ajax({
    url:
      "index.php?r=accounting/saleinvoice/update&id=" +
      $('form[id="form-sale-invoice"]').attr("data-key"),
    data: { discount: discount },
    dataType: "json",
    type: "POST",
    success: function(response) {
      $('input[id="saleinvoiceheader-percent_discount"]').val(
        response.data.percent_discount
      );
    }
  });
  SumTotalTable(
    $("#ew-invline-total"),
    $("#saleinvoiceheader-discount"),
    $("#ew-after-discount"),
    $("#ew-before-vat"),
    $("#ew-after-vat"),
    $("#ew-total"),
    $("#saleinvoiceheader-vat_percent"),
    $("#saleinvoiceheader-include_vat")
  );
});

$("body").on("change", "#saleinvoiceheader-vat_percent", function() {
  var thiscond = $(this).val();
  CommonValidateSeries({
    name: "SaleInvoice",
    desc: "ใบกำกับภาษี/ใบแจ้งหนี้ V",
    char: "IV",
    table: "vat_type",
    field: "vat_value",
    cond: thiscond,
    sep: "YYMM-",
    gen: "0000",
    type: "12M",
    efect: "#saleinvoiceheader-no_"
  });
  vatEvent($(this));
  SumTotalTable(
    $("#ew-invline-total"),
    $("#saleinvoiceheader-discount"),
    $("#ew-after-discount"),
    $("#ew-before-vat"),
    $("#ew-after-vat"),
    $("#ew-total"),
    $(this),
    $("#saleinvoiceheader-include_vat")
  );
});

$("body").on("change", "#saleinvoiceheader-include_vat", function() {
  SumTotalTable(
    $("#ew-invline-total"),
    $("#saleinvoiceheader-discount"),
    $("#ew-after-discount"),
    $("#ew-before-vat"),
    $("#ew-after-vat"),
    $("#ew-total"),
    $("#saleinvoiceheader-vat_percent"),
    $(this)
  );
});

function vatEvent(e) {
  if (e.val() > 0) {
    $("#saleinvoiceheader-include_vat").fadeIn("in");
  } else {
    $("#saleinvoiceheader-include_vat").fadeOut();
    $("#saleinvoiceheader-include_vat").val(1);
  }
  $("#ew-text-percent-vat").text(e.val());
}
//---- /.Vat type Event Change -----

function clearText() {
  $("input.ew-InsertDesc")
    .val("")
    .attr("ew-item-code", "eWinl");
  $("input.ew-InsertItems").val("");
  $("input.ew-direct-qty").val("");
  $("input.ew-direct-price").val("");
  $(".ew-add-to-inv-line").hide();
}
