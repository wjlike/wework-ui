<template>
    <el-dialog
        title="导入失败"
        :visible.sync="dialogVisible"
        class="message"
        width="40%"
        v-dialogDrag>
        <ul v-if="dataList.length">
            <li v-for="(item,index) in dataList" :key="index" >
			<span v-if="item.column">
			<span style="margin-right:10px;font-weight:bold;">{{index+=1}}</span>
			<span>第</span>
			<span>{{item.row}}</span>
			<span>行、第</span>
			<span>{{item.column}}</span>
			<span>列 ：</span>
			<span>{{item.msg}}</span>
			</span>
			<span v-else>
			<span style="margin-right:10px;font-weight:bold;">{{index+=1}}</span>
			<span>第</span>
			<span>{{item.row}}</span>
			<span>行：</span>
			<span>{{item.msg}}</span>
			</span>
			</li>
        </ul>
        <p v-else>
            導入成功！
        </p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data (){
        return {
            dataList:[
                {
                    column:"1",
                    row:'2',
                    msg:'導入錯誤，導入錯誤導入錯誤導入錯誤導入錯誤導入，錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤導入錯誤'
                },
                {
                    column:"1",
                    row:'2',
                    msg:'導入錯誤'
                },
                {
                    column:"1",
                    row:'2',
                    msg:'導入錯誤'
                }
            ],
            dialogVisible:true
        }
    },
    methods:{
        init(list){
        	this.dialogVisible = true;
            this.dataList = list;
        }
    }
}
</script>

<style lang="scss">
.message{
    .el-dialog{
        .el-dialog__body{
            padding:5px 20px;
            ul{
                padding:0;
                height:180px;
                overflow-y:auto;
                margin-top:5px;
                li{
                    list-style:none;
                    padding:5px;
                    border-bottom:1px dashed #ccc;
                }
            }
        }

    }
}
</style>
