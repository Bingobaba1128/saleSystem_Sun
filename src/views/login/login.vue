<template>
  <div>
  <p></p>
  </div>
</template>

<script>
import * as creatApi from "@/api/creatApi.js";
import querystring from "querystring";

export default {
  name: "login",
  // data() {
  //   return {
  //     param: {
  //       name: "",
  //       password: ""
  //     },
  //     rules: {
  //       name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  //       password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  //     }
  //   };
  // },
  mounted: {
    submitForm() {
      var tokenInfo = vue.$token.loadToken();
      let _data = {
        employeeId: tokenInfo.employeeId,
        employeeName: tokenInfo.employeeName,
        contractBody: tokenInfo.contractBody,
        gsCode: tokenInfo.gsCode
      };
      creatApi
        .autologin(querystring.stringify(_data))
        .then(res => {
          if (res.code == 305) {
            this.$message({ message: res.msg, duration: 2000 });
          }
          if (res.code == 200) {
            this.$router.push("/index");
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

</style>
