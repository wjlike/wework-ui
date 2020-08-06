<script>
	exports.exportExcel = function(_this, url, excelName, data) {

		_this.$http({
			url: _this.$http.adornUrl(url), //获取文件流的接口路径
			method: 'post',
			params: _this.$http.adornParams({
				'excelName': excelName,
				'json': data 
			}),
			responseType: 'blob' // 表明返回服务器返回的数据类型 很重要！！
		}).then((res) => {
			//这里res.data是返回的blob对象   
			var blob = new Blob([res.data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
			});
			var downloadElement = document.createElement('a');　　
			var href = window.URL.createObjectURL(blob); //创建下载的链接
			downloadElement.href = href;　　
			downloadElement.download = excelName + '.xlsx'; //下载后文件名
			document.body.appendChild(downloadElement);　　
			downloadElement.click(); //点击下载
			document.body.removeChild(downloadElement); //下载完成移除元素
			window.URL.revokeObjectURL(href); //释放掉blob对象 
		}).catch(error => {
			console.log(error)
			this.$message.error('导出失败' + error);
		})
	}
</script>