/*!
* EWIN
* v3.06.20 - 2018
* (c) Assawin.Thkch; MIT License
*/
$(document).ready(function() {
  $("body").on("click", ".add-series-close-modal", function() {
    $("#ew-add-series").modal("hide");
  });
  // Modal load
  $("#ew-add-series").on("shown.bs.modal", function() {
    var formIDmodal = $(".modal button[type=submit]")
      .closest("form")
      .attr("class");
    // $('.ew-save-modal-common').attr('onclick','$(\'#'+ formIDmodal +'\').submit()');
    $("button[type=submit]").hide();
    $("#numberseries-name").val($(formid).attr("modules"));
    $("#numberseries-name")
      .attr("readonly", "readonly")
      .attr("ew-data-type", $(form + "typeofdocument").val());
  });

  $("body").keydown(function(event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      // Enter
      // event.preventDefault();
      // return false;
    } else if (keyCode === 27) {
      // Esc
      //event.preventDefault();
      $("#ew-add-series").modal("hide");
      $("#ewSaleInvoiceModal").modal("hide");
      $("#ew-modal-source").modal("hide");
      $("#ewGetItemModal").modal("hide");
      $("#ewPickCustomer").modal("hide");
      return false;
    }
  });
});

$(document).click(function(e) {
  // check that your clicked
  // element has no id=info
  //alert($(e.target).closest('ew').attr('class'));
  if (
    $(e.target)
      .closest("div")
      .attr("class") != "pick-seires-render"
  ) {
    $(".pick-seires").fadeOut("fast");
  }
});

function ValidateSeries($form, $id, $name, $field, $cond, $textField, $dash) {
  var thiscond = $cond;
  var data = {
    series: {
      form: $form,
      value: thiscond
    },
    table: {
      id: $id,
      table: $name,
      field: $field,
      cond: $cond
    }
  };
  $.ajax({
    url: "index.php?r=setupnos/ajax-find-series",
    type: "POST",
    data: data,
    async: false,
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);
      if (obj.id) {
        // มี Number Series แล้ว
        // ตรวจสอบการรันหมายเลข (มีการรันแล้วหรือยัง)
        CheckRuningNumberSeries(obj.id, obj.code, $textField, $dash);
      } else {
        //-----ปรับเป็นสร้างอัตโนมัติ----2018-03-19
        var appdata = {
          form: $form,
          name: "Adjust",
          desc: $name,
          char: "AJ",
          table: "item_journal",
          field: $field,
          cond: $cond,
          sep: "-",
          gen: "0000",
          type: "ONCE"
        };
        $.ajax({
          url: "index.php?r=series/create-ajax",
          type: "POST",
          data: appdata,
          async: false,
          success: function(response) {
            var objs = jQuery.parseJSON(response);
            $.ajax({
              url: "index.php?r=series/ajax_autogenseries",
              type: "GET",
              data: {
                code: 01,
                char: "0000",
                digit: "0000",
                NoSeries: objs.id
              },
              async: false,
              success: function(returndata) {
                CheckRuningNumberSeries(objs.id, objs.code, $textField, $dash);
              }
            });
          }
        });
        //----- /.ปรับเป็นสร้างอัตโนมัติ----2018-03-19
      }
    }
  });
}

function CommonValidateSeries(param) {
  $.ajax({
    url: "index.php?r=setupnos/ajax-find-series",
    type: "POST",
    data: { table: param },
    async: false,
    dataType: "JSON",
    success: function(response) {
      if (response.id) {
        // มี Number Series แล้ว
        // ตรวจสอบการรันหมายเลข (มีการรันแล้วหรือยัง)
        CheckRuningNumberSeries(
          response.id,
          response.code,
          param.efect,
          "true"
        );
        //CheckRuningNumberSeries(response.id, response.code, param.field, 'true');
      } else {
        $.ajax({
          url: "index.php?r=series/create-ajax",
          type: "POST",
          data: param,
          async: false,
          dataType: "JSON",
          success: function(res) {
            $.ajax({
              url: "index.php?r=series/ajax_autogenseries",
              type: "GET",
              data: { code: 01, char: "0000", digit: "0000", NoSeries: res.id },
              async: false,
              success: function(datares) {
                CheckRuningNumberSeries(res.id, res.code, param.efect, "true");
              }
            });
          }
        });
      }
    }
  });
}

function SeriesFormPost($table, $field, $cond) {
  var formClass = $(".modal button[type=submit]")
    .closest("form")
    .attr("class");
  var formpost = $("form." + formClass + "").serializeArray();
  var appdata = {
    form: formpost,
    name: $("#numberseries-name").val(),
    desc: $("#numberseries-description").val(),
    char: $("#numberseries-starting_char").val(),
    table: $table,
    field: $field,
    cond: $cond,
    sep: $("#numberseries-separate").val(),
    gen: $("#numberseries-format_gen").val(),
    type: $("#numberseries-format_type").val()
  };
  $.ajax({
    url: "index.php?r=series/create-ajax",
    type: "POST",
    data: appdata,
    async: false,
    success: function(getData) {
      var obj = jQuery.parseJSON(getData);
      CheckRuningNumberSeries(obj.id, obj.code, obj.field, "true");
    }
  });
}

function CheckRuningNumberSeries(id, code, $textField, $dash) {
  $.ajax({
    url: "index.php?r=series/ajax-find-noseries",
    type: "GET",
    data: { id: id, code: code },
    async: false,
    dataType: "JSON",
    success: function(response) {
      if (response.status === 201) {
        // Auto Gen
        $("#RunNoSeries").modal("toggle");
        $(".data-body").html(response.html);
        $(".modal-title").html("No Series");
      } else {
        // Get New Series
        $.ajax({
          url: "index.php?r=series/next-runing-series",
          type: "GET",
          data: { id: id, dash: $dash },
          async: false,
          success: function(Series) {
            $($textField).val(Series);
          }
        });
      }
    }
  });
}

