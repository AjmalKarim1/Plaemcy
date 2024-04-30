const cellItemRightElements = document.querySelectorAll(".cell-item-right");

cellItemRightElements.forEach((element) => {
  element.addEventListener("click", function () {
    const isAdmin = true;

    if (isAdmin) {
      const inputValue = element.textContent.trim();
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = inputValue;
      element.innerHTML = "";
      element.appendChild(inputField);

      inputField.focus();

      inputField.addEventListener("blur", function () {
        const newValue = inputField.value.trim();
        if (newValue !== "") {
          element.innerHTML = newValue;
        } else {
          element.innerHTML = inputValue;
        }
      });
    }
  });
});

function showDiscountedRepayment() {
  // Log to console or change the page content
  console.log("Discounted Repayment selected.");

  // Get both buttons
  var discountedButton = document
    .getElementById("discountedRepayment")
    .querySelector(".repay-btn-button");
  var directButton = document
    .getElementById("directRepayment")
    .querySelector(".repay-btn-button");

  // Toggle active class
  discountedButton.classList.add("active");
  directButton.classList.remove("active");
}

function showDirectRepayment() {
  // Log to console or change the page content
  console.log("Direct Repayment selected.");

  // Get both buttons
  var discountedButton = document
    .getElementById("discountedRepayment")
    .querySelector(".repay-btn-button");
  var directButton = document
    .getElementById("directRepayment")
    .querySelector(".repay-btn-button");

  // Toggle active class
  discountedButton.classList.remove("active");
  directButton.classList.add("active");
}

function toggleActiveState() {
  var discounted = document.getElementById("discountedRepayment");
  var direct = document.getElementById("directRepayment");
  if (discounted.classList.contains("active")) {
    discounted.classList.remove("active");
    discounted.classList.add("inactive");
    direct.classList.remove("inactive");
    direct.classList.add("active");
  } else {
    direct.classList.remove("active");
    direct.classList.add("inactive");
    discounted.classList.remove("inactive");
    discounted.classList.add("active");
  }
}

// easypay ection js start from here onDDDDDDDDD
// easypay ection js start from here onDDDDDDDDD
// easypay ection js start from here onDDDDDDDDD
// easypay ection js start from here onDDDDDDDDD

