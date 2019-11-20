<template>
	<section class="interface ">
		<div class="interface__row">
			<div class="interface__body">
				<header class="interface__header trim">
					<slot name="header"></slot>
				</header>
				<div class="interface__content">
					<slot></slot>
				</div>
			</div>
			<div class="interface__details trim">
				<slot name="details"></slot>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		name: "Interface"
	}
</script>
<style lang="scss">
	@import "~spaceframework/scss/init-spaceframework";

	.interface {
		border-bottom: 1px solid #ddd;

		&__row {
			display: flex;
		}

		&__body {
			@include padding(2,4);
			flex: 1 1 0;
			background: #fafafa;
		}

		&__content {
			font-family: var(--font);
		}

		&__details {
			@include padding(2);
			width: 300px;
			text-align: left;
			border-left: 1px solid #eee;
		}
	}
</style>