const moment = require("moment");
moment.locale("id");

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

function formatDate(date) {
  return moment(date).format("D MMMM YYYY");
}

function timeAgo(date) {
  return moment(date).fromNow();
}

module.exports = { formatRupiah, formatDate, timeAgo };
