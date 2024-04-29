<?php
/**
 * Plugin Name:       Embed Maps Block
 * Description:       <strong>Embed Maps Block</strong> is a custom <strong>Gutenberg Block</strong> developed with <strong>Gutenberg Native Components</strong>. You can easily show a location in Google Map. 
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.5.2
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       embed-maps-block
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [emb] && [EMB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */

final class EMB_BLOCKS_CLASS {
	public function __construct() {
		// block initialization
		add_action( 'init', [ $this, 'emb_blocks_init' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Blocks Registration 
	 */

	public function emb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );
	 }

	 // render inline css
	public function emb_render_inline_css( $handle, $css ) {
		wp_register_style( $handle, false );
		wp_enqueue_style( $handle );
		wp_add_inline_style( $handle, $css );
	}
	

	/**
	 * Blocks Initialization
	*/
	public function emb_blocks_init() {
		// register single block
		$this->emb_register_block( 'map', [
			'render_callback' => [ $this, 'emb_render_block' ],
		] );
	}

	public function emb_render_block($attributes, $content) {
		if(! is_admin(  )){
			$handle = 'emb-'.$attributes['id'];
			$custom_css = '';
			// tablet css
			$custom_css .= '@media only screen and (min-width: 768px) and (max-width: 991px) { .emb__height_'.$attributes['id'].'{ height: '.$attributes['tabHeight'].'px !important } }';
			// mobile css
			$custom_css .= '@media only screen and (max-width: 767px) { .emb__height_'.$attributes['id'].'{ height: '.$attributes['mobileHeight'].'px !important } }';
			$this->emb_render_inline_css( $handle, $custom_css );
		}
		return $content;
	}

}

/**
 * Kickoff
*/

EMB_BLOCKS_CLASS::init();
