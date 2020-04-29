<template>
  <div class="container">
    <div class="back" @click="back">
       返回
    </div>
    <div class="box">
      <h3 class="title">调用 login 修改distinct_id,写入用户表secend_id</h3>
      <div class="card">
      <el-input v-model="loginId" placeholder="请输入内容" size="medium" class="input-box"></el-input>
      <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>

    <div class="box">
      <h3 class="title">调用 identify 修改匿名id</h3>
      <div class="card">
      <el-input v-model="id" placeholder="请输入内容" size="medium" class="input-box"></el-input>
      <el-button type="primary" @click="identifyCallback">修改</el-button>
      </div>
    </div>
    
    <div class="box">
      <h3 class="title">调用 logout</h3>
      <div >
       <h4>sensors.logout();取消当前 login 的 id，改成最初自动生成的 cookie_id</h4>
      <el-button type="primary" @click="logout">退出</el-button>
       <h4>sensors.logout(true); 取消当前 login 的 id，重新生成一个新的 cookie_id</h4>
      <el-button type="primary" @click="logoutcallback">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {
      loginId:'',
      id:''
    }
  },
  methods:{
    login(){
      console.log('loginId',this.loginId)
      sensors.login(this.loginId)
    },
    identifyCallback(){
      console.log('distinct_id',this.id)
      sensors.identify(this.id)
    },
    logout(){
      sensors.logout()
    },
    logoutcallback(){
      sensors.logout(true)
    },
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
  text-align: left;
}

.box{
  padding-bottom: 40px;
}

.card{
  display: flex;
}

.title {
  font-size: 20px;
  text-align: left;
}

.input-box {
  width: 300px;
}

.link {
  margin-right: 20px;
}
</style>

