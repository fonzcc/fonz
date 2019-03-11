( function($) {
    $(document).ready(function() {

        var slugId;
       
        $project_description_preview = $('.project-info-container .description');
        $project_title_preview = $('.project-info-container .meta-header .title');
        $project_post_count_preview = $('.project-info-container .meta-header .post-count');
        $project_transition_image_preview = $('.project-info-container .transition-image');
        $project_type = $('.project-info-container .meta-header .type');
        $project_type_mobile = $('.project-info-container .type-mobile');
        $project_nav = $('#project-nav');
        
        $project_info_container = $('.project-info-container');
        $project_info = $('.project-info');
        $meta_container = $('.project-info-container .meta-container');
        $project_thumbnail = $('.project-collage');

        $project_content = $('.project-content')
        $project_content_container = $('.project-info-container .container');

        $project_close = $('#project-close');
        $project_previous = $('#project-previous');
        $project_next = $('#project-next');
        $scroll_top_button = $('#scroll-top');
        $page_nav_logo = $('#svg-page-nav-logo-container');

        $next = $('#project-next');
        $prev = $('#project-back');

        if(window.location.hash.includes("#/projects")) {
            slugId = window.location.hash.replace("#/projects/", "")
            console.log("IDDDD0: ", slugId)

            console.log("poop")
            var aTag = $("#pic-" + slugId);
            console.log("aTag: ", aTag)
            console.log(" aTag.offset().top: ",  aTag.offset().top)
            setTimeout(function() {
                $('html,body').scrollTop(aTag.offset().top);
                expandProject()
            }, 800)

        } 


        $next.on('click', function() {
            if ( $(this).attr('data-next') === '' ) {
                $(this).addClass('flash');
                setTimeout(function () {
                    $next.removeClass('flash');
                }, 1000);
            } else {
                var json_url = page_nav_object.rest_url + '/' + $(this).attr('data-next');
                $post_id = $(this).attr('data-next');

                $.ajax({
                    url: json_url,
                    dataType: 'json',
                    beforeSend: function () { 
                        $project_info.fadeOut();
                    },
                    error: function () {
                        console.log('next project error');
                    },
                    success: function (data) {
                        next_prev_content_update(data);  
                    }
                });
            }
        });

        $prev.on('click', function() {
            if ( $(this).attr('data-prev') === '') {
                $(this).addClass('flash');
                setTimeout(function () {
                    $prev.removeClass('flash');
                }, 1000);
            } else {
                var json_url = page_nav_object.rest_url + '/' + $(this).attr('data-prev');
                $post_id = $(this).attr('data-prev');

                $.ajax({
                    url: json_url,
                    dataType: 'json',
                    beforeSend: function () { 
                        $project_info.fadeOut();
                    },
                    error: function () {
                        console.log('prev project error');
                    },
                    success: function (data) {
                        next_prev_content_update(data);
                    }
                });

            }
        });

        function next_prev_content_update(data) {
            $post_count = $('.post-count');
            $post_title = $('.title');
            $post_description = $('.description');
            $post_type = $('.type');
            $post_transition_image = $('.transition-image');
            $post_content = $('#project-ajax-content');

            $post_count_value = $("div[data-id='" + $post_id + "']").find('.post-count-hidden').html();
            $project_info_container.attr('data-id', $post_id);
            $post_next_id = $("div[data-id='" + $post_id + "']").attr('data-next');
            $post_prev_id = $("div[data-id='" + $post_id + "']").attr('data-prev');

            $post_count.html($post_count_value);
            $post_title.html(data.title.rendered);
            $post_description.html(data.acf.description);
            $post_type.html(data.acf.type);
            $post_transition_image.html('<img src="' + data.acf.transition_image + '" alt="Project Cover">')
            $post_content.html(data.acf.content);

            $next.attr('data-next', $post_next_id);
            $prev.attr('data-prev', $post_prev_id);

            $project_info.fadeIn();
        }


        $project_info_container.on('click', function() {
            expandProject();
            projectAjaxCall();
        });

        $project_thumbnail.on('click', function() {
            expandProject();
            projectAjaxCall();
        });

        $project_close.on('click', function() {
            closeProject();
        });

        $scroll_top_button.on('click', function() {
            scrollTop();
        });

        $page_nav_logo.on('click', function() {
            if ($(this).hasClass('svg-logo-clickable')) {
                closeProject();
            };
        });




        // on window load to get correct height measurements
        $(window).load(function() {
            metaPreviewSelect();
            
            $(window).on('scroll', function() {
                metaPreviewSelect();
            });
        });

        // ====================================================
        // Project Preview On Scroll
        // ====================================================
        function metaPreviewSelect() {
            $project_thumbnail.each(function() {
                $thumbnail_offset_top = $(this).offset().top;
                $thumbnail_height =  $(this).outerHeight(true);
                $thumbnail_offset_total = $thumbnail_offset_top + $thumbnail_height;
                // update meta content when thumbnail is scrolled into view
                if ( $project_info_container.offset().top >= $thumbnail_offset_top & $project_info_container.offset().top < $thumbnail_offset_total ) {
                    $post_count = $(this).find('.post-count-hidden').html();
                    $title = $(this).find('.title-hidden').html();
                    $description = $(this).find('.description-hidden').html();
                    $transition_image = $(this).find('.transition-image-hidden').html();
                    $type = $(this).find('.type-hidden').html();
                    $project_id = $(this).attr('data-id');
                    $prev_id = $(this).attr('data-prev');
                    $next_id = $(this).attr('data-next');


                    if ( $project_info_container.attr('data-id') === $project_id) {
                        return;
                    } else {
                        metaPreviewUpdate($post_count, $title, $description, $transition_image, $type, $project_id, $prev_id, $next_id);
                        console.log('fired');
                    }
                }
            });
        };

        function metaPreviewUpdate(post_count, title, description, transition_image, type, project_id, prev_id, next_id) {
            $meta_container.addClass('fadeOut');
            $project_info_container.attr('data-id', project_id);
            $next.attr('data-next', next_id);
            $prev.attr('data-prev', prev_id);

            $meta_container.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                function () {
                    $project_description_preview.html(description);
                    $project_title_preview.html(title);
                    $project_post_count_preview.html(post_count);
                    $project_transition_image_preview.html(transition_image);
                    $project_type.html(type);
                    $project_type_mobile.html(type);
                    $meta_container.removeClass('fadeOut');
                });
        };

        // ====================================================
        // Expand Single Project Page
        // ====================================================
        function expandProject() {


            $project_info_container.addClass('expanded');
            // disable click event
            $project_info_container.off('click');

            // disable main site panel scroll
            $site_main.css('overflow', 'hidden');

            $project_info_container.css({
                'overflow-y': 'scroll',
                'cursor': 'initial',
                'bottom': '0'
            });

            $project_nav.css('overflow-y', 'scroll');
            
            $project_nav.fadeIn(1);
            $project_content.fadeIn(1);

            $project_info_container.animate({
                'transform': 'translateY(0vh)',
                'height': '100vh'
            }, 400).promise().done(function () {
                //$project_nav.fadeIn(1);
                
            });

            $page_nav_logo.addClass('svg-logo-clickable');
            $project_info_container.removeClass('page-nav-hover');
        }

        // ====================================================
        // Close Single Project Page
        // ====================================================
        function closeProject() {
            $project_info_container.removeClass('expanded');
            $project_nav.fadeOut(300);
            $project_content.fadeOut(300);
            
            $project_info_container.css({
                'overflow-y': 'hidden',
                'cursor': 'pointer'
            });

            $project_nav.css('overflow-y', 'hidden');

            // if mobile, project nav bar fully collapses
            if ($(window).width() < 992) {
                $project_info_container.animate({
                    'bottom': '-140px',
                    'height': '0',
                    'padding-top': '20px'
                }, 400).promise().done(function () {
                    $project_info_container.animate({
                        'scrollTop': '0'
                    });
                    metaPreviewSelect();
                });
            } else {
                // else reset to regular position on desktop
                $project_info.fadeOut(300).promise().done(function () {
                    $project_info_container.animate({
                        'transform': 'none',
                        'height': '140px',
                        'scrollTop': '0',
                        'padding-top': '20px'
                    }, 400).promise().done(function() {
                        metaPreviewSelect();
                        console.log('fired');
                    });
                    $project_info.fadeIn(300);
                });
            }
            // reenable main site panel scroll
            $site_main.css('overflow', 'initial');

            $page_nav_logo.removeClass('svg-logo-clickable');
            $project_info_container.addClass('page-nav-hover');

            $("body").css({ 'height': 'auto', 'overflow': 'initial' })

            setTimeout(function () {
                // rebind click event on project info container to expand project
                // delay so click on logo does not also register click rebind
                $project_info_container.on('click', function () {
                    expandProject();
                });
            }, 100);
        }

        // ====================================================
        // Lock Body Scroll for iOS
        // ====================================================
        scrollLock('project-info-container');
        scrollLock('nav-content-container');
        
        function scrollLock(target) {
            var _overlay = document.getElementById(target);
            var _clientY = null; // remember Y position on touch start

            _overlay.addEventListener('touchstart', function (event) {
                if (event.targetTouches.length === 1) {
                    // detect single touch
                    _clientY = event.targetTouches[0].clientY;
                }
            }, false);

            _overlay.addEventListener('touchmove', function (event) {
                if (event.targetTouches.length === 1) {
                    // detect single touch
                    disableRubberBand(event);
                }
            }, false);

            function disableRubberBand(event) {
                var clientY = event.targetTouches[0].clientY - _clientY;

                if (_overlay.scrollTop === 0 && clientY > 0) {
                    // element is at the top of its scroll
                    event.preventDefault();
                }

                if (isOverlayTotallyScrolled() && clientY < 0) {
                    //element is at the top of its scroll
                    event.preventDefault();
                }
            }

            function isOverlayTotallyScrolled() {
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
                return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
            }
        }

        // ====================================================
        // Responsive Styles
        // ====================================================
        // hide/show page nav bar when switching from desktop to mobile
        $(window).resize(function () {
            if ($(window).width() < 992) {
                if ($project_info_container.outerHeight() === 140) {
                    $project_info_container.css({ 'bottom': '-140px' });
                }
            } else {
                if ( $project_info_container.css('bottom') === '-140px' ) {
                    $project_info_container.css({
                        'bottom': '0',
                        'height': '140px'
                    });
                }
            }   
        });

        function projectAjaxCall() {
            var json_url = slugId ? "/wp-json/wp/v2/posts?slug=" + slugId : "/wp-json/wp/v2/posts?slug=" + $project_info_container.attr('data-id')
            console.log()
            //var json_url = "/wp-json/wp/v2/posts/" + $project_info_container.attr('data-id');

            //http://localhost:8888/wp-json/wp/v2/posts/139
            //var json_url = page_nav_object.rest_url + 'wp-json/wp/v2/' + $project_info_container.attr('data-id');

            //console.log("json_url: ", altJsonUrl)
            $content = $('#project-ajax-content');

            // $.ajax({
            //     url: json_url,
            //     dataType: 'json',
            //     beforeSend: function() {
            //     },
            //     error: function() {
            //         console.log('projectAjaxCall error');
            //     },
            //     success: function(data) {
            //         console.log("DATA: ", data)
            //         $content.html(data.acf.content);
                    
            //     }
            // }); 
        }

        function scrollTop() {
            $project_info_container.animate({'scrollTop': '0',}, 'slow');
        }
    });

    !function (o, e) { if ("function" == typeof define && define.amd) define(["exports"], e); else if ("undefined" != typeof exports) e(exports); else { var t = {}; e(t), o.bodyScrollLock = t } }(this, function (exports) { "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }); var n = "undefined" != typeof window && window.navigator && window.navigator.platform && /iPad|iPhone|iPod|(iPad Simulator)|(iPhone Simulator)|(iPod Simulator)/.test(window.navigator.platform), i = null, l = [], d = !1, u = -1, c = void 0, a = void 0, s = function (o) { var e = o || window.event; return e.preventDefault && e.preventDefault(), !1 }, o = function () { setTimeout(function () { void 0 !== a && (document.body.style.paddingRight = a, a = void 0), void 0 !== c && (document.body.style.overflow = c, c = void 0) }) }; exports.disableBodyScroll = function (r, o) { var t; n ? r && !l.includes(r) && (l = [].concat(function (o) { if (Array.isArray(o)) { for (var e = 0, t = Array(o.length); e < o.length; e++)t[e] = o[e]; return t } return Array.from(o) }(l), [r]), r.ontouchstart = function (o) { 1 === o.targetTouches.length && (u = o.targetTouches[0].clientY) }, r.ontouchmove = function (o) { var e, t, n, i; 1 === o.targetTouches.length && (t = r, i = (e = o).targetTouches[0].clientY - u, t && 0 === t.scrollTop && 0 < i ? s(e) : (n = t) && n.scrollHeight - n.scrollTop <= n.clientHeight && i < 0 ? s(e) : e.stopPropagation()) }, d || (document.addEventListener("touchmove", s, { passive: !1 }), d = !0)) : (t = o, setTimeout(function () { if (void 0 === a) { var o = !!t && !0 === t.reserveScrollBarGap, e = window.innerWidth - document.documentElement.clientWidth; o && 0 < e && (a = document.body.style.paddingRight, document.body.style.paddingRight = e + "px") } void 0 === c && (c = document.body.style.overflow, document.body.style.overflow = "hidden") }), i || (i = r)) }, exports.clearAllBodyScrollLocks = function () { n ? (l.forEach(function (o) { o.ontouchstart = null, o.ontouchmove = null }), d && (document.removeEventListener("touchmove", s, { passive: !1 }), d = !1), l = [], u = -1) : (o(), i = null) }, exports.enableBodyScroll = function (e) { n ? (e.ontouchstart = null, e.ontouchmove = null, l = l.filter(function (o) { return o !== e }), d && 0 === l.length && (document.removeEventListener("touchmove", s, { passive: !1 }), d = !1)) : i === e && (o(), i = null) } });

;})(jQuery);