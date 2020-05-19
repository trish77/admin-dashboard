//JQuery Module Pattern

// An object literal
var app = {
  init: function() {
    app.functionOne();
  },
  functionOne: function () {
  }
};
$("document").ready(function () {
  app.init();

    var table = $('.course-table').DataTable({
      /*searching: false,*/
      saveState: true,
      ordering: true,
     // orderable: [[1, false]],
      "dom": '<"container-fluid px-0 d-flex mt-3" <"col-6" li> <"col-6"f>>t<"row py-2 text-white bg-secondary px-3 d-flex align-items-center"  <"d-flex mr-auto" i><"d-flex" p><"ml-auto" B>>',
      fixedHeader: {
        header: true
      },
      lengthMenu: [[5, 10, 25, 50, -1], ["5", "10", "25", "50", "All"]],
      paging: true,
      columnDefs: [
        {width: "80%", targets: 0, order: true },
        {width: "15%", targets: 1, orderable: false },
      ],
      language: {
      //  sLengthMenu: "Results",
        //"info": "_START_ &ndash; _END_ of _TOTAL_ matching regulations"
      },
      buttons: { buttons: [ { extend: 'collection', text: '<i class="fa fa-download pointer"> <span class="sans">Download</span></i>', className: 'pointer', buttons: [ 'pdf', 'excel', 'csv' ] } ] }
    });
});