( function($) {
	$(document).ready(function() {
		$site_main = $('body');
		$nav_content_container = $('#nav-content-container');
		$nav_content = $('.content-panel-container')
		$nav_bg = $('#masthead');
		$nav = $('.main-nav ul');
		$nav_links = $('.main-nav ul li');
		$nav_close_btn = $('#nav-close-container');
		$mobile_nav_close_btn = $('#mobile-nav-close');
		$loader = $('.loader-container');
		

		$work_link = $('#work');
		$about_link = $('#about');
		$index_link = $('#index');
		$social_link = $('#social');

		
	

		$nav_links = $('.main-nav ul li');
		// resize $nav_content_container on load
		resizeNavContentContainer(63);

		// on window resize functions
		$(window).resize(function() {
			// resize $nav_content_container on resize
			resizeNavContentContainer(63);

			if ($(window).width() < 992) {
				if ( !$work_link.hasClass('active') ) {
					$mobile_nav_close_btn.show();
					$nav.hide();
				} 
				if( $work_link.hasClass('active') ) {
					$nav.css('display', 'grid');
					$nav_bg.css('background-color', '#000');
				}

			} else if ( $(window).width() > 991 ) {
				if ( !$work_link.hasClass('active')  ) {
					$mobile_nav_close_btn.hide();
					$nav.show();
					$nav.css('display', 'flex');
				}
				if( $work_link.hasClass('active') ) {
					$nav.css('display', 'flex');
					$nav_bg.css('background-color', 'transparent');
				}
			}
		});







		// close nav content
		$nav_close_btn.click(function() {
			closeNavContent();
		});

		// close nav content(mobile)
		$mobile_nav_close_btn.click(function() {
			hideMobileNavCloseBtn();
			closeNavContent();
			$nav.css('display', 'grid');
		});

		$work_link.click(function() {
			workCall();
		});

		$about_link.click(function() {
			aboutAjaxCall();
		});

		$index_link.click(function() {
			indexAjaxCall();
		});

		$social_link.click(function() {
			socialAjaxCall();
		});


		function workCall() {
			//history.replaceState(null, null, "/work")
			if($work_link.hasClass('active')) {
				return;
			} else {
				closeNavContent();
			}
		};

		// ajax call functions
		$content_panel = $('#content-panel');
		var acf_rest_url = navigation_object.acf_rest_url;

		// http://localhost:8888/wp-json/wp/v2/categories?parent=2

		function aboutAjaxCall() {
			curPage = "/about"
			var json_url = acf_rest_url + '/about/11';

			if($about_link.hasClass('active')) {
				return;
			} else {
				$.ajax({
					url: json_url,
					dataType: 'json',
					beforeSend: function() {
						// disable click events on nav links during ajax call/animations
						$nav_links.off('click');
						revealMobileNavCloseBtn();
						// slide down or fade out content based on state of nav panel and set active link
						ajaxBeforeSendNavContent($about_link);
					},
					error: function() {
						console.log('ajaxError');
						$loader.fadeOut(200);
					},
					success: function(data) {
						var content = 
							'<div class="row justify-content-around">' +
								'<div class="col-12 col-md-5 col-lg-4">' +
									data.acf.about +
								'</div>' +

								'<div class="col-12 col-md-4 col-lg-5">' +
									'<div class="row">' +
										'<div class="col-lg-6"> ' + data.acf.contact +
											data.acf.education + 
										'</div>' +
										'<div class="col-lg-6"> ' + 
											data.acf.experience + 
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';
	
						// replace content after fade out animation is complete
						revealNavContent(content);
						console.log('success');
					}
				}); 
			};
		};
		
		var curPage = "/";
		
		function indexAjaxCall() {
			curPage = "/"
			var json_url = acf_rest_url + '/about/11';

			if($index_link.hasClass('active')) {
				return;
			} else {
				$.ajax({
					url: json_url,
					dataType: 'json',
					beforeSend: function() {
						// disable click events on nav links during ajax call/animations
						$nav_links.off('click');
						revealMobileNavCloseBtn();
						// slide down or fade out content based on state of nav panel and set active link
						ajaxBeforeSendNavContent($index_link);
					},
					error: function() {
						console.log('ajaxError');
						$loader.fadeOut(200);
					},
					success: function(data) {
						var content = 
							'<div class="row justify-content-around">' +
								'<div class="col-12 col-md-5 col-lg-4">' +
									data.acf.about +
								'</div>' +

								'<div class="col-12 col-md-4 col-lg-5">' +
									'<div class="row">' +
										'<div class="col-lg-6"> ' + data.acf.contact +
											data.acf.education + 
										'</div>' +
										'<div class="col-lg-6"> ' + 
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';
						
						// replace content after fade out animation is complete
						revealNavContent(content);
						console.log('ajaxSuccess');
					}
				}); 
			};	
		};

		function socialAjaxCall() {
			var json_url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=6392438538.92c538c.1937ea2d64ae4c91bd09b7e43213bfbe';
			curPage = "/social"
			if($social_link.hasClass('active')) {
				return;
			} else {
				$.ajax({
					url: json_url,
					dataType: 'json',
					beforeSend: function() {
						// disable click events on nav links during ajax call/animations
						$nav_links.off('click');
						revealMobileNavCloseBtn();
						// slide down or fade out content based on state of nav panel and set active link
						ajaxBeforeSendNavContent($social_link);
					},
					error: function() {
						console.log('ajaxError');
						$loader.fadeOut(200);
					},
					success: function(data) {
						function getIgImages() {
							var content = 
							'<div class="row">' +
								'<div class="col-12 col-lg-5 order-lg-2 ig-handle-container">' +
									'<div class="ig-handle">' +
										'<p>@Fonzseso</p>' +
										'<a href="https://www.instagram.com/fonzseso/" target="_blank"><span>View on Instagram</span><div></div><div></div><div></div></a>' +
									'</div>' +
								'</div>' +

								'<div class="col-12 col-lg-7 order-lg-1">' +
									'<div class="ig-grid">';
								
							for( i=0; i < data.data.length; i++ ) {
								if( i===18 ) {
									break;
								} else {
									var IgImgLink =  '<img class="ig-img" src="' + data.data[i].images.standard_resolution.url + '" target="_blank">';
									content += IgImgLink;
								}
							}

							content += '</div></div></div>';
							return content;
						};

						// replace content after fade out animation is complete
						revealNavContent(getIgImages());
						console.log('success');
					}
				}); 
			};	
		};

		function rebindNavClicks() {
			//history.replaceState(null, null, curPage)
			$work_link.click(function() {
				workCall();
			});
			$about_link.click(function() {
				aboutAjaxCall();
			});	
			$index_link.click(function() {
				indexAjaxCall();
			});	
			$social_link.click(function() {
				socialAjaxCall();
			});	
			
		};





		






		function resizeNavContentContainer(headerSize) {
			$window_height = $(window).outerHeight() - headerSize;
			$nav_content_container.css('height', $window_height);
		};






		function openNavContent(link) {
			setActiveNavLink(link);
			$('#nav-content-container').slideDown(400, function() {
				$nav_close_btn.fadeIn(1000);
				$loader.fadeIn(200);
			});
			$nav_bg.css('background-color', '#000000');
			$site_main.css('overflow', 'hidden');
			$nav_bg.css('height', '100vh');
		};

		function revealNavContent(content) {
			$nav_content_container.promise().done(function() {
				$nav_content.promise().done(function() {
					$content_panel.html(content).promise().done(function() {
						$nav_content.fadeIn(400);
						// rebind click events
						rebindNavClicks();
						$loader.fadeOut(200);
					});
				});
			});
		}

		function closeNavContent() {
			//history.replaceState(null, null, "/work")
			setActiveNavLink($('.main-nav ul li:contains("Work")'));
			$nav_content.fadeOut(500);
			$nav_close_btn.fadeOut(500);
			$nav_bg.css('height', 'initial');
			$nav_content_container.slideUp(400);
			$nav_content_container.promise().done(function() {
				if( $(window).width() > 991 ) {
					$nav_bg.css('background-color', 'transparent');
				} else {
					$nav_bg.css('background-color', '#000');
				}
			});

			if($project_info_container.height() <= 140) {
				$site_main.css('overflow', 'initial');
			};
		};

		function setActiveNavLink(link) {
			if ($nav_links.hasClass('active')) {
				$nav_links.removeClass('active');
			};
			link.addClass('active');
		};






		function ajaxBeforeSendNavContent(link) {
			if ( !$work_link.hasClass('active') ) {
				$nav_content.fadeOut(400);
				$loader.fadeIn(200);
				setActiveNavLink(link);
			} else {
				openNavContent(link);
			};
		};





		function revealMobileNavCloseBtn() {
			if ( $(window).width() < 992 ) {
				$mobile_nav_close_btn.fadeIn(400);
				$nav.fadeOut(400);
			};
		};

		function hideMobileNavCloseBtn() {
			if ( $(window).width() < 992 ) {
					$mobile_nav_close_btn.fadeOut(500);
					$nav.fadeIn(1000);
			};
		};
	});
;})(jQuery);