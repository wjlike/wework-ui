<template>
	<transition name="fade">
		<router-view></router-view>
	</transition>
</template>

<script>
	import Cookies from "js-cookie";
	import { messages } from "@/i18n";
	export default {
		watch: {
			"$i18n.locale": "i18nHandle"
		},
		created() {
			this.i18nHandle(this.$i18n.locale);
		},
		methods: {
			i18nHandle(val, oldVal) {
				Cookies.set("language", val);
				document.querySelector("html").setAttribute("lang", val);
				// document.title = messages[val].brand.lg;
				// 非登录页面，切换语言刷新页面
				if(this.$route.name !== "login" && oldVal) {
					window.location.reload();
				}
			}
		}
	};
</script>

<style>
  .el-input__icon {
    line-height: 100%!important;
  }
	.el-table td,
	.el-table th {
		padding: 2px 0!important;
		font-size: 12px!important;
		height: 20px!important;
	}
	
	.el-button {
		padding: 8px;
		font-size: 12px;
		border-radius: 3px;
	}
	
	.el-form-item:not(".roleTree") .el-form-item__content,
	.el-form-item .el-form-item__label {
		height: 28px;
		line-height: 28px;
	}
	
	.roleAdd .el-dialog__body {
		padding: 10px 20px;
	}
	
	.el-input .el-input__inner {
		height: 28px;
		line-height: 28px;
	}
	
	.el-form-item__label {
		font-size: 12px !important;
	}
	
	body {
		font-family: Arial, sans-serif;
	}
	
	.el-collapse-item__header {
		height: 35px !important;
		font-weight: bold !important;
	}
	
	.el-collapse-item__content {
		padding-bottom: 0;
	}
	
	.el-form-item__label {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.el-form .el-input,
	.el-form .el-select {
		width: 100%!important;
	}
	
	.el-form .language_select {
		width: 200px!important;
	}
	
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #ddd;
		border-radius: 3px;
	}
	
	.el-input {
		font-size: 12px;
		height: 28px;
		line-height: 28px;
	}
	/**去除滚动条 */
	
	.el-table .cell.el-tooltip {
		overflow: hidden!important;
		text-overflow: clip!important;
	}
	
	.el-table .cell.el-tooltip::-webkit-scrollbar {
		display: none!important;
	}
	/**操作不换行 */
	
	.el-table__fixed-right .cell {
		white-spce: nowrap!important;
	}
	/* 表头不对应 */
	
	.el-table th.gutter {
		display: table-cell!important;
	}
	/* label左对齐 */
	
	.el-form-item__content {
		text-align: left!important;
		padding-left: 0px!important;
		box-sizing: border-box;
	}
	
	.el-form-item__label {
		text-align: right!important;
		padding-left: 15px!important;
		box-sizing: border-box;
	}
	
	.el-col-6 {
		width: 25%;
		margin-right: 3%!important;
	}
	
	el-form-item {
		margin-bottom: 20px;
	}
</style>