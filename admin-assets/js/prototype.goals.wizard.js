    $(function(){

		var $validator = $("#commentForm").validate({
		  rules: {
		    packageName: {
		      required: true,
		    //   email: true,
		    //   minlength: 3
		    },
		   
		  }
		});


        	$('#createPackageWizard').bootstrapWizard({
	  		'tabClass': 'bs-wizard bs-wizard-step',
			'nextSelector': '.button-next', 
			'previousSelector': '.button-previous', 
			'firstSelector': '.button-first', 
			'lastSelector': '.button-last',
	  		'onNext': function(tab, navigation, index) {
				   console.log(tab);
				    console.log(navigation);
				  console.log(index);
				  navigation.find('li').eq(index-1).addClass('complete');
	  			var $valid = $("#createPackageWizard").valid();
	  			if(!$valid) {
	  				$validator.focusInvalid();
	  				return false;
	  			}
	  		}
			  
	  	});

			// $('.save-draft').click(function() {
			// 	$('.draft-saved').show();
			// });
			$('.save-draft').click(function() {
				console.log('saves');
				$('.save-draft').hide();
				$('.draft-saved').show();
			});

			
        
  	// $('#rootwizard').bootstrapWizard({onNext: function(tab, navigation, index) {
	// 		if(index==2) {
	// 			// Make sure we entered the name
	// 			if(!$('#name').val()) {
	// 				alert('You must enter your name');
	// 				$('#name').focus();
	// 				return false;
	// 			}
	// 		}
 
	// 		// Set the name for the next tab
	// 		$('#tab3').html('Hello, ' + $('#name').val());
 
	// 	}, onTabShow: function(tab, navigation, index) {
	// 		var $total = navigation.find('li').length;
	// 		var $current = index+1;
	// 		var $percent = ($current/$total) * 100;
	// 		$('#rootwizard .progress-bar').css({width:$percent+'%'});
	// 	}});
});