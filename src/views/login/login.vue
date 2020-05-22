<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">北江纺织后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="name">
          <el-input v-model="param.name" placeholder="请输入账号">
            <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-key"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click.native="submitForm">登录</el-button>
        </div>
        <p class="login-tips"></p>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as creatApi from "@/api/creatApi.js";
import querystring from "querystring";

export default {
  name: "login",
  data() {
    return {
      param: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      let _data = {
        name: this.param.name,
        password: this.param.password
      };
      creatApi
        .postTotallogin(querystring.stringify(_data))
        .then(res => {
          if (res.code == 305) {
            this.$message({ message: res.msg, duration: 2000 });
          }
          if (res.code == 200) {
            this.$router.push("/index");
            // console.log(res.data[0]);
            sessionStorage.setItem("id", res.data[0].employeeId);
            sessionStorage.setItem("name", res.data[0].employeeName);
            sessionStorage.setItem("contractBody", res.data[0].company);
            sessionStorage.setItem("department", res.data[0].department);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg2.png);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 60%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