var channelId = 0;
var successUrl = "./check.html?code=success";
var failUrl = "./check.html?code=fail";
var peddingUrl = "./check.html?code=pedding";
var orderid = "";
var upiInpayUrl = "";
var payUrl = "";
var downTimeId = "";
$(function () {
  var orderNumber = getParams("code");
  if (orderNumber != false) {
    $.post(
      "https://payapi.sfpay.in/upiv6/gateway/getPaymentInfo.php",
      { orderNumber: orderNumber },
      function (res) {
        $(".loading").hide();
        if (res.code == 0) {
          insertData(res.data);
        } else if (res.code == 2) {
          location.href = success;
        } else {
          location.href = failUrl;
        }
      },
      "json"
    );
  } else {
    location.href = failUrl;
  }
  var isBaackground = false;
  document.addEventListener("visibilitychange", function (e) {
    if (document["hidden"] == true) {
      isBaackground = true;
    }
  });

  var $upiBut = new Clipboard(".upiBut");
  $upiBut.on("success", function () {
    showDialog("Copy Success");
  });
  var $copyBUt = new Clipboard(".copyBUt");
  $copyBUt.on("success", function () {
    showDialog("Copy Success");
  });

  $(".pay-method").click(function () {
    var url = $(this).data("uri");
    location.href = url;
  });

  $("#help").click(function () {
    $("#layui-layer1").show();
  });

  $(".closeHelp").click(function () {
    $("#layui-layer1").hide();
  });

  $(".tabBar li").click(function () {
    var index = $(this).attr("data-index");
    $(".tabBar li").removeClass("select");
    $(this).addClass("select");
    upiInpayUrl = $(this).attr("data-url");
    if (index == "upiContent") {
      $(".upiContent").show();
      $(".accountContent").hide();
      $(".qrCodeContent").hide();
    } else if (index == "scanCode") {
      $(".upiContent").hide();
      $(".accountContent").hide();
      $(".qrCodeContent").show();
    } else {
      $(".upiContent").hide();
      $(".accountContent").show();
      $(".qrCodeContent").hide();
    }
  });

  $(".refnum").on("input", function () {
    var val = $(".refnum").val();
    if (!val || val.length < 12) {
      $(".submitBut").addClass("disabled");
      $(".submitBut").removeClass("enable");
    } else if (val.length > 12) {
      $(".refnum").val(val.slice(0, 12));
    } else {
      $(".submitBut").removeClass("disabled");
      $(".submitBut").addClass("enable");
    }
  });

  $(".submitBut").click(function () {
    var utr = $(".refnum").val();
    if (utr.length != 12) {
      showDialog("Must enter 12 digit UTR");
    }
    if ($(this).hasClass("disabled")) {
      return false;
    } else {
      $(".submitBut").addClass("disabled");
    }

    $.post("https://payapi.sfpay.in/upiv6/gateway/submitorder.php", {
      ref: utr,
      upi: $(".upiInput").text(),
      orderid: orderid,
      type: "upi",
    }).then((res) => {
      if (res.code != 0) {
        // layer.msg(res.message);
        alert(res.message);
      } else {
        if (res.data.status == "success") {
          location.href = successUrl;
        } else if (res.data.status == "pedding") {
          location.href = peddingUrl;
        } else {
          location.href = failUrl;
        }
      }
      $(".submitBut").removeClass("disabled");
    });
  });

  $(".refnumBank").on("input", function () {
    var val = $(".refnumBank").val();
    if (!val || val.length < 12) {
      $(".submitButBank").addClass("disabled");
      $(".submitButBank").removeClass("enable");
    } else if (val.length > 12) {
      $(".refnumBank").val(val.slice(0, 12));
    } else {
      $(".submitButBank").removeClass("disabled");
      $(".submitButBank").addClass("enable");
    }
  });

  $(".submitButBank").click(function () {
    var utr = $(".refnumBank").val();
    if (utr.length != 12) {
      showDialog("Must enter 12 digit UTR");
    }
    if ($(this).hasClass("disabled")) {
      return false;
    } else {
      $(".submitButBank").addClass("disabled");
    }

    $.post("https://payapi.sfpay.in/upiv6/gateway/submitorder.php", {
      ref: utr,
      upi: $(".upiInput").text(),
      orderid: orderid,
      type: "upi",
    }).then((res) => {
      if (res.code != 0) {
        // layer.msg(res.message);
        alert(res.message);
      } else {
        if (res.data.status == "success") {
          location.href = successUrl;
        } else if (res.data.status == "pedding") {
          location.href = peddingUrl;
        } else {
          location.href = failUrl;
        }
      }
      $(".submitButBank").removeClass("disabled");
    });
  });

  $(".useButton").click(function () {
    setTimeout(function () {
      if (isBaackground == false) {
        window.location.href =
          "https://static.yvk.net/apk/inpay_202205111736.apk";
      }
    }, 3000);
    location.href = upiInpayUrl;
  });

  $(".closePayment").click(function () {
    $(".paymentCheck").slideUp();
    clearInterval(downTimeId);
    $(".paymentBut").removeClass("disabled");
  });

  $(".selectImg").click(function () {
    $(".selectImg").css("border-color", "#eee");
    $(this).css("border-color", "rgb(21,171,238)");
    var selectVal = $(this).attr("data-index");
    var url = "paytmmp://upi";
    switch (selectVal) {
      case "phonepe":
        url = "phonepe://pay";
        break;
      case "other":
        url = "upi://pay";
        break;
      case "googlepay":
        url = "gpay://upi";
        break;
      default:
        url = "paytmmp://upi";
    }
    $(".paymentCheck").slideDown();
    $(".downTime").text("00:00");

    timeVal = 1800;
    downTimeId = setInterval("downTime()", 1000);
    location.href = url;
    setTimeout(function () {
      if (isBaackground == false) {
        $(".paymentCheck").slideUp();
        clearInterval(downTimeId);
        showDialog("Please choose another payment method");
      }
    }, 3000);
  });

  var check = function () {
    if ($(".utr").val().length == 12) {
      return true;
    }
    return false;
  };

  setInterval("checkchannel()", 10000);
});

