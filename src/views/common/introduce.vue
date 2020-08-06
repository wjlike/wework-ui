<template>
    <div class="introduce_box">
        <div class="intro">
            <div class="intro_content intro_one">
                <span>XXXX</span>
                <h3>1290</h3>
                <span>xxxxx</span>
            </div>
            <div class="extra_border extra_one">我是补充</div>
        </div>
        <div class="intro">
            <div class="intro_content intro_two">
                <span>XXXX</span>
                <h3>1290</h3>
                <span>xxxxx</span>
            </div>
            <div class="extra_border extra_two">我是补充</div>
        </div>
        <div class="intro">
            <div class="intro_content intro_one">
                <span>XXXX</span>
                <h3>1290</h3>
                <span>xxxxx</span>
            </div>
            <div class="extra_border extra_one">我是补充</div>
        </div>
        <div class="intro">
            <div class="intro_content intro_two">
                <span>XXXX</span>
                <h3>1290</h3>
                <span>xxxxx</span>
            </div>
            <div class="extra_border extra_two">我是补充</div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.introduce_box{
    display:flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height:500px;
}
.intro{
    /* border:1px solid #ddd; */
    height:20%;
    width:80%;
    border-radius:10px;
    color:#fff;
    overflow:hidden;
}
.intro_content{
    height:70%;
    display:flex;
    justify-content: space-around;
    /* background:thistle; */
    align-items: center;
    font-weight:normal;
}
.intro_content span{
    font-size:20px;
}
.extra_border{
    /* border-top:1px solid salmon; */
    height:30%;
    /* background:turquoise; */
    display:flex;
    align-items:center;
    font-size:12px;
    /* line-height:100%; */
    padding-left:20px;
}
.intro_one{
    background:#17b3a3;
}
.extra_one{
    background:#179b8e;
}
.intro_two{
    background:#bc9aa9;
}
.extra_two{
    background:#a48593;
}
</style>
