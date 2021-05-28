<template>
    <div style="width:320px; margin:0 auto;">

        <h1>logo</h1>

        <b-form class="mt-5" @submit="onSubmit" @reset="onReset" >

            <b-form-input
            id="input-pwd"
            class="mb-2"
            v-model="form.oldPwd"
            placeholder="기존 비밀번호"
            type="password"
            required
            />

            <b-form-input
            id="input-newpwd"
            class="mb-2"
            v-model="form.newPwd"
            placeholder="비밀번호"
            type="password"
            required
            />

            <b-form-input
            id="input-newpwdchk"
            class="mb-3"
            v-model="form.newPwdCfm"
            placeholder="새 비밀번호 확인"
            type="password"
            required
            />

            <Button text="비밀번호 변경" />

        </b-form>

        <BottomLine text="로그인 페이지로 돌아가기" url="/Login" />

    </div>
</template>

<script>

import Button from '../../shared-components/small/Button.vue'
import BottomLine from '../../shared-components/small/BottomLine.vue'


export default {
    name: "NewPwd",
    components: {
        Button,
        BottomLine,
    },
    data() {
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          newPwdCfm: '',
        },
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
        this.$router.push('/LoginMessage/비밀번호 변경이 완료되었습니다');
      },
      onReset(event) {
        event.preventDefault()
        this.form.oldPwd = ''
        this.form.newPwd = ''
        this.form.newPwdCfm = ''
      }
    }
}
</script>

<style>
    @import '../../assets/css/Login.css';
</style>