function showDialog(message) {
  if ($(".alertMessage").hasClass("showMsg")) {
    return;
  }
  $(".alertMessage").text(message);
  $(".alertMessage").addClass("showMsg");
  var alertWidth = $(".alertMessage").width();
  var bodyWidth = $(".body").width();
  $(".alertMessage").css("left", (bodyWidth - alertWidth) / 2 - 30);
  $(".alertMessage").fadeIn(300, function () {
    $(".alertMessage").fadeOut(3000);
    $(".alertMessage").removeClass("showMsg");
  });
}

function downTime() {
  var minute = Math.floor(timeVal / 60);
  var second = timeVal % 60;
  console.log(minute);
  console.log(minute);
  timeVal--;
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  $(".downTime").text(minute + ":" + second);
  if (timeVal == 0) {
    location.href = peddingUrl;
  }
}

function getParams(key) {
  var url = window.location.search.substr(1);
  if (url == "") {
    return false;
  }
  var paramsArr = url.split("&");
  for (var i = 0; i < paramsArr.length; i++) {
    var combina = paramsArr[i].split("=");
    if (combina.length == 2 && combina[0] == key) {
      return combina[1];
    }
  }
  return false;
}

function insertData(data) {
  var salt = data.salt;
  console.log(data);
  $("#amountVal").text(data.total_fee);
  $(".copyBUt").attr("data-clipboard-text", parseInt(data.total_fee));
  $("#upiInput").text(salt.upi);
  $("#upiCopyBut").attr("data-clipboard-text", salt.upi);
  $("#accountName").text(salt.name);
  $("#accountNameBut").attr("data-clipboard-text", salt.name);
  $("#accountNumber").text(salt.account);
  $("#accountNumberBut").attr("data-clipboard-text", salt.account);
  $("#accountIfsc").text(salt.ifsc);
  $("#accountIfscBut").attr("data-clipboard-text", salt.ifsc);
  $("#bankName").text(salt.bankName);
  $(".Qrdiv img").attr("src", data.qrCode);

  if (data.identity == "upiv1") {
    $(".upiContent").hide();
    $(".tabBar").hide();
    $(".accountContent").show();
  } else {
    $(".upiContent").show();
    // $(".tabBar").hide()
    $(".accountContent").hide();
    $("#accountContentDiv").hide();
  }
  var payParams = {
    pa: salt.upi,
    pn: salt.pn,
    tr: data.tn,
    tn: data.tn,
    am: data.total_fee,
    cu: "INR",
  };
  // payUrl = parseParam(payParams)
  channelId = data.channel;
  orderid = data.order_number;
  var url = "inpay://com.omnipotent/main";
  var urlParams = {
    pa: salt.upi,
    orderid: data.order_number,
    am: data.total_fee,
    tr: data.tn,
    tn: data.tn,
    version: "2.2.2",
    cardName: salt.name,
    cardNo: salt.account,
    ifsc: salt.ifsc,
    bankName: salt.bankName,
    is_bank: 0,
  };
  $("#upiContentDiv").attr("data-url", url + "?" + parseParam(urlParams));
  urlParams.is_bank = 1;
  $("#accountContentDiv").attr("data-url", url + "?" + parseParam(urlParams));
  upiInpayUrl = $("#upiContentDiv").attr("data-url");
}

var parseParam = function (param, key) {
  var paramStr = "";
  if (
    param instanceof String ||
    param instanceof Number ||
    param instanceof Boolean
  ) {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  } else {
    $.each(param, function (i) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += "&" + parseParam(this, k);
    });
  }
  return paramStr.substr(1);
};
function checkchannel() {
  $.post("https://payapi.sfpay.in/upiv6/gateway/getStatus.php", {
    channel: channelId,
  }).then((res) => {
    if (res.code != 0) {
      location.href = failUrl;
    }
  });
}
