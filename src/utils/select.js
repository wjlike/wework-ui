import http from '@/utils/httpRequest'
/**
 * 根据url拿到所要的选择内容
 */
export function getSelect (url,value,_this) {
     http({
        url: http.adornUrl('/comm/code/list/'+url),
        method: 'post',
        data: http.adornData(null, false)
    }).then(({
        data
    }) => {
        if(data && data.code === 0) {
            //  value = data.list;
            //  console.log(value,"--------------------value")
            // value = data.list
            _this.value = data.list;
        }
    })
    // return [{label: "F", value: "女"}, {label: "M", value: "男"}]

    
  
} 