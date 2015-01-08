for (i = 1; i< 1024;i++) {
$.ajax({
  url: "http://localhost:"+ i + "/portout.json",
  data: {
    zipcode: i 
  },
  success: function( data ) {
		$( "#ports" ).append( "<li><strong>" + data.host + "</strong> connection ok< /li>" );
	},
  error: function( data ) {
		$( "#ports" ).append( "<li><strong>" + data.host + "</strong> connection FAILED</li>" );
	}
});
}