// 10/10/17

$(document).ready(function() {
  $(".kv-editable-reset,.kv-editable-submit").attr("title", " ");
});

$("body").on("click", "a.a-OpenModal", function() {
  $("#RunNoSeries").modal("show");
  $("body").attr("style", " ");
  $(".modal-body").slideUp();
  var link = $(this)
    .attr("href")
    .substring(1);
  $.ajax({
    url: "index.php?r=series/ajax_noseries&" + link,
    type: "GET",
    async: false,
    success: function(getData) {
      $(".data-body").html(getData);
      $(".modal-title").html("No Series");
      $(".data-body").attr(
        "style",
        "height: 400px;overflow-y: auto; overflow-x: hidden;"
      );
      $(".modal-body").slideDown("slow");
    }
  });
});

//$('.no-se').on("change mouseout", function(event){
$("body").on("keyup", "input.no-se", function(event) {
  var param = {
    txt: $(this).val(),
    id: $(this).attr("data"),
    fieldname: $(this).attr("id")
  };
  $.ajax({
    url: "index.php?r=series/ajax_update",
    type: "GET",
    data: { param: param },
    async: false,
    success: function(getData) {
      $(".resource").html(getData);
    }
  });
});

$("body").on("click", "button.GenSeries", function() {
  $.ajax({
    url: "index.php?r=series/ajax_autogenseries",
    type: "GET",
    data: {
      code: 01,
      char: $("#digit").attr("char"),
      digit: $("#digit").attr("data"),
      NoSeries: $("#digit").attr("no-series")
    },
    async: false,
    success: function(getData) {
      $(".resource").html(getData);
      $(".GenSeries").hide();
    }
  });
});

$("body").on("click", "button.CLEAR-DATA", function() {
  var $data = $(this).attr("data");
  if (confirm("Do you want to clear this data?")) {
    $.ajax({
      url: "index.php?r=series/ajax-clear",
      type: "POST",
      data: { id: $data },
      async: false,
      success: function(getData) {
        $(".data-body").html(getData);
        $(".modal-title").html("No Series");
        $(".modal-body").slideDown("slow");
      }
    });
  }
});

function loadSeriesBox($div) {
  $("ew.pick-seires-box").remove();
  // ----- find-price -----
  var $findDiv =
    '<ew class="pick-seires-box">' +
    '<div class="pick-seires" >' +
    '   <div class="pick-seires-render" > </div>' +
    '   <div class="pick-load">' +
    '       <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw text-info"></i>' +
    '       <span class="sr-only">Loading...</span>' +
    "   </div>" +
    "</div>" +
    "</ew>";
  $($div).append($findDiv);
}

function ShowSeriesList($this, $module) {
  $.ajax({
    url: "index.php?r=series/get-curent-series",
    type: "POST",
    data: { module: $module },
    async: true,
    success: function(getData) {
      $(".pick-seires-render").html(getData);
      setTimeout(function(e) {
        $(".pick-seires").slideDown("fast");
        $(".pick-load").fadeOut();
        $($this)
          .closest("div.input-group")
          .find("input")
          .removeClass("focus");
      }, 100);
    }
  });
}

function PickSeriesToText(source, $obj) {
  $("body").on("click", ".series-list .selected", function() {
    $(source + "-" + $obj[0]).val($(this).attr("data"));
    $(source + "-" + $obj[1]).val($(this).attr("key"));
    $(source + "-" + $obj[0]).addClass("focus");
    $(".pick-seires").slideUp("fast");
  });
}

function customSeriesPopUp(source) {
  $("body").on("click", source, function() {
    $("#RunNoSeries").modal("show");
    var $id = $(this).attr("data");
    var $code = $(this).attr("code");
    $.ajax({
      url: "index.php?r=series/ajax_noseries&id=" + $id + "&code=" + $code,
      type: "GET",
      success: function(getData) {
        $("#RunNoSeries .data-body").html(getData);
        $(".modal-title").html(
          '<i class="fa fa-info fa-sort-amount-desc " aria-hidden="true"></i> No Series'
        );
        $(".data-body").attr(
          "style",
          "height: 500px;overflow-y: auto; overflow-x: hidden;"
        );
        //$('body').attr('style','overflow:auto; margin-right:0px;');
        $("button.CLEAR-DATA").hide();
      }
    });
  });
}

$("body").on("click", "#AddSeries", function() {
  window.location.href =
    "index.php?r=series%2Fcreate&series[form]=Purchase&table[name]=purchase_header&table[field]=vendor_type&table[cond]=3&series[starChar]=PO&series[separate]=YYMM-&series[format_gen]=0000";
});


$('body').on('change','#number-series-code',function(){
  var id = $(this).val();
  $.ajax({
    url: "index.php?r=series/get-ajax-noseries&id=" + id,
    type: "GET",
    dataType:'JSON',
    success: function(res) {
      console.log(res);
      $("#RunNoSeries .data-body").html(res.html);
    } 
  });
});


$('body').on('click','.save-close',function(){
  $.ajax({
    url: "index.php?r=series/save-ajax-noseries&id=" + id,
    type: "POST",
    dataType:'JSON',
    success: function(res) {
      if(res.status==200){
        $("#RunNoSeries").modal("hide");
      }else{

        $.notify({
          // options
          icon: 'far fa-check-square',
          message: res.message
        },{
          // settings
          placement: {
              from: "top",
              align: "center"
          },
          type: 'warning',
          delay: 3000,
          z_index:3000,

        });
      }
    } 
  });
 
})