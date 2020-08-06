<template>
	<el-dropdown @command="handleCommand">
		<el-button type="small">
			{{ this.selectMenu }}
		</el-button>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item v-for="item in menuListAddHome" :key="item.menuId" :command="item.name">{{ item.name }}</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>

</template>

<script>
	import SubMenu from './main-sidebar-sub-menu'
	import { isURL } from '@/utils/validate'
	export default {
		data() {
			return {
				dynamicMenuRoutes: [],
				AddHome: [{
					name: "首页",
					menuId: "homeId"
				}]
			}
		},
		components: {
			SubMenu
		},
		computed: {
			menuListAddHome: {
				get() {
					return this.AddHome.concat(this.menuList)
				},
				set(val) {
					return this.AddHome.concat(this.menuList)
				}
			},
			selectMenu: {
				get() {
					return this.$store.state.common.selectMenu;
				},
				set(val) {
					sessionStorage.setItem("selectMenu", val)
					this.$store.commit('common/updateSelectMenu', val);
				}
			},
			menuList: {
				get() {
					return this.$store.state.common.menuList
				},
				set(val) {
					this.$store.commit('common/updateMenuList', val)
				}
			},
			menuActiveName: {
				get() {
					return this.$store.state.common.menuActiveName
				},
				set(val) {
					this.$store.commit('common/updateMenuActiveName', val)
				}
			},
			mainTabs: {
				get() {
					return this.$store.state.common.mainTabs
				},
				set(val) {
					this.$store.commit('common/updateMainTabs', val)
				}
			},
			mainTabsActiveName: {
				get() {
					return this.$store.state.common.mainTabsActiveName
				},
				set(val) {
					this.$store.commit('common/updateMainTabsActiveName', val)
				}
			}
		},
		watch: {
			$route: 'routeHandle'
		},
		created() {
			this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
			// this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
			this.menuListAddHome = this.menuListAddHome.concat(this.menuList)
			this.routeHandle(this.$route)
		},
		methods: {
			handleCommand(command) {
				this.selectMenu = command
				if(this.selectMenu == "首页") {
					this.$router.push({
						name: 'home'
					})
				}
			},
			// 路由操作
			routeHandle(route) {
				if(route.meta.isTab) {
					// tab选中, 不存在先添加
					var tab = this.mainTabs.filter(item => item.name === route.name)[0]
					if(!tab) {
						if(route.meta.isDynamic) {
							route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
							if(!route) {
								//return console.error('未能找到可用标签页!')
								return;
							}
						}
						tab = {
							menuId: route.meta.menuId || route.name,
							name: route.name,
							title: route.meta.title,
							type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
							iframeUrl: route.meta.iframeUrl || ''
						}
						this.mainTabs = this.mainTabs.concat(tab)
					}
					this.menuActiveName = tab.menuId + ''
					this.mainTabsActiveName = tab.name
				}
			}
		}
	}
</script>

<style scoped>
	.el-button {
		color: #000;
		background: rgba(0, 0, 0, 0);
	}
</style>