<template>
	<div>
		<el-select v-model="svalue"  :filter-method="dataFilter" :value="{v:va}" :disabled='isDisabled?true:false' @change="doSelect" filterable>
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label" >
				<span v-if="item.label">{{ item.label }}</span>
			</el-option>
		</el-select>
	</div>
</template>

<script>
	import http from '@/utils/httpRequest'

	export default {
		name: 'ISelectOne',
		data() {
			return {
				options: [],
				svalue: this.value,
				copyOptions: [] ,//用于存储已经从后台请求到的码表信息,
        key:''
			}
		},
		methods: { //转换下拉框下的字段
			_dataTransform(data) {

        var fileTypejson = JSON.parse(this.fileType);

				var ft = {
					'value': 'value',
					'label': 'label'
				};
        if(fileTypejson !== undefined){
          ft = fileTypejson;
        };
				let _data = [];
				_data[0] = {};
				if(data == null) {
					return;
				}

        this.svalue = data[0][ft.label];

				for(let i = 0; i < data.length; i++) {
					_data[i] = {};
					_data[i].label = data[i][ft.label];
					_data[i].value = data[i][ft.value];
				}
				return _data;
			},
			getData() {
				if(!this.url) {
					return;
				}
				//远程请求回来的数据
				http({
					url: http.adornUrl(this.url),
					method: 'get',
					data: http.adornData(null, false)
				}).then(({
					data
				}) => {
					this.options = this._dataTransform(data.list);
					this.copyOptions = this.options;
				})

			},
			dataFilter(val) {
				this.svalue = val;
				if(val) { //val存在
					this.options = this.options.filter((item) => {
						if(item.label) {
							if(!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase()) || !!~item.value.indexOf(val) || !!~item.value.indexOf(val)) {
								return true;
							}
						}
					})
				} else {
					//当输入框为空
					this.options = this.copyOptions;
				}
			},
			doSelect(type) {
				this.$emit('change', type);
			}
		},
		watch: { //判断下拉框的值是否有改变
			svalue(val, oldVal) {
				if(!this.svalue) {
					this.svalue = "";
				}
				if(val != oldVal) {
					this.$emit('input', this.svalue);
				}
			},
			value(val, oldVal) {
				if(val != oldVal) {
					this.svalue = val;
				}
			},
			url() {
				this.getData();
			}
		},
		props: {
			url: {
				type: String
			}, //导入的url地址
			value: {
				type: String
			}, //接受外部v-model传入的值
			fileType: {
				type: String
			}, //定义请求回来的json数据格式
			wid: {
				type: String
			}, //input框的宽度设置
			va: {
				type: String
			},
			isDisabled: {}
		},
		mounted() {
			this.getData();
		}
	}
</script>
