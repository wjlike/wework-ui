<script>
	/**
	 * 获取每个月的月初
	 */
	exports.beginMonth = function beginMonth() {
		var cloneNowDate = new Date();
		return getFullDate(cloneNowDate.setDate(1));
	}

	/**
	 * 获取每个月的月末
	 */
	exports.endMonth = function endMonth() {
		var cloneNowDate = new Date();
		// 获取本月最后一天
		var endOfMonth = new Date(fullYear, month, 0).getDate();
		return getFullDate(cloneNowDate.setDate(endOfMonth));
	}

	/**
	 * 格式化日期(2016 - 02 - 14)
	 */
	function getFullDate(targetDate) {
		var D, y, m, d;
		if(targetDate) {
			D = new Date(targetDate);
			y = D.getFullYear();
			m = D.getMonth() + 1;
			d = D.getDate();
		} else {
			y = fullYear;
			m = month;
			d = date;
		}
		m = m > 9 ? m : '0' + m;
		d = d > 9 ? d : '0' + d;

		return y + '-' + m + '-' + d;
	}
</script>