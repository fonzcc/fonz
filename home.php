<?php
get_header();

function Get_Post_Number($postID){
	$temp_query = $wp_query;
	$postNumberQuery = new WP_Query('orderby=date&posts_per_page=-1');
	$counter = 1;
	$postCount = 0;
	if($postNumberQuery->have_posts()) :
		while ($postNumberQuery->have_posts()) : $postNumberQuery->the_post();
			if ($postID == get_the_ID()){
				$postCount = $counter;
			} else {
				$counter++;
			}
	endwhile; endif;
	wp_reset_query();
	$wp_query = $temp_query;
	return $postCount;
}

?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
            <div class="container">
                <img class="collage-logo" src="<?php bloginfo('stylesheet_directory'); ?>/images/logo-white.svg" alt="Fonz">
            </div>
            <div class="container project-collage-container">

                <?php while ( have_posts() ) : the_post(); 
                    $count_posts = wp_count_posts();
                    $total_posts = $count_posts->publish;
                    $currentID = get_the_ID();
                    $post_number = Get_Post_Number($currentID);
                ?>

                    <div data-id="<?php echo get_the_ID() ?>" data-prev="<?php echo get_previous_post()->ID ?>" data-next="<?php echo get_next_post()->ID ?>" class="row project-collage">
                        <div class="col-12">
                             <?php echo wp_get_attachment_image( get_field('thumbnail'), 'full'); ?>
                             <div class="post-count-hidden">
                                 <?php echo $post_number . ' / ' . $total_posts; ?>
                             </div>
                             <div class="title-hidden">
                                 <?php echo get_the_title(); ?>
                             </div>
                             <div class="description-hidden">
                                <?php the_field('description'); ?>
                            </div>
                            <div class="transition-image-hidden">
                                <img src="<?php the_field('transition_image') ?>" alt="Project Cover">
                            </div>
                            <div class="type-hidden">
                                <?php the_field('type'); ?>
                            </div>
                        </div>
                    </div>
                    
                <?php endwhile; ?>
            </div>

            <div class="project-info-container page-nav-hover" id="project-info-container">
                <div class="container project-info">
                    <div class="row justify-content-between">
                        <div class="col-12 col-md-6">
                            <div class="row meta-container">
                                <div class="meta-header col-12 col-lg-5">
                                    <div>
                                        <div class="post-count"></div>
                                        <div class="title">
                                        </div>
                                    </div>

                                    <div>
                                        <div class="type">
                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="description col-12 col-lg-7">

                                </div>
                            </div>
                        </div>

                        <div class="col-12 d-lg-none type-mobile">
                        </div>

                        <div class="d-none d-lg-block col-6">
                            <div id="svg-page-nav-logo-container">
                                <svg version="1.1" id="svg_page_nav_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 462 130" style="enable-background:new 0 0 462 130;" xml:space="preserve">
                                    <style type="text/css">
                                        .st0{fill:none;stroke:#000000;stroke-width:20;}
                                        .st1{fill:none;stroke:#000000;stroke-width:2;}
                                    </style>
                                    <g id="Welcome">
                                        <rect id="Rectangle-3" x="-5518" y="-5022" class="st0" width="14762" height="10936"/>
                                        <g id="Artboard">
                                            <g id="Logo" transform="translate(1.000000, 3.000000)">
                                                <polygon id="Path-5-Copy" class="st1" points="0,0 99,0 99,36.3 44.8,36.3 44.8,49.7 89.8,49.7 89.8,86.1 45.2,86.1 45.2,122 
                                                    0.2,122 			"/>
                                                <circle id="Oval-3-Copy" class="st1" cx="167" cy="61" r="29"/>
                                                <polygon id="Path-7-Copy" class="st1" points="204,0.2 322,124 322,0 			"/>
                                                <polygon id="Path-8-Copy" class="st1" points="459.9,0 352,122 460,122 			"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="row project-content">
                        <div class="transition-image col-12">
                        </div>

                        <div class="col-12" id="project-ajax-content">
                        </div>
                    </div>
                </div>
            </div>

            <div id="project-nav">
                    <div class="container">
                        <div class="row justify-content-start">
                            <div class="page-nav-container col-9">
                                <div class="row">
                                    <div class="col-4">
                                        <div id="project-close" class="project-nav-button">
                                            <p class="text">Close (Back to Work)</p>
                                            <div class="mobile-button">
                                                <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                                                        <g id="X-Icon" stroke="#000000">
                                                            <g id="Group-8" transform="translate(-1.000000, -1.000000)">
                                                                <g id="Group-2" transform="translate(10.000000, 10.000000) rotate(45.000000) translate(-10.000000, -10.000000) translate(9.000000, -2.000000)">
                                                                    <path d="M1,6.25194341e-13 L1,24" id="Line-4"></path>
                                                                </g>
                                                                <g id="Group-2" transform="translate(10.000000, 10.000000) rotate(-45.000000) translate(-10.000000, -10.000000) translate(9.000000, -2.000000)">
                                                                    <path d="M1,6.25194341e-13 L1,24" id="Line-4"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-4">
                                        <div id="project-back" class="project-nav-button animated">
                                            <p class="text">Previous Project</p>
                                            <div class="mobile-button">
                                                <svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="Left-Icon" stroke="#000000">
                                                            <g id="Group-2-Copy" transform="translate(12.000000, 9.000000) rotate(-90.000000) translate(-12.000000, -9.000000) translate(3.000000, -3.000000)">
                                                                <path d="M14.5,4.20710678 L4.20710678,14.5 L14.5,14.5 L14.5,4.20710678 Z" id="Rectangle-6" transform="translate(9.000000, 9.000000) rotate(225.000000) translate(-9.000000, -9.000000) "></path>
                                                                <path d="M9,1.5 L9,23.5056811" id="Line-4" stroke-linecap="square"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-4">
                                        <div id="project-next" class="project-nav-button animated">
                                            <p class="text">Next Project</p>
                                            <div class="mobile-button"> 
                                                <svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="Right-Icon" stroke="#000000">
                                                            <g id="Group-2" transform="translate(12.000000, 9.000000) rotate(90.000000) translate(-12.000000, -9.000000) translate(3.000000, -3.000000)">
                                                                <path d="M14.5,4.20710678 L4.20710678,14.5 L14.5,14.5 L14.5,4.20710678 Z" id="Rectangle-6" transform="translate(9.000000, 9.000000) rotate(225.000000) translate(-9.000000, -9.000000) "></path>
                                                                <path d="M9,1.5 L9,23.5056811" id="Line-4" stroke-linecap="square"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div id="scroll-top">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
