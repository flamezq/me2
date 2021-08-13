<?php
use yii\helpers\Html;
?>
<style>
body .content-wrapper {
 background:#000000 !important;
}

/*

*/

h3 {
  color: rgba(31,181,172,.9);
}
.text{
	color: rgba(31,181,172,.9);
	text-align: center;
}


.folded-corner:hover .text{
	visibility: visible;
	color: #000000;;
}
.Services-tab{
	margin-top:20px;
	

}

/*
  nav link items
*/
.folded-corner{
  padding: 25px 25px;
  position: relative;
  font-size: 90%;
  text-decoration: none;
  color: #999; 
  background: transparent;
  transition: all ease .5s;
  border: 1px solid rgba(31,181,172,.9);
}
.folded-corner:hover{
	background-color: rgba(31,181,172,.9);
}

/*
  paper fold corner
*/

.folded-corner:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-style: solid;
  border-width: 0 0px 0px 0;
  border-color: #ddd #000;
  transition: all ease .3s;
}

/*
  on li hover make paper fold larger
*/
.folded-corner:hover:before {
	background-color: #D00003;
  border-width: 0 50px 50px 0;
  border-color: #eee #000;
  
}

.service_tab_1{
	background-color: #000;
}
.service_tab_1:hover .fa-icon-image{
    color: #000;
    transform: rotate(360deg) scale(1.5);
}


.fa-icon-image{
	color: rgba(31,181,172,.9);
	display: inline-block;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    line-height: 1;
    font-size-adjust: none;
    font-stretch: normal;
    -moz-font-feature-settings: normal;
    -moz-font-language-override: normal;
    text-rendering: auto;
    transition: all .65s linear 0s;
    text-align: center;
    transition: all 1s cubic-bezier(.99,.82,.11,1.41);
}


</style>
<div class="content">
<div class="row">
	<ul>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab  item">
			<div class="folded-corner service_tab_1">
				<div class="text">
					<i class="fa fa-image fa-5x fa-icon-image"></i>
						<p class="item-title">
								<h3> Designing</h3>
							</p><!-- /.item-title -->
					<p>
						This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
	    </div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
			<div class="folded-corner service_tab_1">
				<div class="text">
					<i class="fa fa-lightbulb-o fa-5x fa-icon-image" ></i>
						<p class="item-title">
							<h3> Developing</h3>
						</p><!-- /.item-title -->
						<p>
							This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
			<div class="folded-corner service_tab_1">
				<div class="text">
					<i class="fa fa-truck fa-5x fa-icon-image"></i>
						<p class="item-title">
							<h3> Marketing</h3>
						</p><!-- /.item-title -->
					<p>
						This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
			<div class="folded-corner service_tab_1">
				<div class="text">
					<i class="fa fa-diamond fa-5x fa-icon-image"></i>
						<p class="item-title">
							<h3> Branding</h3>
						</p><!-- /.item-title -->
					<p>
						This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
			<div class="folded-corner service_tab_1">
			<div class="text">
				<i class="fa fa-line-chart fa-5x fa-icon-image"></i>
					<p class="item-title">
						<h3>Analytics</h3>
					</p><!-- /.item-title -->
					<p>
						This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
			<div class="folded-corner service_tab_1">
				<div class="text">
					<i class="fa fa-mobile fa-5x fa-icon-image"></i>
						<p class="item-title">
							<h3>Mobil Apps</h3>
						</p><!-- /.item-title -->
					<p>
						This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
				<div class="folded-corner service_tab_1">
					<div class="text">
						<i class="fa fa-money fa-5x fa-icon-image"></i>
							<p class="item-title">
								<h3> e-commerce</h3>
							</p><!-- /.item-title -->
						<p>
							This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
						</p>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
			<div class="folded-corner service_tab_1">
				<div class="text">
					<i class="fa fa-bullhorn fa-5x fa-icon-image"></i>
						<p class="item-title">
							<h3> Support</h3>
						</p><!-- /.item-title -->
					<p>
						This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
					</p>
				</div>
			</div>
		</div>
	   </ul>
	</div>
</div>