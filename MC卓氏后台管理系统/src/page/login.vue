<template>
<!-- ruleForm快速获取dom节点 -->
 <div class="login">
     <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="login_form">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="loginForm.name" clearable></el-input>
  </el-form-item>
 <el-form-item label="密码" prop="pass">
    <el-input v-model="loginForm.pass" clearable show-password></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="login('ruleForm')">登录</el-button>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
 export default {
    data() {
      return {
        loginForm: {
          name: '',
          pass:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],

        }
      };
    },
    methods: {
        login(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    //调取登录接口
                    console.log(this.loginForm,'表单')
                    if(this.loginForm.name=='admin' && this.loginForm.pass=='123456'){
                        this.$router.push('/index')
                    }else{
                        this.$message.error('用户名或者密码错误');
                    }
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.login
    width:100vw;
    height:100vh;
    background:$onebackground;
    .login_form 
        background: $twobackground;
        position absolute
        left 50%
        top 50%
        margin -150px 0 0 -150px
        padding 40px 10px
        width 440px
        height 200px
    .el-input
        width 80%
            
         
</style>
