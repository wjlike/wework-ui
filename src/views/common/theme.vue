<template>
	<el-form>
		<h2>系统设置</h2>
		<el-form-item label="导航条类型" label-position="left" label-width="100px">
			<el-radio-group v-model="navbarLayoutType" size="mini">
				<el-radio label="default" border>默认</el-radio>
				<el-radio label="inverse" border>翻转</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="侧边栏皮肤" label-position="left" label-width="100px">
			<el-radio-group v-model="sidebarLayoutSkin" size="mini">
				<el-radio label="light" border>典雅</el-radio>
				<el-radio label="dark" border>酷炫</el-radio>
			</el-radio-group>
		</el-form-item>
		<!--<el-form-item label="语言选择" label-position="left" label-width="100px">
			<el-select v-model="$i18n.locale" class="w-percent-100 language_select">
				<el-option v-for="(val, key) in i18nMessages" :key="key" :label="val._lang" :value="key"></el-option>
			</el-select>
		</el-form-item>-->
	</el-form>
</template>

<script>
	import Cookies from 'js-cookie'
	import { messages } from '@/i18n'
	export default {
		data() {
			return {
				i18nMessages: messages
			}
		},
		computed: {
			navbarLayoutType: {
				get() {
					return this.$store.state.common.navbarLayoutType
				},
				set(val) {
					this.$store.commit('common/updateNavbarLayoutType', val)
				}
			},
			sidebarLayoutSkin: {
				get() {
					return this.$store.state.common.sidebarLayoutSkin
				},
				set(val) {
					this.$store.commit('common/updateSidebarLayoutSkin', val)
				}
			},
			languageLayoutSkin: {
				get() {
					return this.$store.state.common.languageLayoutSkin
				},
				set(val) {
					Cookies.set('language', val);
					this.$router.go(0);
					this.$store.commit('common/updateLanguageLayoutSkin', val)
				}
			}
		}
	}
</script>