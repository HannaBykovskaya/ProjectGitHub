<!DOCTYPE html>
<html lang="<?= $this->lang ?>">
	<head>
		<meta charset="utf-8">
		<title><?php $this->getHeader('title'); ?> | <?php $this->getElement('author');?></title>
		
		<link rel="stylesheet" href="/css/fonts/list.css?v=8">
		<link rel="stylesheet" href="/css/styles.css?v=323">
		<link rel="stylesheet" href="/js/highlighter/highlighter.css?v=78">
		
		<script src="/js/highlighter/highlighter.js?v=117"></script>
		
		<script src="/js/location.js?v=3"></script>
		<script src="/js/locale.js?v=5"></script>
		<script src="/js/main.js?v=129"></script>
		
		<meta name="yandex-verification" content="00eb45b7559e5c68">
		<meta name="google-site-verification" content="Af0TM2OrwIEtjoQXxYz2-1C-21E1m7DB23_kWpE9sLg">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<meta name="description" content="<?php $this->getHeader('meta'); ?>">
		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	</head>
	<body id="top">
		<div class="wrapper">
			<header>
				<?php
					$this->getElement('top');
				?>
				<?php
					$this->getElement('welcome');
				?>
				<?php
					$this->getElement('mainmenu');
				?>
				<?php
					if (IS_ONLINE)
						$this->getElement('info');
				?>
			</header>
			<main>
				<h1><?php $this->getHeader('h1'); ?></h1>
				<?php $this->getContent();?>
			</main>
			<?php
				$this->getElement('bottom');
			?>
			<?php
				$this->getElement('footer');
			?>
			<?php
				$this->getElement('jump');
			?>
			<?php
				$this->getElement('langer');
			?>
			</div>
		</div>
		
		<?php if(MODE == 'prod') echo '<script src="/js/metrika.js?v=1"></script>'; ?>
	</body>
</html>
	
	
