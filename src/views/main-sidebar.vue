<template>
	<aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
		<div class="site-sidebar__inner">
			<el-menu :default-active="menuActiveName || 'home'" :collapse="sidebarFold" :collapseTransition="false" class="site-sidebar__menu">
				<sub-menu v-for="menu in childMenuList" :key="menu.menuId" :menu="menu" :dynamicMenuRoutes="dynamicMenuRoutes">
				</sub-menu>
			</el-menu>
		</div>
	</aside>
</template>

<script>
	import SubMenu from './main-sidebar-sub-menu'
	import { isURL } from '@/utils/validate'
	export default {
		data() {
			return {
				dynamicMenuRoutes: []
			}
		},
		components: {
			SubMenu
		},
		computed: {
			childMenuList: {
				get() {
					return this.menuListAddhome.filter(v => v.name == this.selectMenu)[0].list
				},
				set(val) {
					return this.menuListAddhome.filter(v => v.name == this.selectMenu)[0].list
				}
			},
			selectMenu: {
				get() {
					return this.$store.state.common.selectMenu
				}
			},
			sidebarLayoutSkin: {
				get() {
					return this.$store.state.common.sidebarLayoutSkin
				}
			},
			sidebarFold: {
				// get () { return this.$store.state.common.selectMenu == "首页" ? (sessionStorage.getItem("selectMenu")||this.$store.state.common.selectMenu) : this.$store.state.common.selectMenu }       
				get() {
					return this.$store.state.common.sidebarFold
				}
			},
			menuList: {
				get() {
					console.log(this.$store.state.common.menuList)
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
			this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
			this.routeHandle(this.$route)
			this.menuListAddhome = this.menuList.concat([{
				name: "首页",
				list: [{
					name: "首页",
					icon: "home"
				}],
				icon: "home"
			}])

			// this.childMenuList = this.menuListAddhome.filter(v=>v.name==this.selectMenu)[0].list
			// console.log(this.menuListAddhome.filter(v=>v.name==this.selectMenu))
		},
		methods: {
			// 路由操作
			routeHandle(route) {
				if(route.meta.isTab) {
					// tab选中, 不存在先添加
					var tab = this.mainTabs.filter(item => item.name === route.name)[0]
					if(!tab) {
						if(route.meta.isDynamic) {
							route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
							if(!route) {
								return console.error('未能找到可用标签页!')
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