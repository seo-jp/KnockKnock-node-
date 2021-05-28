<template>
    <div style="width:320px; margin:0 auto;">
        
        <h1>logo</h1>

        <b-form class="mt-5" @submit="onSubmit" @reset="onReset" >

            <b-form-input
            id="input-id"
            class="mb-2"
            v-model="form.userId"
            placeholder="아이디"
            required
            />

            <b-form-input
            id="input-pwd"
            class="mb-3"
            v-model="form.password"
            placeholder="비밀번호"
            type="password"
            required
            />

            <Button text="로그인" />

            <b-form-checkbox
            v-model="form.checked"
            class="mb-2 mr-sm-2 mb-sm-0 chk-box float-left">
            아이디 저장
            </b-form-checkbox>
            <b-link href="/LoginSearch" class="id-link float-right">아이디 및 비밀번호를 잊으셨나요?</b-link>

        </b-form>

        <BottomLine text="계정이 없으신가요?" url="/JoinStep" point="가입하기" />

    </div>
</template>

<script>

import Button from '../../shared-components/small/Button.vue'
import BottomLine from '../../shared-components/small/BottomLine.vue'


export default {
    name: "Login",
    components: {
        Button,
        BottomLine,
    },
    data() {
      return {
        form: {
          userId: '',
          password: '',
          checked: '',
        },
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
      },
      onReset(event) {
        event.preventDefault()
        this.form.email = ''
        this.form.name = ''
        this.form.checked = ''
      }
    }
}
</script>

<style>
    @import '../../assets/css/Login.css';
</style>
